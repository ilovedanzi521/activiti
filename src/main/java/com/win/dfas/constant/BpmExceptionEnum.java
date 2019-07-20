/****************************************************
 * 创建人：     @author wanglei
 * 创建时间:    2019年6月24日/上午9:51:58
 * 项目名称：  dfas-common-bpm
 * 文件名称: BpmExceptionEnum.java
 * 文件描述: @Description: TODO(用一句话描述该文件做什么)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.constant;

import com.win.dfas.common.exception.IExceptionEnum;

/**
 * 包名称： com.win.dfas.constant
 * 类名称：BpmExceptionEnum
 * 类描述：流程异常枚举
 * 创建人：@author wanglei
 * 创建时间：2019年6月24日/上午9:51:58
 *
 */
public enum BpmExceptionEnum implements IExceptionEnum {

    // 认证异常枚举
    SYSTEM_ERR("800000", "系统错误"),
    NOT_FOUND_FLOW("800001", "没有发现流程记录")
//    ID_NOT_NULL("100000", "ID不能为空")
    ;

    private String code;
    private String msg;

    BpmExceptionEnum(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getMsg() {
        return msg;
    }

}