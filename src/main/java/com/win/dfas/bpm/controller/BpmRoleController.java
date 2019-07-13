package com.win.dfas.bpm.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.win.dfas.bpm.constant.BpmConstant;
import com.win.dfas.bpm.entity.FlowAssigners;
import com.win.dfas.bpm.service.BpmService;
import com.win.dfas.bpm.util.RequestUtil;
import com.win.dfas.bpm.vo.request.FlowAssignersReqVO;
import com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO;
import com.win.dfas.bpm.vo.response.FlowAssignersRepVO;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.vo.request.FlowTaskReqVO;
import com.win.dfas.vo.response.ParamFlowRepVO;
import io.swagger.annotations.ApiOperation;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
@RequestMapping("/dfas-common-bpm/bpm/process/def")
@Slf4j
public class BpmRoleController {
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


    @ApiOperation(value = "查询流程所有节点的处理人ID列表")
    @RequestMapping(value = "/getUserNodeAssigners")
    public WinResponseData listUserNodeAssigners( HttpServletRequest request, HttpServletResponse response){
        String modelId = RequestUtil.getString(request, "modelId");
        String nodeId = RequestUtil.getString(request, "nodeId");//
        List<FlowAssignersRepVO> list = bpmService.queryNodeDescribe(modelId,nodeId);
        log.info(list.toString());
        return WinResponseData.handleSuccess("成功",list);
    }

    @ApiOperation(value = "查询流程所有节点的处理人ID列表")
    @RequestMapping(value = "/getAllNodeAssigners")
    public WinResponseData listAllNodeAssigners( HttpServletRequest request, HttpServletResponse response){
        String modelId = RequestUtil.getString(request, "modelId");
        List<AllFlowAssignersRepVO> list = bpmService.queryAllDescribe(modelId);
        log.info(list.toString());
        return WinResponseData.handleSuccess("成功",list);
    }
    @PostMapping(value = "/deleteUserNodeAssigners")
    public WinResponseData deleteUserNodeAssigners( HttpServletRequest request, HttpServletResponse response){
        String modelId = RequestUtil.getString(request, "modelId");
        String nodeId = RequestUtil.getString(request, "nodeId");//
        Integer index = Integer.parseInt(RequestUtil.getString(request, "descIndex"));
        String description = RequestUtil.getString(request, "description");
        String pluginType = RequestUtil.getString(request, "pluginType");
        FlowAssigners flowAssigners = new FlowAssigners();
        flowAssigners.setPluginType(pluginType);
        flowAssigners.setModelId(modelId);
        flowAssigners.setNodeId(nodeId);
        flowAssigners.setDescIndex(index);
        bpmService.deleteByPrimaryKey(flowAssigners);
        return WinResponseData.handleSuccess("成功");
    }


    @ApiOperation(value = "保存节点用户信息")
    @RequestMapping(value = "/saveUserNodeAssigners")
    public WinResponseData saveUserNodeAssigners(HttpServletRequest request, HttpServletResponse response){
        String modelId = RequestUtil.getString(request, "modelId");
        String nodeId = RequestUtil.getString(request, "nodeId");//
        Integer index = Integer.parseInt(RequestUtil.getString(request, "descIndex"));
        String description = RequestUtil.getString(request, "description");
        String codeDesc = RequestUtil.getString(request, "codeDesc");
        String pluginType = RequestUtil.getString(request, "pluginType");

        FlowAssignersReqVO flowAssignersReqVO = new FlowAssignersReqVO(modelId,nodeId,index,description,codeDesc,pluginType);
        log.info(flowAssignersReqVO.toString());
        bpmService.add(flowAssignersReqVO);
        return WinResponseData.handleSuccess("成功");
    }

}

