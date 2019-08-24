package com.win.dfas.dao;

import com.win.dfas.bpm.api.model.def.form.FormCustDialog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
/**
 * 包名称：com.win.dfas.dao
 * 类名称：FormCustDialogMapper
 * 类描述：FormCustDialogMapper
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
@Mapper
public interface FormCustDialogMapper {
    /**
     * @Title: getByKey
     * @Description 根据key获取弹框
     * @param key
     * @return java.util.List<com.win.dfas.bpm.api.model.def.form.FormCustDialog>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:07
     */
    public List<FormCustDialog> getByKey(@Param("key") String key);
    /**
     * @Title: getByID
     * @Description 根据id获取弹框
     * @param id
     * @return java.util.List<com.win.dfas.bpm.api.model.def.form.FormCustDialog>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:07
     */
    List<FormCustDialog> getByID(@Param("id") String id);
}
