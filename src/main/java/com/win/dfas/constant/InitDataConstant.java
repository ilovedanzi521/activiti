/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/6/10:20
 * 项目名称: dfas-common-bpm
 * 文件名称: InitDataConstant.java
 * 文件描述: @Description: 初始值常量信息类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.constant;

/**
 * 包名称：com.win.dfas.constant
 * 类名称：InitDataConstant
 * 类描述：初始值常量信息类
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
public class InitDataConstant {
    /**
     * hashMap容量初始值
     */
    public static final int MAP_INIT_CAPACITY = 8;

    /**
     * byte[]字节每次读取的最大值
     */
    public static final int BYTE_INIT_CAPACITY = 1024;
    /**
     * unknown
     */
    public static final String UNKNOWN ="unknown";

    /**
     * ,分割符号
     */
    public static final String COMMA_SPLIT =",";

    /**
     * for循环时，初始数据的大小
     */
    public static final int FOR_INIT_CAPACITY =5;

    /**
     * MYSQL 数据过长时，数据库返回异常错误代码
     */
    public static final int DATA_LONG_MYSQL_SQL_CODE =1406;

    /**
     *用户模糊查询redis数据的正则表达式
     */
    public static final String REDIS_PATTERN_AS ="*";

    /**
     *redis key前缀和no之间的'-'连接符号
     */
    public static final String JOIN_MARK ="-";

    /**
     *获取产品和资产单元的映射关系
     */
    public static final String PRO_ASSET_RELA ="PRO_ASSET_RELA";
    /**
     *获取产品和投资组合的映射关系
     */
    public static final String PRO_PORTFOLIO_RELA ="PRO_PORTFOLIO_RELA";
    /**
     *获取交易市场和证券类型映射关系
     */
    public static final String MARK_SECURITY_RELA ="MARK_SECURITY_RELA";
    /**
     *获取交易市场和交易方向映射关系
     */
    public static final String MARK_TRA_DIR_RELA ="MARK_TRA_DIR_RELA";

    /**
     *映射关系
     */
    public static final String RELATION ="relation";
}
