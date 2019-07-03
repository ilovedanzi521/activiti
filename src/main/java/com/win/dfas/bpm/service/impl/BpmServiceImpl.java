package com.win.dfas.bpm.service.impl;

import com.win.dfas.bpm.constant.BpmConstant;

import com.win.dfas.bpm.dao.FlowAssignersMapper;
import com.win.dfas.bpm.entity.FlowAssigners;
import com.win.dfas.bpm.service.BpmService;
import com.win.dfas.bpm.vo.request.FlowAssignersReqVO;
import com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO;
import com.win.dfas.bpm.vo.response.FlowAssignersRepVO;
import lombok.extern.slf4j.Slf4j;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.task.Task;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.bpm.service.impl
 * 类名称：BpmServiceImpl
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/17:49
 */
@Slf4j
@Service
public class BpmServiceImpl implements BpmService {
    @Autowired
    private FlowAssignersMapper flowAssignersMapper;
    @Autowired
    private TaskService taskService;
    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private RepositoryService repositoryService;
    @Override
    public List<Task> selectTask(List<Task> tasks, String taskType) {
        //可使用缓存
        //TODO
        List<Task> list = new ArrayList<>();
        for (Task task : tasks) {
            String defId = task.getProcessDefinitionId();
            ProcessDefinitionEntity definitionEntity = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
                    .getProcessDefinition(defId);
            String activitiElementId = task.getTaskDefinitionKey();
            log.info("activitiElementId="+activitiElementId);
            ActivityImpl activityImpl = definitionEntity.findActivity(activitiElementId);
            log.info(String.valueOf(activityImpl.getProperty(BpmConstant.NAME)));
            if(taskType.equals(activityImpl.getProperty(BpmConstant.NAME))){
                list.add(task);
            }
        }
        return list;
    }

    @Override
    public int add(FlowAssignersReqVO flowAssignersReqVO) {
        FlowAssigners entity = new FlowAssigners();
        BeanUtils.copyProperties(flowAssignersReqVO, entity);
//        entity.setId(PrimaryKeyUtil.generateId());
        //todo
        return flowAssignersMapper.insert(entity);
    }

    @Override
    public List<FlowAssignersRepVO> queryNodeDescribe(String modelId, String nodeId) {
        return flowAssignersMapper.queryNodeDescribe(modelId,nodeId);
    }

    @Override
    public List<AllFlowAssignersRepVO> queryAllDescribe(String modelId) {
        return flowAssignersMapper.queryAllDescribe(modelId);
    }
}
