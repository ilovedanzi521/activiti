package com.win.dfas.vo.request;

import lombok.Data;

/**
 * 包名称：com.win.dfas.vo.request
 * 类名称：UserInoReq
 * 类描述：UserInoReq
 * 创建人：@author wanglei
 * 创建时间：2019/6/19/17:31
 */
@Data
public class UserInfoReqVO {
    /**
     * 用户状态
     */
    String userState;
    /**
     * 公司
     */
    String companyId;
    /**
     * 部门
     */
    String departmentId;
}
