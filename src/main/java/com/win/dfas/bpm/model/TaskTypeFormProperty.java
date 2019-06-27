package com.win.dfas.bpm.model;

import lombok.Data;
import org.activiti.bpmn.model.FormProperty;
import org.activiti.engine.form.FormType;

/**
 * 包名称：com.win.dfas.bpm.model
 * 类名称：TaskTypeFormProperty
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/11:18
 */
@Data
public class TaskTypeFormProperty extends FormProperty {
   private String taskTypeValue;
}
