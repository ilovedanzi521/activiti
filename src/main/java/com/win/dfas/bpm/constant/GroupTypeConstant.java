package com.win.dfas.bpm.constant;


/**
 *
 * 包名称： com.win.dfas.bpm.api.constant
 * 类名称：GroupTypeConstant
 * 类描述：用户类别枚举，暂时只支持角色
 * 创建人：@author maliang
 * 创建时间：2019/5/10/16:33
 *
 */
public enum GroupTypeConstant {
//    目前只支持角色
//    ORG("org", "组织"),
//    POST("post", "岗位"),
    ROLE("role", "角色");
    private String key;
    private String label;

    GroupTypeConstant(String key, String label) {
        this.key = key;
        this.label = label;
    }

    public String key() {
        return key;
    }

    public String label() {
        return label;
    }


    public static GroupTypeConstant fromStr(String key) {

        for (GroupTypeConstant e : GroupTypeConstant.values()) {
            if (key.equals(e.key)) return e;
        }

        throw new RuntimeException("获取 GroupType 失败".concat(key));
    }

}
