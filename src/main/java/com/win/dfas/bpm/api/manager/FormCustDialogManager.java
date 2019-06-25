package com.win.dfas.bpm.api.manager;


import com.win.dfas.bpm.api.model.def.form.FormCustDialog;

public interface FormCustDialogManager {
    FormCustDialog getByKey(String var1);

    public FormCustDialog get(String entityId);
}

