package com.win.dfas.bpm.api.manager;


import com.win.dfas.bpm.api.model.def.form.FormCustDialog;

/**
 * 包名称：com.win.dfas.bpm.api.manager
 * 类名称：FormCustDialogManager
 * 类描述：FormCustDialogManager
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
public interface FormCustDialogManager {
    /**
     * @Title: getByKey
     * @Description 根据key获取弹框
     * @param var1
     * @return com.win.dfas.bpm.api.model.def.form.FormCustDialog
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:06
     */
    public FormCustDialog getByKey(String var1);
    /**
     * @Title: get
     * @Description 根据id获取弹框
     * @param entityId
     * @return com.win.dfas.bpm.api.model.def.form.FormCustDialog
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:07
     */
    public FormCustDialog get(String entityId);
}

