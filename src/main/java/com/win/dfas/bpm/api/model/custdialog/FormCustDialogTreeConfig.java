package com.win.dfas.bpm.api.model.custdialog;

import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import java.io.Serializable;

@Data
public class FormCustDialogTreeConfig implements Serializable {
    @NotEmpty
    private String id;
    @NotEmpty
    private String pid;
    private String pidInitVal;
    private boolean pidInitValScript;
    @NotEmpty
    private String showColumn;

    public FormCustDialogTreeConfig() {
    }
}
