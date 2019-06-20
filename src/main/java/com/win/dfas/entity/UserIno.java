package com.win.dfas.entity;

import lombok.Data;

/**
 * 包名称：com.win.dfas.entity
 * 类名称：UserIno
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/19/16:18
 */
@Data
public class UserIno {
    /**
     * 用户ID
     */
    String userId;
    /**
     * 姓名
     */
    String userName;
    /**
     * 公司
     */
    String company;
    /**
     * 部门
     */
    String  department;
    /**
     * 角色
     */
    String  role;
    /**
     * 操作
     */
    String  operation;
}
