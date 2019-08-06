package com.win.dfas.bpm.api.model.def;

import lombok.Data;

import java.io.Serializable;
/**
 * 包名称：com.win.dfas.bpm.api.model.def
 * 类名称：BpmDataModel
 * 类描述：BpmDataModel
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
@Data
public class BpmDataModel implements Serializable {
    private String name = "";
    private String code = "";

    public BpmDataModel() {
    }
}
