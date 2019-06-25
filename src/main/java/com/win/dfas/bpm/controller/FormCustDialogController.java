package com.win.dfas.bpm.controller;

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.win.dfas.bpm.api.manager.FormCustDialogManager;
import com.win.dfas.bpm.api.model.def.form.FormCustDialog;
import com.win.dfas.bpm.util.AppUtil;
import com.win.dfas.bpm.util.RequestUtil;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping({"/dfas-common-bpm/form/formCustDialog/"})
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
//        return YhResponseData.handleSuccess(formCustDialog);
        return jsonObject;
    }


//    @RequestMapping({"listData_{key}"})
//    public JSONObject listData(Pagination<T> pageParam, @PathVariable("key") String key) throws Exception {
//        JSONObject jsonObject = new JSONObject();
//        ListDataManager bean = (ListDataManager) AppUtil.getBean(key);
//        List listData = bean.getListData(pageParam);
//        jsonObject.put("rows",listData);
//        jsonObject.put("isOk",true);
//        return jsonObject;
//    }
//    protected String getModelDesc() {
//        return "自定义对话框";
//    }
}
