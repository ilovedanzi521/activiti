package com.win.dfas.bpm.controller.api;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.win.dfas.bpm.constant.BpmConstant;
import com.win.dfas.bpm.dto.QueryAndStartFlowReqDTO;
import com.win.dfas.bpm.entity.FlowAssigners;
import com.win.dfas.bpm.service.BpmService;
import com.win.dfas.bpm.util.EnumUtil;
import com.win.dfas.bpm.vo.response.FlowNodeTaskTypeRepVO;
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.service.IParamFlowService;
import com.win.dfas.vo.request.FlowTaskReqVO;
import com.win.dfas.vo.request.ParamFlowReqVO;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.impl.task.TaskDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
    /**
     * @Title: queryAndStart
     * @Description 流程查询和启动
     * @param queryAndStartFlowReqDTO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/14:59
     */
    @PostMapping("/runFlow")
    public WinResponseData queryAndStart(@RequestBody @Validated QueryAndStartFlowReqDTO queryAndStartFlowReqDTO) {
        log.info("运行参数======" + BeanUtil.beanToMap(queryAndStartFlowReqDTO).toString());
        ParamFlowReqVO paramFlowReqVO = new ParamFlowReqVO();
        paramFlowReqVO.setProductCode(queryAndStartFlowReqDTO.getProductCode());
        paramFlowReqVO.setSecurityType(queryAndStartFlowReqDTO.getSecurityType());
        paramFlowReqVO.setInstructionType(queryAndStartFlowReqDTO.getInstructionType());
        paramFlowReqVO.setMarketCode(queryAndStartFlowReqDTO.getMarketCode());
        paramFlowReqVO.setInvestCompany(queryAndStartFlowReqDTO.getInvestCompany());
        paramFlowReqVO.setInvestConstitute(queryAndStartFlowReqDTO.getInvestConstitute());

        WinResponseData rtn = queryprocessDef(paramFlowReqVO);
        if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
            FlowTaskReqVO flowTaskReqVO = new FlowTaskReqVO();
            flowTaskReqVO.setAmt(queryAndStartFlowReqDTO.getAmt());
            flowTaskReqVO.setPermit(queryAndStartFlowReqDTO.getPermit());
            flowTaskReqVO.setGroupId(queryAndStartFlowReqDTO.getGroupId());
            flowTaskReqVO.setUserId(queryAndStartFlowReqDTO.getUserId());
            flowTaskReqVO.setProcessDefId(String.valueOf(rtn.getData()));

            WinResponseData runRtn = run(flowTaskReqVO);
            return runRtn;
        } else {
            throw WinExceptionUtil.winException(BpmExceptionEnum.NOT_FOUND_FLOW);
        }


//        return WinResponseData.handleError("失败");

    }
    /**
     * @Title: run
     * @Description 根据流程定义id启动流程
     * @param flowTaskReqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/15:00
     */
    @PostMapping("/run")
    public WinResponseData run(@RequestBody FlowTaskReqVO flowTaskReqVO) {
        log.info("运行参数======" + BeanUtil.beanToMap(flowTaskReqVO).toString());
        ProcessInstance processInstance = runtimeService.startProcessInstanceById(flowTaskReqVO.getProcessDefId(), BeanUtil.beanToMap(flowTaskReqVO));
        log.info("流程启动id：" + processInstance.getId());
        String processId = processInstance.getId();
        HistoricProcessInstance historicProcessInstance =
                historyService.createHistoricProcessInstanceQuery().processInstanceId(processId).singleResult();
        if (historicProcessInstance.getEndTime() != null) {
            log.info("流程流转异常");
            return WinResponseData.handleError("流程流转异常,请查看流程审批金额以及审批状态");
        }
        log.info("processId=" + processId);
        Task task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
        log.info("task 步骤:{}", task);
        // 获取流程定义id
        String processDefinitionId=task.getProcessDefinitionId();
        ProcessDefinitionEntity processDefinitionEntity=(ProcessDefinitionEntity) repositoryService.getProcessDefinition(processDefinitionId);
        // 根据活动id获取活动实例
        ActivityImpl activityImpl=processDefinitionEntity.findActivity(task.getTaskDefinitionKey());

        String taskType = (String) activityImpl.getProperties().get(BpmConstant.NAME);
        FlowNodeTaskTypeRepVO repVO = new FlowNodeTaskTypeRepVO();
        repVO.setProcessId(processId);
        repVO.setTaskType(taskType);
        return WinResponseData.handleSuccess("成功", repVO);

    }


   /**
    * @Title: queryprocessDef
    * @Description 获取流程定义id
    * @param queryVO
    * @return com.win.dfas.common.vo.WinResponseData
    * @throws
    * @author wanglei
    * @Date 2019/8/6/14:59
    */
    @PostMapping("/queryprocessDef")
    public WinResponseData queryprocessDef(@RequestBody ParamFlowReqVO queryVO) {
        log.info("queryprocessDef入参：" + BeanUtil.beanToMap(queryVO).toString());
        String processDefId = paramFlowService.queryProcessDefIdfromFlowInst(queryVO);
        if (processDefId != null) {
            return WinResponseData.handleSuccess("成功", (Object) processDefId);
        } else {
            return WinResponseData.handleError("失败");
        }

    }

   /**
    * @Title: queryTaskInfoByTask
    * @Description 查询未完成任务
    * @param flowTaskReqVO
    * @return com.win.dfas.common.vo.WinResponseData
    * @throws
    * @author wanglei
    * @Date 2019/8/6/14:59
    */
    @PostMapping("/getTaskInfo")
    public WinResponseData queryTaskInfoByTask(@RequestBody FlowTaskReqVO flowTaskReqVO) {
        try {
            String username = flowTaskReqVO.getUserId();
            String taskType = flowTaskReqVO.getTaskType();
            //按照类型返回task列表
            List<Task> list = new ArrayList<Task>();
            //第一步获取用户组流程信息
            List<Task> userTasks = taskService.createTaskQuery().taskCandidateUser(username).list();
            list.addAll(bpmService.selectTask(userTasks, taskType));
            //获取task
            List<String> rtn = new ArrayList<String>();
            for (Task task : list) {
                rtn.add(task.getProcessInstanceId());
            }
            log.info(list.toString());
            return WinResponseData.handleSuccess("成功", rtn);
        } catch (Throwable throwable) {
            throw WinExceptionUtil.winException(BpmExceptionEnum.SYSTEM_ERR);
        }
    }

    /**
     * @Title: complete
     * @Description 完成任务, 并返回下一节点信息
     * @param flowTaskReqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/14:58
     */
    @PostMapping("/complete")
    public WinResponseData complete(@RequestBody FlowTaskReqVO flowTaskReqVO) {
        try {
            FlowNodeTaskTypeRepVO repVO = bpmService.complete(flowTaskReqVO);
            switch(repVO.getStatu()){
                case RUNNING:
                    return WinResponseData.handleSuccess("成功", repVO);
                case END:
                    return WinResponseData.handleSuccess("最后节点已完成", repVO);
                case CLOSE:
                    return WinResponseData.handleError("流程已经结束",repVO);
                default:
                    throw WinExceptionUtil.winException(BpmExceptionEnum.SYSTEM_ERR);
            }
        } catch (Throwable throwable) {
            throw WinExceptionUtil.winException(BpmExceptionEnum.SYSTEM_ERR);
        }
    }
    /**
     * @Title: batchComplete
     * @Description 批量审批
     * @param flowTaskReqVOs
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/15:01
     */
    @PostMapping("/batchComplete")
    public WinResponseData batchComplete(@RequestBody List<FlowTaskReqVO> flowTaskReqVOs) {
        List<FlowNodeTaskTypeRepVO> list = new ArrayList<>();
        //记录失败数据
        int errorNum = 0;
        for (FlowTaskReqVO flowTaskReqVO : flowTaskReqVOs) {
            FlowNodeTaskTypeRepVO repVO = bpmService.complete(flowTaskReqVO);
            list.add(repVO);
            if(FlowNodeTaskTypeRepVO.EnumRunStatu.CLOSE.equals(repVO.getStatu())||
                    FlowNodeTaskTypeRepVO.EnumRunStatu.EXCEPTION.equals(repVO.getStatu())){
                errorNum++;
            }
        }
        if(errorNum==list.size()){
            return WinResponseData.handleError("批量审批全部失败",list);
        }
        if(errorNum>0){
            return WinResponseData.handleError("批量审批有部分失败",list);
        }
        return WinResponseData.handleSuccess("批量审批成功完成",list);
    }

    /**
     * @Title: listUserInfoToType
     * @Description 获取流程的用户信息
     * @param taskType
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/15:00
     */
    @GetMapping("/listUserInfoToType")
    public WinResponseData listUserInfoToType(@ApiParam(value = "组类型") @RequestParam String taskType) {
        if (ObjectUtil.isEmpty(taskType)) {
            throw WinExceptionUtil.winException(BpmExceptionEnum.PARAMS_EMPTY);
        }
        try {
            Set<String> list = bpmService.listUserInfoToType(taskType);
            return WinResponseData.handleSuccess("成功", list);
        } catch (Throwable throwable) {
            throw WinExceptionUtil.winException(BpmExceptionEnum.SYSTEM_ERR);
        }
    }

}
