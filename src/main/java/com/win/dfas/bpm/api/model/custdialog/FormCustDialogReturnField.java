package com.win.dfas.bpm.api.model.custdialog;

import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import java.io.Serializable;

/**
 *
 * 包名称： com.win.dfas.bpm.api.model.custdialog
 * 类名称：FormCustDialogReturnField
 * 类描述：前端对话框表格，返回后台字段包装类
 * 创建人：@author maliang
 * 创建时间：2019/5/10/17:30
 *
 */
@Data
public class FormCustDialogReturnField implements Serializable {
    @NotEmpty
    private String columnName;
    @NotEmpty
    private String returnName;

    public FormCustDialogReturnField() {
    }
}
