package com.win.dfas.bpm.constant;

/**
 * 包名称：com.win.dfas.vo.response
 * 类名称：DeleteEnum
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/17/15:41
 */
public enum UserTaskTypeEnum {
    //只存在流程分类
    ALLOT("Allot"),
    //存在流程分组但是没有流程
    EXECUTE("Execute"),
    //存在流程
    APPROVAL("Approval");

    private String value;

    UserTaskTypeEnum(String value)
    {
        this.value = value;
    }

    public String getValue()
    {
        return value;
    }
}
