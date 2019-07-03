package com.win.dfas.bpm.service;

import com.win.dfas.bpm.vo.request.FlowAssignersReqVO;
import com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO;
import com.win.dfas.bpm.vo.response.FlowAssignersRepVO;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 包名称：com.win.dfas.bpm.service
 * 类名称：BpmService
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/17:30
 */
@Service
public interface BpmService {

    List<Task>  selectTask(List<Task> task, String taskType);

    int add(FlowAssignersReqVO flowAssignersReqVO);

    List<FlowAssignersRepVO> queryNodeDescribe(String modelId, String nodeId );

    List<AllFlowAssignersRepVO> queryAllDescribe(String modelId);
}
