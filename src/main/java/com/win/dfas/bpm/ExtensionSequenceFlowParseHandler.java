package com.win.dfas.bpm;

import com.win.dfas.bpm.constant.BpmConstant;
import com.win.dfas.bpm.converter.ConverterUtil;
import org.activiti.bpmn.model.SequenceFlow;
import org.activiti.bpmn.model.UserTask;
import org.activiti.engine.impl.bpmn.parser.BpmnParse;
import org.activiti.engine.impl.bpmn.parser.handler.SequenceFlowParseHandler;
import org.activiti.engine.impl.bpmn.parser.handler.UserTaskParseHandler;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.springframework.stereotype.Component;

/**
 * 包名称：com.win.dfas.bpm
 * 类名称：ExtensionUserTaskParseHandler
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/15:49
 */
@Component
public class ExtensionSequenceFlowParseHandler extends SequenceFlowParseHandler {

    @Override
    protected void executeParse(BpmnParse bpmnParse, SequenceFlow sequenceFlow) {
        super.executeParse(bpmnParse, sequenceFlow);
//        ActivityImpl activity = bpmnParse.getCurrentScope().findActivity(sequenceFlow.getId());
        //将扩展属性设置给activity
//        sequenceFlow.getAttributeValue(BpmConstant.NAMESPACE,BpmConstant.MAXLIMITNAME);
//        ConverterUtil.setFlowElementAttribute(sequenceFlow,BpmConstant.MAXLIMITNAME);

//        activity.setProperty(BpmConstant.NAME, sequenceFlow.getAttributeValue(BpmConstant.NAMESPACE,BpmConstant.NAME));


    }
}
