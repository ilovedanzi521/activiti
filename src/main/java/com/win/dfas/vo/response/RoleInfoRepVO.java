package com.win.dfas.vo.response;

import lombok.Data;

/**
 * 包名称：com.win.dfas.vo.response
 * 类名称：RoleInfoRepVO
 * 类描述：转换成activiti需要的用户信息和用户组信息格式
 * 创建人：@author wanglei
 * 创建时间：2019/7/10/16:35
 */
@Data
public class RoleInfoRepVO {
    private String name;
    private String account;
}
