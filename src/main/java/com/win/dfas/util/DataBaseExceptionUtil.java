/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/7/9:55
 * 项目名称: dfas-common-bpm
 * 文件名称: DataBaseExceptionUtil.java
 * 文件描述: @Description: 数据库异常处理
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.util;

import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.constant.InitDataConstant;
import lombok.extern.slf4j.Slf4j;

import java.sql.DataTruncation;

/**
 * 包名称：com.win.dfas.util
 * 类名称：DataBaseExceptionUtil
 * 类描述：数据库异常处理
 * 创建人：@author wanglei
 * 创建时间：2019/8/7/9:55
 */
@Slf4j
public class DataBaseExceptionUtil {
    /**
     * @Title: exceptionHandler
     * @Description 处理数据库异常
     * @param exception
     * @return void
     * @throws
     * @author wanglei
     * @Date 2019/8/7/10:19
     */
    public static void exceptionHandler(Throwable exception){
        //获取原因异常
        Throwable throwable =exception.getCause();
        if(throwable instanceof DataTruncation){
            DataTruncation dataTruncation = ((DataTruncation)throwable);
            String sqlCode = dataTruncation.getSQLState();
            int sqlError = dataTruncation.getErrorCode();
            log.error("数据库返回错误信息,SQL_ERROR:{},SQL_STATE:{},错误信息:{}",sqlError,sqlCode,dataTruncation.getCause());
            //1406 MYSQL 数据过长错误码
            if(InitDataConstant.DATA_LONG_MYSQL_SQL_CODE==sqlError){
                throw WinExceptionUtil.winException(BpmExceptionEnum.DATA_TOO_LONG);
            }
            throw WinExceptionUtil.winException(BpmExceptionEnum.DATABASE_EXCEPTION);
        }
        throw WinExceptionUtil.winException(BpmExceptionEnum.REQ_DATABASE_EXCE);
    }
}
