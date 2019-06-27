package com.win.dfas.bpm.converter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.win.dfas.bpm.model.BpmConstant;
import lombok.extern.slf4j.Slf4j;
import org.activiti.bpmn.model.BaseElement;
import org.activiti.bpmn.model.FlowElement;
import org.activiti.bpmn.model.FormProperty;
import org.activiti.bpmn.model.UserTask;
import org.activiti.editor.language.json.converter.BaseBpmnJsonConverter;
import org.activiti.editor.language.json.converter.BpmnJsonConverter;
import org.activiti.editor.language.json.converter.UserTaskJsonConverter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 包名称：com.win.dfas.controller.editor
 * 类名称：UserTaskJsonConverter
 * 类描述：新增转换器
 * 创建人：@author wanglei
 * 创建时间：2019/6/26/11:37
 */
@Slf4j
public class CustomUserTaskJsonConverter extends UserTaskJsonConverter{

    @Override
    protected void convertElementToJson(ObjectNode propertiesNode, BaseElement baseElement) {
        super.convertElementToJson(propertiesNode, baseElement);
        UserTask userTask = (UserTask) baseElement;
        //解析新增属性的业务逻辑
//        userTask.setFormProperties();
//        String taskType = userTask.getAttributeValue(BpmConstant.NAMESPACE,BpmConstant.NAME);
//        propertiesNode.put("taskType",taskType);
//        userTask.set
        log.info(userTask.getAttributeValue(BpmConstant.NAMESPACE,BpmConstant.NAME));
    }

    @Override
    protected FlowElement convertJsonToElement(JsonNode elementNode, JsonNode modelNode, Map<String, JsonNode> shapeMap) {

        UserTask userTask = (UserTask)super.convertJsonToElement(elementNode,
                modelNode, shapeMap);
        String taskType=this.getPropertyValueAsString(BpmConstant.NAME, elementNode);
        log.info("convertJsonToElement -tasktype ==="+taskType);
//
////        CustomUserTask task = new CustomUserTask();
////        task.clone(userTask,taskType);
////        ConverterUtil.setUserTaskTypeProperty(userTask,taskType);
        ConverterUtil.setUserTaskTypeAttribute(userTask,taskType);
        return userTask;
    }

    public static void fillTypes(Map<String, Class<? extends BaseBpmnJsonConverter>> convertersToBpmnMap,
                                 Map<Class<? extends BaseElement>, Class<? extends BaseBpmnJsonConverter>> convertersToJsonMap) {

        fillJsonTypes(convertersToBpmnMap);
        fillBpmnTypes(convertersToJsonMap);
    }

    public static void fillJsonTypes(Map<String, Class<? extends BaseBpmnJsonConverter>> convertersToBpmnMap) {
        convertersToBpmnMap.put(STENCIL_TASK_USER, CustomUserTaskJsonConverter.class);
//        convertersToBpmnMap.put("CustomUserTask", CustomUserTaskJsonConverter.class);
    }

    public static void fillBpmnTypes(Map<Class<? extends BaseElement>, Class<? extends BaseBpmnJsonConverter>> convertersToJsonMap) {
        convertersToJsonMap.put(UserTask.class, CustomUserTaskJsonConverter.class);
    }

}
