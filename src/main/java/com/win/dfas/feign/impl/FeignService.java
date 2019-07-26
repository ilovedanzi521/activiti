/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/7/26/9:48
 * 项目名称: dfas-common-bpm
 * 文件名称: FeignClient.java
 * 文件描述: @Description: feign客户端
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.feign.impl;

import com.alibaba.fastjson.JSONObject;
import feign.Feign;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;

/**
 * 包名称：com.win.dfas.feign.impl
 * 类名称：FeignClient
 * 类描述：feign客户端
 * 创建人：@author wanglei
 * 创建时间：2019/7/26/9:48
 */
public class FeignService {
    public <T> T newInstanceByUrl(Class<T> apiType, String url ) {
        return Feign.builder()
                .decoder(new GsonDecoder())
                .target(apiType, url);
    }


    public Object post(String url, String params) {
        return Feign.builder()
                .decoder(new GsonDecoder())
                .encoder(new GsonEncoder())
                .target(ApiProvide.class, url).post(JSONObject.parse(params));
    }

    public Object get(String url) {
        return Feign.builder()
                .encoder(new GsonEncoder())
                .decoder(new GsonDecoder())
                .target(ApiProvide.class, url).get();
    }

    public String call(String url) {
        return Feign.builder()
//                .decoder(new GsonDecoder())
                .encoder(new GsonEncoder())
                .target(ApiProvide.class, url).call();
    }
}
