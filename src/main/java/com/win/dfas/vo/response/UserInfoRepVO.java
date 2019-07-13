package com.win.dfas.vo.response;

import lombok.Data;

/**
 * 包名称：com.win.dfas.vo.response
 * 类名称：UserInoRep
 * 类描述：fegin接口返回的用户信息
 * 创建人：@author wanglei
 * 创建时间：2019/6/19/17:30
 */
@Data
public class UserInfoRepVO {
    private String userId;
    private String userName;
    private String userType;
    private String userState;
    private String departmentId;
    private String companyId;
    private String departmentCode;
    private String companyCode;
    private String phoneNumber;
    private String contactWay;
    private String mailAddress;
    private String companyFullName;
    private String companySimpleName;
    private String departmentName;
}
