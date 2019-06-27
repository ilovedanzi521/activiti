package com.win.dfas.bpm.model;

/**
 * 包名称：com.win.dfas.bpm.model
 * 类名称：TaskEnum
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/26/15:44
 */
public enum TaskEnum {
    //分配
    ALLOT("1"),
    //执行
    EXECUTE("2"),
    //审批
    APPROVAL("3");

    private String value;

    TaskEnum(String value)
    {
        this.value = value;
    }

    public String getValue()
    {
        return value;
    }
}
