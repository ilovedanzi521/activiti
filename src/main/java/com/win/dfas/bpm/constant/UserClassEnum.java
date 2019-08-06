package com.win.dfas.bpm.constant;

/**
 * 包名称：com.win.dfas.bpm.constant
 * 类名称：UserClassEnum
 * 类描述：流程用户组和用户信息分类
 * 创建人：@author wanglei
 * 创建时间：2019/7/3/17:03
 */
public enum  UserClassEnum {
    //用户信息
    USER("user","[姓名]"),
    //部门信息
    GROUP("group","[部门]");

    private String key;
    private String value;

    UserClassEnum(String key,String value)
    {
        this.key = key;
        this.value = value;
    }

    public String getValue()
    {
        return value;
    }
    public String getKey()
    {
        return key;
    }
}
