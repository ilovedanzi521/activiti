package com.win.dfas.bpm.converter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.win.dfas.bpm.constant.BpmConstant;
import lombok.extern.slf4j.Slf4j;
import org.activiti.bpmn.model.BaseElement;
import org.activiti.bpmn.model.FlowElement;
import org.activiti.bpmn.model.SequenceFlow;
import org.activiti.bpmn.model.UserTask;
import org.activiti.editor.language.json.converter.BaseBpmnJsonConverter;
import org.activiti.editor.language.json.converter.SequenceFlowJsonConverter;
import org.activiti.editor.language.json.converter.UserTaskJsonConverter;

import java.math.BigDecimal;
import java.util.Map;

/**
 * 包名称：com.win.dfas.controller.editor
 * 类名称：UserTaskJsonConverter
 * 类描述：新增转换器
 * 创建人：@author wanglei
 * 创建时间：2019/6/26/11:37
 */
@Slf4j
public class CustomSequenceFlowJsonConverter extends SequenceFlowJsonConverter {

    @Override
    protected void convertElementToJson(ObjectNode propertiesNode, BaseElement baseElement) {
        super.convertElementToJson(propertiesNode, baseElement);
        SequenceFlow sequenceFlow = (SequenceFlow) baseElement;
        //解析新增属性的业务逻辑
        log.info(sequenceFlow.getConditionExpression());
    }

    @Override
    protected FlowElement convertJsonToElement(JsonNode elementNode, JsonNode modelNode, Map<String, JsonNode> shapeMap) {

        SequenceFlow sequenceFlow = (SequenceFlow)super.convertJsonToElement(elementNode,
                modelNode, shapeMap);
        //获取控制类型controlType  ${minLimit<=controlType<maxLimit}

        String minLimit=this.getPropertyValueAsString(BpmConstant.MINLIMITNAME, elementNode);
        String maxLimit=this.getPropertyValueAsString(BpmConstant.MAXLIMITNAME, elementNode);
        String permit=this.getPropertyValueAsString(BpmConstant.PERMITNAME, elementNode);
        BigDecimal min = new BigDecimal(minLimit);
        BigDecimal max = new BigDecimal(maxLimit);
        String amtEl = BpmConstant.AMTCONDITION+">="+minLimit+" and "+BpmConstant.AMTCONDITION+"<"+maxLimit;
        String permitEl = BpmConstant.PERMITNAME+"=="+permit;

        sequenceFlow.setConditionExpression("${"+amtEl+" and "+permitEl+"}");
        log.info("el====="+"${"+amtEl+" and "+permitEl+"}");
//
////        CustomUserTask task = new CustomUserTask();
////        task.clone(userTask,taskType);
////        ConverterUtil.setUserTaskTypeProperty(userTask,taskType);

//        ConverterUtil.setFlowElementAttribute(sequenceFlow,BpmConstant.MINLIMITNAME,minLimit);
//        ConverterUtil.setFlowElementAttribute(sequenceFlow,BpmConstant.MAXLIMITNAME,maxLimit);
        return sequenceFlow;
    }

    public static void fillTypes(Map<String, Class<? extends BaseBpmnJsonConverter>> convertersToBpmnMap,
                                 Map<Class<? extends BaseElement>, Class<? extends BaseBpmnJsonConverter>> convertersToJsonMap) {

        fillJsonTypes(convertersToBpmnMap);
        fillBpmnTypes(convertersToJsonMap);
    }

    public static void fillJsonTypes(Map<String, Class<? extends BaseBpmnJsonConverter>> convertersToBpmnMap) {
        convertersToBpmnMap.put(STENCIL_SEQUENCE_FLOW, CustomSequenceFlowJsonConverter.class);
    }

    public static void fillBpmnTypes(Map<Class<? extends BaseElement>, Class<? extends BaseBpmnJsonConverter>> convertersToJsonMap) {
        convertersToJsonMap.put(SequenceFlow.class, CustomSequenceFlowJsonConverter.class);
    }
}
