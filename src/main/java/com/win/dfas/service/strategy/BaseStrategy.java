/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/20/11:39
 * 项目名称: dfas-common-bpm
 * 文件名称: FeignStrategy.java
 * 文件描述: @Description: fegin接口调用并转换数据的策略类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service.strategy;

import com.alibaba.fastjson.JSONObject;
import com.win.dfas.bpm.util.AppUtil;
import com.win.dfas.common.enumeration.FormatEnum;
import com.win.dfas.common.util.RedisUtil;
import com.win.dfas.constant.InitDataConstant;
import com.win.dfas.controller.feign.IDicFeignClient;
import com.win.dfas.service.ILoadDicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.*;

/**
 * 包名称：com.win.dfas.service.strategy
 * 类名称：BaseFeignStrategy
 * 类描述：fegin接口调用并转换数据的策略类
 * 创建人：@author wanglei
 * 创建时间：2019/8/20/11:39
 */
@Slf4j
public abstract class BaseStrategy {

    /**
     * @Title: feignAndConverterVO
     * @Description feign接口获取数据并转化
     * @param
     * @return java.util.List
     * @throws
     * @author wanglei
     * @Date 2019/8/20/11:41
     */
    public abstract List feignAndConverterVO(String param);
    /**
     * @Title: redisAndConverterVO
     * @Description redis接口获取数据并转化
     * @param param
     * @return java.util.List
     * @throws
     * @author wanglei
     * @Date 2019/8/20/16:04
     */
    public  List redisAndConverterVO(String param, String relation, FormatEnum formatEnum){
        List<Object> list = queryRedis(param,relation,formatEnum);
        if(list == null){
            return null;
        }
        return converterVO(list);
    }

    protected abstract List converterVO(List queryRedis);

    private List queryRedis(String param, String relation, FormatEnum formatEnum) {
        List<Object> list = null;
        String key = relation + InitDataConstant.JOIN_MARK + param;
        try {
            Object value = RedisUtil.get(key);
            if (value != null) {
                //获取关联的key
                Map map = JSONObject.parseObject(JSONObject.toJSONString(value), Map.class);
                String[] nos = map.get(InitDataConstant.RELATION).toString().split(InitDataConstant.COMMA_SPLIT);
                Set<String> keySet = new HashSet<>();
                for (String no : nos) {
                    //获取关联的子项
                    String sonKey = formatEnum.getFormat().split(InitDataConstant.JOIN_MARK)[0]
                            + InitDataConstant.JOIN_MARK
                            + no;
                    keySet.add(sonKey);
                }
                list = RedisUtil.multiGet(keySet);

            }
        }catch (Exception e){
            log.error("redis查询异常:{}",e);
        }
        return list;
    }

    public IDicFeignClient dicFeignClient = AppUtil.getBean(IDicFeignClient.class);
    public ILoadDicService loadDicService = AppUtil.getBean(ILoadDicService.class);
    /**
     * @Title: converterVO
     * @Description VO转换
     * @param data
     * @param afterClazz
     * @param fields
     * @return java.util.List<T>
     * @throws
     * @author wanglei
     * @Date 2019/8/20/11:47
     */
    public <T> List<T> converterVO(Object data, Class afterClazz, String... fields) throws Exception {
        return loadDicService.converterVO(data,afterClazz,fields);
    }
}
