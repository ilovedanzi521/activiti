/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/7/25/16:08
 * 项目名称: dfas-common-schedule
 * 文件名称: Test.java
 * 文件描述: @Description: test
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.feign;

import com.alibaba.fastjson.JSONObject;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.dto.TransactionDirectionDTO;
import com.win.dfas.feign.impl.ApiProvide;
import com.win.dfas.feign.impl.FeignService;
import feign.Feign;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 包名称：com.win.dfas.feign
 * 类名称：Test
 * 类描述：test
 * 创建人：@author wanglei
 * 创建时间：2019/7/25/16:08
 */
public class Test {
    public static void main(String[] args) {
//        ApiProvide apiProvide = Feign.builder()
//                .decoder(new GsonDecoder())
////                .encoder(new GsonEncoder())
//                .target(ApiProvide.class, "http://192.168.5.50:11010/api/prod/list");
//        Object object = JSONObject.parse("{}");
//        Object responseData = apiProvide.post(object);
////        WinResponseData responseData= (WinResponseData) JSONObject.parse(JSONObject.toJSONString(object))
//        System.out.println(responseData);

        Object object = new FeignService().post("http://192.168.5.50:11010/api/prod/list", "{}");
        System.out.println(object);
        String s = new FeignService().call("http://www.baidu.com");
        System.out.println(s);
    }

}
