package com.win.dfas.vo.response;

/**
 * 包名称：com.win.dfas.vo.response
 * 类名称：DeleteEnum
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/17/15:41
 */
public enum DeleteEnum {
    //只存在流程分类
    ONLY_CLASS("1"),
    //存在流程分组但是没有流程
    EXIST_GROUP("2"),
    //存在流程
    EXIST_INST("3");

    private String value;

    DeleteEnum(String value)
    {
        this.value = value;
    }

    public String getValue()
    {
        return value;
    }
}
