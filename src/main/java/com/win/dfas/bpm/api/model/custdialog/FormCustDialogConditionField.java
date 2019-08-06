package com.win.dfas.bpm.api.model.custdialog;

import lombok.Data;

import java.io.Serializable;

/**
 *
 * 包名称：  com.win.dfas.bpm.api.model.custdialog
 * 类名称：FormCustDialogConditionField
 * 类描述：前端对话框表格，查询条件
 * 创建人：@author maliang
 * 创建时间：2019/5/10/17:19
 *
 */
@Data
public class FormCustDialogConditionField implements Serializable {
    /**
     * 列名称
     */
    private String columnName;
    /**
     *  数据类型
     */
    private String dbType;
    /**
     * 显示名称
     */
    private String showName;
    /**
     *  条件值
     */
    private String condition;
    private String valueSource;
    private FormCustDialogConditionField.Value value;

    public FormCustDialogConditionField() {
    }

    @Data
    public static class Value implements Serializable {
        private String ctrlType;
        private String ctrlKey;
        private String ctrlReturn;
        private String text;

        public Value() {
        }
    }
}
