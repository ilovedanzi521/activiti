package com.win.dfas.bpm.api.manager.impl;

import com.win.dfas.bpm.api.manager.FormCustDialogManager;
import com.win.dfas.bpm.api.model.def.form.FormCustDialog;
import com.win.dfas.dao.FormCustDialogMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("formCustDialogManager")
public class FormCustDialogManagerImpl implements FormCustDialogManager {

    @Resource
    FormCustDialogMapper formCustDialogDao;

    @Override
    public FormCustDialog getByKey(String key) {
        List<FormCustDialog> list=formCustDialogDao.getByKey(key);
        return getOne(list);
    }

    @Override
    public FormCustDialog get(String id) {
        List<FormCustDialog> list = formCustDialogDao.getByID(id);
        return getOne(list);
    }

    public FormCustDialog getOne(List<FormCustDialog> list){

        if(list!=null && list.size()>0){
            return list.get(0);
        }
        return null;
    }
}
