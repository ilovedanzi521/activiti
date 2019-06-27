package com.win.dfas.bpm.service;

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
}
