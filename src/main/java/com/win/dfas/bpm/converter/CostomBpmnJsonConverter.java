package com.win.dfas.bpm.converter;

import org.activiti.editor.language.json.converter.BpmnJsonConverter;

/**
 * 包名称：com.win.dfas.bpm.converter
 * 类名称：CostomBpmnJsonConverter
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/26/17:58
 */
public class CostomBpmnJsonConverter extends BpmnJsonConverter {
    static {
        CustomUserTaskJsonConverter.fillTypes(convertersToBpmnMap, convertersToJsonMap);
        CustomSequenceFlowJsonConverter.fillTypes(convertersToBpmnMap, convertersToJsonMap);
    }
}
