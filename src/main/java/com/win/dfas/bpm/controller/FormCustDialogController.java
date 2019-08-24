package com.win.dfas.bpm.controller;

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.win.dfas.bpm.api.manager.FormCustDialogManager;
import com.win.dfas.bpm.api.model.def.form.FormCustDialog;
import com.win.dfas.bpm.util.RequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 包名称：com.win.dfas.bpm.controller
 * 类名称：FormCustDialogController
 * 类描述：FormCustDialogController
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
@RestController
@RequestMapping({"/form/formCustDialog/"})
public class FormCustDialogController {
    @Autowired
    FormCustDialogManager formCustDialogManager;

    public FormCustDialogController() {
    }

    @RequestMapping({"getObject"})
    @ResponseBody
    public JSONObject getObject(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String id = RequestUtil.getString(request, "id");
        String key = RequestUtil.getString(request, "key");
        FormCustDialog formCustDialog = null;
        if (ObjectUtil.isNotEmpty(id)) {
            formCustDialog = (FormCustDialog)this.formCustDialogManager.get(id);
        } else if (ObjectUtil.isNotEmpty(key)) {
            formCustDialog = this.formCustDialogManager.getByKey(key);
        }
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("data",formCustDialog);
        jsonObject.put("isOk",true);
        return jsonObject;
    }
}
