package com.win.dfas.bpm.service;

import com.win.dfas.bpm.entity.FlowAssigners;
import com.win.dfas.bpm.vo.request.FlowAssignersReqVO;
import com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO;
import com.win.dfas.bpm.vo.response.FlowAssignersRepVO;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * 包名称：com.win.dfas.bpm.service
 * 类名称：BpmService
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/17:30
 */
@Service
public interface BpmService {
    /**
     * @Title: selectTask
     * @Description 查询
     * @param task
     * @param taskType
     * @return java.util.List<org.activiti.engine.task.Task>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:58
     */
    List<Task>  selectTask(List<Task> task, String taskType);
    /**
     * @Title: add
     * @Description 增加用户信息
     * @param flowAssignersReqVO
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:59
     */
    int add(FlowAssignersReqVO flowAssignersReqVO);
    /**
     * @Title: queryNodeDescribe
     * @Description 根据节点和流程modelId获取用户信息
     * @param modelId
     * @param nodeId
     * @return java.util.List<com.win.dfas.bpm.vo.response.FlowAssignersRepVO>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:59
     */
    List<FlowAssignersRepVO> queryNodeDescribe(String modelId, String nodeId );
    /**
     * @Title: queryAllDescribe
     * @Description 根据modelId获取所有节点的信息
     * @param modelId
     * @return java.util.List<com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:00
     */
    List<AllFlowAssignersRepVO> queryAllDescribe(String modelId);
    /**
     * @Title: deleteByPrimaryKey
     * @Description 根据主键删除
     * @param flowAssigners
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:00
     */
    int deleteByPrimaryKey(FlowAssigners flowAssigners);
    /**
     * @Title: nextUserInfo
     * @Description 下一节点信息
     * @param processId
     * @return java.util.List<java.lang.String>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:01
     */
    List<String> nextUserInfo(String processId);
    /**
     * @Title: listUserInfoToType
     * @Description 根据taskType获取所有的用户信息
     * @param tasktype
     * @return java.util.Set<java.lang.String>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:01
     */
    Set<String> listUserInfoToType(String tasktype);
    /**
     * @Title: updateTaskTypeToModel
     * @Description 更新taskType信息
     * @param flowAssignersReqVO
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:01
     */
    int updateTaskTypeToModel(FlowAssignersReqVO flowAssignersReqVO);
    /**
     * @Title: nextTaskType
     * @Description 获取下一个节点的taskType组信息
     * @param processId
     * @return java.lang.String
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:02
     */
    String nextTaskType(String processId);
}
