package com.win.dfas.bpm.controller.api;

import com.win.dfas.bpm.img.DefaultInstHistImgService;
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.constant.InitDataConstant;
import lombok.extern.slf4j.Slf4j;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.*;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricDetail;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.bpmn.behavior.SubProcessActivityBehavior;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.ReadOnlyProcessDefinition;
import org.activiti.engine.impl.pvm.delegate.ActivityBehavior;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 包名称：com.win.dfas.bpm.controller.api
 * 类名称：BpmPngController
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/7/9/17:25
 */
@RestController
@RequestMapping("/bpm/")
@Slf4j
public class BpmPngController {
    @Autowired
    TaskService taskService;

    @Autowired
    HistoryService historyService;

    @Autowired
    RuntimeService runtimeService;

    @Autowired
    RepositoryService repositoryService;

    @Autowired
    protected IdentityService identityService;

    @Autowired
    ProcessEngineConfiguration processEngineConfiguration;
    @Autowired
    DefaultInstHistImgService defaultInstHistImgService;
    @RequestMapping(value = "trace/data/auto/{executionId}")
    public void readResource(@PathVariable("executionId") String executionId, HttpServletResponse response)
            throws Exception {
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(executionId).singleResult();
        BpmnModel bpmnModel;
        String proDefId;
        InputStream imageStream;
        if(processInstance==null){
            HistoricProcessInstance currProcessInstance = historyService.createHistoricProcessInstanceQuery().processInstanceId(executionId).singleResult();
            if(currProcessInstance==null){
                throw WinExceptionUtil.winException(BpmExceptionEnum.FLOW_DEF_NOEXIST);
            }
            String deploymentId = currProcessInstance.getDeploymentId();
            List<String> list = repositoryService.getDeploymentResourceNames(deploymentId);
            proDefId = currProcessInstance.getProcessDefinitionId();
        }else{
            proDefId = processInstance.getProcessDefinitionId();
        }
        bpmnModel = repositoryService.getBpmnModel(proDefId);
        imageStream = defaultInstHistImgService.draw(bpmnModel,executionId);
        // 输出资源内容到相应对象
        byte[] b = new byte[InitDataConstant.BYTE_INIT_CAPACITY];
        int len;
        while ((len = imageStream.read(b, 0, InitDataConstant.BYTE_INIT_CAPACITY)) != -1) {
            response.getOutputStream().write(b, 0, len);
        }

    }

    private List<String> getHighLightedFlows(ProcessDefinitionEntity processDefinition, String processInstanceId) {
        List<String> highLightedFlows = new ArrayList<String>();
        List<HistoricActivityInstance> historicActivityInstances = historyService
                .createHistoricActivityInstanceQuery()
                .processInstanceId(processInstanceId)
                .orderByHistoricActivityInstanceStartTime().asc().list();

        List<String> historicActivityInstanceList = new ArrayList<String>();
        for (HistoricActivityInstance hai : historicActivityInstances) {
            historicActivityInstanceList.add(hai.getActivityId());
        }

        // add current activities to list
        List<String> highLightedActivities = runtimeService.getActiveActivityIds(processInstanceId);
        historicActivityInstanceList.addAll(highLightedActivities);

        // activities and their sequence-flows
        for (ActivityImpl activity : processDefinition.getActivities()) {
            int index = historicActivityInstanceList.indexOf(activity.getId());

            if (index >= 0 && index + 1 < historicActivityInstanceList.size()) {
                List<PvmTransition> pvmTransitionList = activity
                        .getOutgoingTransitions();
                for (PvmTransition pvmTransition : pvmTransitionList) {
                    String destinationFlowId = pvmTransition.getDestination().getId();
                    if (destinationFlowId.equals(historicActivityInstanceList.get(index + 1))) {
                        highLightedFlows.add(pvmTransition.getId());
                    }
                }
            }
        }
        return highLightedFlows;
    }
    /**
     * 读取历史数据
     *
     * @return
     */
    @RequestMapping(value = "trace/view/{executionId}")
    public ModelAndView historyDatas(@PathVariable("executionId") String executionId) {
        ModelAndView mav = new ModelAndView("chapter13/trace-process");

        // 查询Execution对象
        Execution execution = runtimeService.createExecutionQuery().executionId(executionId).singleResult();

        // 查询所有的历史活动记录
        String processInstanceId = execution.getProcessInstanceId();
        List<HistoricActivityInstance> activityInstances = historyService.createHistoricActivityInstanceQuery().processInstanceId(processInstanceId).list();

        // 查询历史流程实例
        HistoricProcessInstance historicProcessInstance = historyService.createHistoricProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();

        // 查询流程有关的变量
        List<HistoricVariableInstance> variableInstances = historyService.createHistoricVariableInstanceQuery()
                .processInstanceId(processInstanceId).list();

        List<HistoricDetail> formProperties = historyService.createHistoricDetailQuery().processInstanceId(processInstanceId).formProperties().list();

        // 查询流程定义对象
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .processDefinitionId(historicProcessInstance.getProcessDefinitionId()).singleResult();

        // 查询运行时流程实例
        ProcessInstance parentProcessInstance = runtimeService.createProcessInstanceQuery()
                .subProcessInstanceId(execution.getProcessInstanceId()).singleResult();

        mav.addObject("parentProcessInstance", parentProcessInstance);
        mav.addObject("historicProcessInstance", historicProcessInstance);
        mav.addObject("variableInstances", variableInstances);
        mav.addObject("activities", activityInstances);
        mav.addObject("formProperties", formProperties);
        mav.addObject("processDefinition", processDefinition);
        mav.addObject("executionId", executionId);

        return mav;
    }

    /**
     * 读取跟踪数据
     *
     * @param executionId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "trace/data/{executionId}")
    @ResponseBody
    public List<Map<String, Object>> readActivityDatas(@PathVariable("executionId") String executionId) throws Exception {
        ExecutionEntity executionEntity = (ExecutionEntity) runtimeService.createExecutionQuery().executionId(executionId).singleResult();
        List<String> activeActivityIds = runtimeService.getActiveActivityIds(executionId);

        RepositoryServiceImpl repositoryServiceImpl = (RepositoryServiceImpl) repositoryService;
        ReadOnlyProcessDefinition deployedProcessDefinition = repositoryServiceImpl
                .getDeployedProcessDefinition(executionEntity.getProcessDefinitionId());

        ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) deployedProcessDefinition;
        //获得当前任务的所有节点
        List<ActivityImpl> activitiList = processDefinition.getActivities();

        List<Map<String, Object>> activityInfos = new ArrayList<Map<String, Object>>();
        for (ActivityImpl activity : activitiList) {

            ActivityBehavior activityBehavior = activity.getActivityBehavior();

            boolean currentActiviti = false;
            // 当前节点
            String activityId = activity.getId();
            if (activeActivityIds.contains(activityId)) {
                currentActiviti = true;
            }
            Map<String, Object> activityImageInfo = packageSingleActivitiInfo(activity, executionEntity.getId(), currentActiviti);
            activityInfos.add(activityImageInfo);

            // 处理子流程
            if (activityBehavior instanceof SubProcessActivityBehavior) {
                List<ActivityImpl> innerActivityList = activity.getActivities();
                for (ActivityImpl innerActivity : innerActivityList) {
                    String innerActivityId = innerActivity.getId();
                    if (activeActivityIds.contains(innerActivityId)) {
                        currentActiviti = true;
                    } else {
                        currentActiviti = false;
                    }
                    activityImageInfo = packageSingleActivitiInfo(innerActivity, executionEntity.getId(), currentActiviti);
                    activityInfos.add(activityImageInfo);
                }
            }

        }

        return activityInfos;
    }

    /**
     * 封装输出信息，包括：当前节点的X、Y坐标、变量信息、任务类型、任务描述
     *
     * @param activity
     * @param currentActiviti
     * @return
     */
    private Map<String, Object> packageSingleActivitiInfo(ActivityImpl activity, String executionId,
                                                          boolean currentActiviti) throws Exception {
        Map<String, Object> activityInfo = new HashMap<String, Object>(InitDataConstant.MAP_INIT_CAPACITY);
        activityInfo.put("currentActiviti", currentActiviti);

        // 设置图形的XY坐标以及宽度、高度
        setSizeAndPositonInfo(activity, activityInfo);

        Map<String, Object> vars = new HashMap<String, Object>(InitDataConstant.MAP_INIT_CAPACITY);
        Map<String, Object> properties = activity.getProperties();
        vars.put("任务名称", properties.get("name"));

        // 当前节点的task
        if (currentActiviti) {
            setCurrentTaskInfo(executionId, activity.getId(), vars);
        }

        activityInfo.put("vars", vars);
        return activityInfo;
    }

    /**
     * 获取当前节点信息
     *
     * @return
     */
    private void setCurrentTaskInfo(String executionId, String activityId, Map<String, Object> vars) {
        Task currentTask = taskService.createTaskQuery().executionId(executionId)
                .taskDefinitionKey(activityId).singleResult();

        if (currentTask == null) {
            return;
        }

        String assignee = currentTask.getAssignee();
        if (assignee != null) {
            User assigneeUser = identityService.createUserQuery().userId(assignee).singleResult();
            String userInfo = assigneeUser.getFirstName() + " " + assigneeUser.getLastName() + "/" + assigneeUser.getId();
            vars.put("当前处理人", userInfo);
            vars.put("创建时间", new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(currentTask.getCreateTime()));
        } else {
            vars.put("任务状态", "未签收");
        }

    }

    /**
     * 设置宽度、高度、坐标属性
     *
     * @param activity
     * @param activityInfo
     */
    private void setSizeAndPositonInfo(ActivityImpl activity, Map<String, Object> activityInfo) {
        activityInfo.put("width", activity.getWidth());
        activityInfo.put("height", activity.getHeight());
        activityInfo.put("x", activity.getX());
        activityInfo.put("y", activity.getY());
    }
}
