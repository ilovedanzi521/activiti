package com.win.dfas.bpm.controller;

import com.win.dfas.bpm.model.BpmConstant;
import com.win.dfas.bpm.service.BpmService;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.vo.request.FlowTaskReqVO;
import com.win.dfas.vo.response.ParamFlowRepVO;
import lombok.extern.slf4j.Slf4j;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.bpm
 * 类名称：BpmController
 * 类描述：BPM信息查询接口
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/13:25
 */
@RestController
@RequestMapping("/param/bpm")
@Slf4j
public class BpmController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    private BpmService bpmService;

    @RequestMapping("/getTaskById/{instanceId}")
    public WinResponseData queryTaskInfoByTask( @PathVariable("instanceId") String instanceId) {
//        String taskId = flowTask.getTaskId();
        //流程运行任务
        Task currentTask = taskService.createTaskQuery().processInstanceId(instanceId).singleResult();
//        log.info(currentTask);
        String baseElementId = currentTask.getTaskDefinitionKey();
        log.info("currentTask.getProcessDefinitionId()="+currentTask.getProcessDefinitionId());
        //获取流程定义信息
        String defId = currentTask.getProcessDefinitionId();
        ProcessDefinitionEntity definitionEntity = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
                .getProcessDefinition(defId);
        //获取流程实例
        ProcessInstance pi=runtimeService.createProcessInstanceQuery() // 根据流程实例id获取流程实例
                .processInstanceId(instanceId)
                .singleResult();

        log.info("pi.getActivityId()="+pi.getActivityId());
        ActivityImpl activityImpl = definitionEntity.findActivity(pi.getActivityId());
        //BpmnModel bm = repositoryService.getBpmnModel(instanceId);
        //获取task
        log.info(activityImpl.getProperty(BpmConstant.NAME).toString());
        return WinResponseData.handleSuccess("成功");
    }

    /**
     * 查询用户未完成任务
     * @param flowTaskReqVO
     * @return
     */
    @PostMapping("/getTaskInfo")
    public WinResponseData queryTaskInfoByTask( @RequestBody FlowTaskReqVO flowTaskReqVO) {
        String groupName = flowTaskReqVO.getGroupName();
        String username = flowTaskReqVO.getUserName();
        String taskType = flowTaskReqVO.getTaskType();
        //按照类型返回task列表
        List<Task> list = new ArrayList<Task>();
        //第一步获取用户组流程信息
        List<Task> groupTasks = taskService.createTaskQuery().taskCandidateGroup(groupName).list();
        list.addAll(bpmService.selectTask(groupTasks,taskType));
        //第二步获取用户流程信息
        List<Task> userTasks = taskService.createTaskQuery().taskCandidateUser(username).list();
        list.addAll(bpmService.selectTask(userTasks,taskType));
        //获取task
//        log.info(activityImpl.getProperty(BpmConstant.NAME).toString());

        return WinResponseData.handleSuccess("成功",list);
    }



}

