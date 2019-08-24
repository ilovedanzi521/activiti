package com.win.dfas.bpm.api.model.custdialog;

import lombok.Data;

import java.io.Serializable;

/**
 * @author wanglei
 */
@Data
public class FormCustDialogTreeConfig implements Serializable {
    private String id;
    private String pid;
    private String pidInitVal;
    private boolean pidInitValScript;
    private String showColumn;

    public FormCustDialogTreeConfig() {
    }
}
