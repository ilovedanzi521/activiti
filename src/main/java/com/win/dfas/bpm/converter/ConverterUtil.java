package com.win.dfas.bpm.converter;

import cn.hutool.core.util.ObjectUtil;
import com.win.dfas.bpm.model.BpmConstant;
import com.win.dfas.bpm.model.TaskTypeFormProperty;
import lombok.extern.slf4j.Slf4j;
import org.activiti.bpmn.converter.BpmnXMLConverter;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.bpmn.model.ExtensionAttribute;
import org.activiti.bpmn.model.FormProperty;
import org.activiti.bpmn.model.UserTask;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.repository.DeploymentBuilderImpl;
import org.activiti.engine.repository.DeploymentBuilder;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.bpm.converter
 * 类名称：ConverterUtil
 * 类描述：${TODO}
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

    public static void setUserTaskTypeAttribute(UserTask userTask, String taskType) {
        ExtensionAttribute extensionAttribute = new ExtensionAttribute(BpmConstant.NAMESPACE,BpmConstant.NAME);
        extensionAttribute.setValue(taskType);
        userTask.addAttribute(extensionAttribute);
    }


}
