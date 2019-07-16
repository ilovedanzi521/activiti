package com.win.dfas.bpm.controller.api;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.win.dfas.bpm.dto.QueryAndStartFlowReqDTO;
import com.win.dfas.bpm.service.BpmService;
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.service.IParamFlowService;
import com.win.dfas.vo.request.FlowTaskReqVO;
import com.win.dfas.vo.request.ParamFlowReqVO;
import lombok.extern.slf4j.Slf4j;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 包名称：com.win.dfas.bpm.controller
 * 类名称：BpmTaskController
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/7/9/13:42
 */
@RestController
@RequestMapping("/bpm/process/task")
@Slf4j
public class BpmTaskController {
    @Autowired
    private HistoryService historyService;
    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private TaskService taskService;

    @Autowired
    private BpmService bpmService;
    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    private IParamFlowService paramFlowService;

    @PostMapping("/runFlow")
    public WinResponseData queryAndStart(@RequestBody QueryAndStartFlowReqDTO queryAndStartFlowReqDTO) {
        try {
            log.info("运行参数======" + BeanUtil.beanToMap(queryAndStartFlowReqDTO).toString());
            ParamFlowReqVO paramFlowReqVO = new ParamFlowReqVO();
            paramFlowReqVO.setInstructionType(queryAndStartFlowReqDTO.getInvestConstitute());
            paramFlowReqVO.setTransactionDirection(queryAndStartFlowReqDTO.getTransactionDirection());
            paramFlowReqVO.setProductCode(queryAndStartFlowReqDTO.getProductCode());
            WinResponseData rtn = queryprocessDef(paramFlowReqVO);
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                FlowTaskReqVO flowTaskReqVO = new FlowTaskReqVO();
//            flowTaskReqVO.setProcessId(String.valueOf(rtn.getData()));
                flowTaskReqVO.setAmt(queryAndStartFlowReqDTO.getAmt());
                flowTaskReqVO.setPermit(queryAndStartFlowReqDTO.getPermit());
                flowTaskReqVO.setGroupId(queryAndStartFlowReqDTO.getGroupId());
                flowTaskReqVO.setUserId(queryAndStartFlowReqDTO.getUserId());
                flowTaskReqVO.setProcessDefId(String.valueOf(rtn.getData()));

                WinResponseData runRtn = run(flowTaskReqVO);
                if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                    return WinResponseData.handleSuccess("成功", runRtn.getData());
                }
            }
        }catch(Throwable throwable){
            throw WinExceptionUtil.winException(BpmExceptionEnum.SYSTEM_ERR);
        }

        return WinResponseData.handleError("失败");

    }

    @PostMapping("/run")
    public WinResponseData run(@RequestBody FlowTaskReqVO flowTaskReqVO) {
        log.info("运行参数======"+ BeanUtil.beanToMap(flowTaskReqVO).toString());
        ProcessInstance processInstance = runtimeService.startProcessInstanceById(flowTaskReqVO.getProcessDefId(),BeanUtil.beanToMap(flowTaskReqVO));
        log.info("流程启动id："+processInstance.getId());
//        ExecutionEntity pi1 = (ExecutionEntity) runtimeService.startProcessInstanceById(defId);
        String processId =  processInstance.getId();
        HistoricProcessInstance historicProcessInstance =
                historyService.createHistoricProcessInstanceQuery().processInstanceId(processId).singleResult();
        if(historicProcessInstance.getEndTime()!=null){
            log.info("流程结束-谢谢！");
            return WinResponseData.handleSuccess("结束",historicProcessInstance.getEndTime());
        }
        log.info("processId="+processId);
        Task task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
        log.info("task 步骤:{}", task);

//        taskService.claim(task.getId(), flowTaskReqVO.getUserName());
//        taskService.complete(task.getId(), BeanUtil.beanToMap(flowTaskReqVO));
        return WinResponseData.handleSuccess("成功",(Object)processId);

    }


    /**
     * @Title: queryprocessDef
     * @Description: 获取流程定义id
     * @param queryVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/9/13:44
     */
    @PostMapping("/queryprocessDef")
    public WinResponseData queryprocessDef(@RequestBody ParamFlowReqVO queryVO) {
        String processDefId = paramFlowService.queryProcessDefIdfromFlowInst(queryVO);
        return WinResponseData.handleSuccess("成功",(Object)processDefId);
    }

    /**
     * @Title: queryTaskInfoByTask
     * @Description: 查询未完成任务
     * @param flowTaskReqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/9/14:16
     */
    @PostMapping("/getTaskInfo")
    public WinResponseData queryTaskInfoByTask( @RequestBody FlowTaskReqVO flowTaskReqVO) {
        String groupName = flowTaskReqVO.getGroupId();
        String username = flowTaskReqVO.getUserId();
        String taskType = flowTaskReqVO.getTaskType();
        //按照类型返回task列表
        List<Task> list = new ArrayList<Task>();
        //第一步获取用户组流程信息
        List<Task> groupTasks = taskService.createTaskQuery().taskCandidateGroup(groupName).list();
        list.addAll(bpmService.selectTask(groupTasks,taskType));
        //第二步获取用户流程信息
        List<Task> userTasks = taskService.createTaskQuery().taskCandidateUser(username).list();
        list.addAll(bpmService.selectTask(userTasks,taskType));
//        List<Task> users = taskService.createTaskQuery().taskAssignee(username).list();
//        list.addAll(bpmService.selectTask(users,taskType));
        //获取task
//        log.info(activityImpl.getProperty(BpmConstant.NAME).toString());
        List<String> rtn = new ArrayList<String>();
        for (Task task : list) {
            rtn.add( task.getProcessInstanceId());
        }
        log.info(list.toString());
        return WinResponseData.handleSuccess("成功",rtn);
    }
    /**
     * @Title: complete
     * @Description: 完成任务,并返回下一节点信息
     * @param flowTaskReqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/9/14:22
     */
    @PostMapping("/complete")
    public WinResponseData complete( @RequestBody FlowTaskReqVO flowTaskReqVO) {
        String processId = flowTaskReqVO.getProcessId();
        Map map = BeanUtil.beanToMap(flowTaskReqVO);
        log.info(map.toString());
        HistoricProcessInstance historicProcessInstance = historyService.createHistoricProcessInstanceQuery().processInstanceId(processId).singleResult();
        if(historicProcessInstance.getEndTime()!=null){
            log.info("流程已经结束！");
            return WinResponseData.handleError("流程已经结束",historicProcessInstance.getEndTime());
        }else {
            Task task = taskService.createTaskQuery().processInstanceId(processId).singleResult();

            taskService.complete(task.getId(),map);
            historicProcessInstance = historyService.createHistoricProcessInstanceQuery().processInstanceId(processId).singleResult();
            if(historicProcessInstance.getEndTime()!=null){
                log.info("最后节点已完成！");
                return WinResponseData.handleSuccess("最后节点已完成",historicProcessInstance.getEndTime());
            }
            List<String> list = bpmService.nextUserInfo(processId);
            return WinResponseData.handleSuccess("成功",list);
        }
    }

}
