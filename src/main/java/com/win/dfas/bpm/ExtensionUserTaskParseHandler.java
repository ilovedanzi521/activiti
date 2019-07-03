package com.win.dfas.bpm;

import com.win.dfas.bpm.constant.BpmConstant;
import com.win.dfas.bpm.constant.UserTaskTypeEnum;
import org.activiti.bpmn.model.UserTask;
import org.activiti.engine.impl.bpmn.parser.BpmnParse;
import org.activiti.engine.impl.bpmn.parser.handler.UserTaskParseHandler;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.impl.task.TaskDefinition;
import org.springframework.stereotype.Component;

/**
 * 包名称：com.win.dfas.bpm
 * 类名称：ExtensionUserTaskParseHandler
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/15:49
 */
@Component
public class ExtensionUserTaskParseHandler extends UserTaskParseHandler {
    @Override
    protected void executeParse(BpmnParse bpmnParse, UserTask userTask) {
        //调用上层的解析
        super.executeParse(bpmnParse, userTask);
        ActivityImpl activity = bpmnParse.getCurrentScope().findActivity(userTask.getId());
        //将扩展属性设置给activity
        activity.setProperty(BpmConstant.NAME, userTask.getAttributeValue(BpmConstant.NAMESPACE,BpmConstant.NAME));
//        activity.set
    }

}
