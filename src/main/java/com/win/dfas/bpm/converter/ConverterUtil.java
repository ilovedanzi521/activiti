package com.win.dfas.bpm.converter;

import com.win.dfas.bpm.constant.BpmConstant;
import lombok.extern.slf4j.Slf4j;
import org.activiti.bpmn.converter.BpmnXMLConverter;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.bpmn.model.ExtensionAttribute;
import org.activiti.bpmn.model.FlowElement;
import org.activiti.bpmn.model.UserTask;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.repository.DeploymentBuilder;

import java.io.UnsupportedEncodingException;

/**
 * 包名称：com.win.dfas.bpm.converter
 * 类名称：ConverterUtil
 * 类描述：ConverterUtil
 * 创建人：@author wanglei
 * 创建时间：2019/6/26/20:20
 */
@Slf4j
public class ConverterUtil {
    /**
     * 增加打印
     * @param builder
     * @param resourceName
     * @param bpmnModel
     * @return
     */
    public static DeploymentBuilder convertToXML(DeploymentBuilder builder, String resourceName, BpmnModel bpmnModel) {
        BpmnXMLConverter bpmnXMLConverter = new BpmnXMLConverter();
        try {
            String bpmn20Xml = new String(bpmnXMLConverter.convertToXML(bpmnModel), "UTF-8");
            builder.addString(resourceName, bpmn20Xml);
            log.info("xml==========="+bpmn20Xml);
            return builder;
        } catch (UnsupportedEncodingException var5) {
            throw new ActivitiException("Error while transforming BPMN model to xml: not UTF-8 encoded", var5);
        }
    }
    /**
     * @Title: setUserTaskTypeAttribute
     * @Description: 设置userTask节点的属性
     * @param userTask
     * @param taskType
     * @return void
     * @throws
     * @author wanglei
     * @Date 2019/7/2/9:44
     */
    public static void setUserTaskTypeAttribute(UserTask userTask, String taskType) {
        ExtensionAttribute extensionAttribute = new ExtensionAttribute(BpmConstant.NAMESPACE,BpmConstant.NAME);
        extensionAttribute.setValue(taskType);
        userTask.addAttribute(extensionAttribute);
    }
    /**
     * @Title: setFlowElementAttribute
     * @Description: 设置activiti元素的属性
     * @param flowElement
     * @param name
     * @param value
     * @return void
     * @throws
     * @author wanglei
     * @Date 2019/7/2/9:44
     */
    public static void setFlowElementAttribute(FlowElement flowElement,String name, String value) {
        ExtensionAttribute extensionAttribute = new ExtensionAttribute(BpmConstant.NAMESPACE,name);
        extensionAttribute.setValue(value);
        flowElement.addAttribute(extensionAttribute);
    }


}
