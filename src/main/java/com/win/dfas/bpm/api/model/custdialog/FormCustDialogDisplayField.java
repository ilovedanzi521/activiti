package com.win.dfas.bpm.api.model.custdialog;

import lombok.Data;

import java.io.Serializable;

/**
 *
 * 包名称： com.win.dfas.bpm.api.model.custdialog
 * 类名称：FormCustDialogDisplayField
 * 类描述：前端对话框表格，显示类
 * 创建人：@author maliang
 * 创建时间：2019/5/10/17:23
 *
 */
@Data
public class FormCustDialogDisplayField implements Serializable {
    /**
     * 字段名称
     */
    private String columnName;
    /**
     * 显示名称
     */
    private String showName;
    private String formatter;

    public FormCustDialogDisplayField() {
    }
}
