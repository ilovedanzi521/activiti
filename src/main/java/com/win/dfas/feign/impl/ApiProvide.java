/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/7/25/19:27
 * 项目名称: dfas-common-bpm
 * 文件名称: ApiProvide.java
 * 文件描述: @Description: api提供
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.feign.impl;

import feign.Param;
import feign.RequestLine;

/**
 * 包名称：com.win.dfas.feign.impl
 * 类名称：ApiProvide
 * 类描述：api提供
 * 创建人：@author wanglei
 * 创建时间：2019/7/25/19:27
 */
public interface ApiProvide {
    @RequestLine("POST")
    Object post(Object object);

    @RequestLine("GET")
    Object get();

    @RequestLine("GET")
    String call();
}
