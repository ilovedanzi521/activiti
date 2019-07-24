package com.win.dfas.bpm.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.win.dfas.bpm.constant.BpmConstant;

import com.win.dfas.bpm.constant.UserClassEnum;
import com.win.dfas.bpm.entity.FlowAssigners;
import com.win.dfas.bpm.entity.FlowAssignersKey;
import com.win.dfas.bpm.service.BpmService;
import com.win.dfas.bpm.vo.request.FlowAssignersReqVO;
import com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO;
import com.win.dfas.bpm.vo.response.FlowAssignersRepVO;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.controller.feign.IuserFeignClient;
import com.win.dfas.dao.FlowAssignersMapper;
import com.win.dfas.vo.request.FlowTaskReqVO;
import com.win.dfas.vo.request.UserInfoReqVO;
import com.win.dfas.vo.response.DepartmentInfoRepVO;
import com.win.dfas.vo.response.RoleInfoRepVO;
import com.win.dfas.vo.response.UserInfoRepVO;
import lombok.extern.slf4j.Slf4j;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.impl.task.TaskDefinition;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.task.Task;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.activiti.engine.delegate.Expression;

import java.util.*;

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
    IuserFeignClient userFeignClient;
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

            log.info("task={}",task);
            ActivityImpl activityImpl = definitionEntity.findActivity(activitiElementId);
            log.info(String.valueOf(activityImpl.getProperty(BpmConstant.NAME)));
            if(taskType.equals(activityImpl.getProperty(BpmConstant.NAME))){
                list.add(task);
            }else if(ObjectUtil.isEmpty(taskType)) {
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
        if(flowAssignersMapper.selectByPrimaryKey(entity)!=null){
            return flowAssignersMapper.updateByPrimaryKeySelective(entity);
        }
        entity.setCreateTime(new Date());
        return flowAssignersMapper.insert(entity);
    }

    @Override
    public List<FlowAssignersRepVO> queryNodeDescribe(String modelId, String nodeId) {
        List<FlowAssignersRepVO> list = flowAssignersMapper.queryNodeDescribe(modelId,nodeId);
        for (FlowAssignersRepVO flowAssignersRepVO : list) {
            for (UserClassEnum userClassEnum : UserClassEnum.values()) {
                if(userClassEnum.getKey().equals(flowAssignersRepVO.getPluginType())){
                    flowAssignersRepVO.setAllDescription(userClassEnum.getValue()+flowAssignersRepVO.getDescription()+";");
                    break;
                }
            }
        }
        return list;
    }

    @Override
    public List<AllFlowAssignersRepVO> queryAllDescribe(String modelId) {
        return flowAssignersMapper.queryAllDescribe(modelId);
    }

    @Override
    public int deleteByPrimaryKey(FlowAssigners flowAssigners) {
        return flowAssignersMapper.deleteByPrimaryKey(flowAssigners);
    }

    @Override
    public List<String> nextUserInfo(String processId) {
        Task task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
        String processDefinitionId=task.getProcessDefinitionId(); // 获取流程定义id
        ProcessDefinitionEntity processDefinitionEntity=(ProcessDefinitionEntity) repositoryService.getProcessDefinition(processDefinitionId);
        ActivityImpl activityImpl=processDefinitionEntity.findActivity(task.getTaskDefinitionKey()); // 根据活动id获取活动实例

        TaskDefinition taskDef = (TaskDefinition)activityImpl.getProperties().get("taskDefinition");
        Set<Expression> userCodes = taskDef.getCandidateUserIdExpressions();//候选人
        Set<Expression> roleCodes = taskDef.getCandidateGroupIdExpressions();//候选组
//        activityImpl.getProperty(Ac)
        List<String> list = getUserInfofromDepartment(getUserInfo(roleCodes));
        List<String> userList = getUserInfo(userCodes);
        userList.addAll(list);
        return userList;
    }

    @Override
    public Set<String> listUserInfoToType(String tasktype) {
        List<String> list =  flowAssignersMapper.listUserInfoToType(tasktype);
        Set<String> set = new HashSet<>();
        for (String beforeCode : list) {
            String [] afterCodes = beforeCode.split(",",-1);
            for (String code : afterCodes) {
                set.add(code);
            }
        }
        return set;
    }

    @Override
    public int updateTaskTypeToModel(FlowAssignersReqVO flowAssignersReqVO) {
//        List<FlowAssigners> list = flowAssignersMapper.selectByNodeId(flowAssignersReqVO);
//        if(list.size()<=0){
//            return 0;
//        }
        return  flowAssignersMapper.updateTaskTypeToModel(flowAssignersReqVO);
    }

    private List<String> getUserInfo(Set<Expression> expressions) {
        List<String> userInfo = new ArrayList<>();
        for (Expression expression : expressions) {
            List<String> roles =  Arrays.asList(expression.getExpressionText().split(",",-1));
            userInfo.addAll(roles);
        }
        return userInfo;
    }

    private List<String> getUserInfofromDepartment(List<String> departmentCodes) {
        List<String> userInfo = new ArrayList<>();
        for (String departmentCode : departmentCodes) {
            UserInfoReqVO userInfoReq = new UserInfoReqVO();
            userInfoReq.setDepartmentId(departmentCode);
            userInfoReq.setUserState("1"); //1表示用户状态为正常
            WinResponseData rtn = userFeignClient.queryUserInfoList(userInfoReq);
            if(WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())){
                List<UserInfoRepVO> repVOS = (List<UserInfoRepVO>) rtn.getData();
                for (UserInfoRepVO repVO : repVOS) {
                    userInfo.add(repVO.getUserId());
                }
            }
        }
        log.info("用户信息========"+userInfo.toString());
        return userInfo;
    }
}
