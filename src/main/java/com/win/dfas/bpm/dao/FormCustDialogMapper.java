package com.win.dfas.bpm.dao;

import com.win.dfas.bpm.api.model.def.form.FormCustDialog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface FormCustDialogMapper {
    public List<FormCustDialog> getByKey(@Param("key") String key);



    List<FormCustDialog> getByID(@Param("id") String id);
}
