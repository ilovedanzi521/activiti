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
    NOT_FOUND_FLOW("800001", "没有发现启动的流程记录"),
    PARAMS_EMPTY("800002", "参数为空"),
    NOTUNIQUEKEY("800003", "(产品+组合+交易方向)唯一键冲突"),
    DESIGN_PROBLEMS("800004", "请优先对流程进行\"设计流程\"处理"),
    ID_IS_NOTNULL("800005", "ID不能为空"),
    NAME_IS_NOTNULL("800006", "NAME不能为空"),
    TYPE_IS_NOTNULL("800007", "TYPE不能为空"),
    DATABASE_EXCEPTION("800008", "TYPE不能为空"),
    REQ_DATABASE_EXCE("800009", "请求数据库异常"),
    DATA_TOO_LONG("800010", "存在字段超过数据库限制长度"),
    FLOW_DEF_NOEXIST("800011", "流程引擎中不存在流程定义信息")

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
