/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/3/10:37
 * 项目名称: dfas-common-bpm
 * 文件名称: LoadDicServiceImpl.java
 * 文件描述: @Description: 实现类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.win.dfas.common.enumeration.FormatEnum;
import com.win.dfas.controller.feign.IDicFeignClient;
import com.win.dfas.dao.ParamFlowInstMapper;
import com.win.dfas.service.ILoadDicService;
import com.win.dfas.service.strategy.StrategyFactory;
import com.win.dfas.vo.response.item.FlowNameItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.*;

/**
 * 包名称：com.win.dfas.service.impl
 * 类名称：LoadDicServiceImpl
 * 类描述：实现类
 * 创建人：@author wanglei
 * 创建时间：2019/8/3/10:37
 */
@Service
@Slf4j
public class LoadDicServiceImpl implements ILoadDicService {
    @Autowired
    private ParamFlowInstMapper paramFlowMapper;
    @Autowired
    private IDicFeignClient dicFeignClient;

    @Value("${data.dic.isRedis}")
    private boolean isRedis;
    @Override
    public List queryDataList(String param, String relation, String strategy, FormatEnum formatEnum) {
        List<Object> list = null;
        //1.使用缓存查询
        if(isRedis){
            list = redisQuery(param,relation,strategy,formatEnum);
        }else {
            //2.使用feign接口
            list = feignQuery(param, strategy);
            log.info("feign查询结果{}", list);
        }
        return list;
    }

    /**
     * @Title: feignQuery
     * @Description fegin接口查询
     * @param param
     * @param relaParam
     * @return java.util.List<java.lang.Object>
     * @throws
     * @author wanglei
     * @Date 2019/8/20/15:16
     */
    private List<Object> feignQuery(String param, String relaParam) {
        List<Object> list = null;
        try{
            list= StrategyFactory.getPromotionStrategy(relaParam).feignAndConverterVO(param);
        }catch (Exception e){
            log.error("feign查询异常:{}",e);
        }
        return list;
    }
    /**
     * @Title: redisQuery
     * @Description redis缓存查询
     * @param param
     * @param relation
     * @param formatEnum
     * @return java.util.List<java.lang.Object>
     * @throws
     * @author wanglei
     * @Date 2019/8/20/15:16
     */
    private List<Object> redisQuery(String param, String relation, String strategy, FormatEnum formatEnum) {
        List<Object> list = null;
        try{
            list= StrategyFactory.getPromotionStrategy(strategy).redisAndConverterVO(param,relation,formatEnum);
        }catch (Exception e){
            log.error("feign查询异常:{}",e);
        }
        return list;
    }


    @Override
    public List<FlowNameItem> queryFlow() {
        return paramFlowMapper.listFlowName();
    }

    @Override
    public <T> List<T> converterVO(Object data,Class afterClazz, String... fields) throws Exception {
        List<T> list = new ArrayList<T>();
        List<Map> rtnList = new ArrayList<>();
        rtnList = JSONObject.parseArray(JSONObject.toJSONString(data)).toJavaList(Map.class);
        for (Map t : rtnList) {
            Constructor<?> constructor = afterClazz.getConstructor();
            Object newInstance = constructor.newInstance();
            Object code =String.valueOf(t.get(fields[0]));
            setAccessibleIsTrue(afterClazz.getDeclaredField("code")).set(newInstance, code);
            Object name = String.valueOf(t.get(fields[1]));
            setAccessibleIsTrue(afterClazz.getDeclaredField("name")).set(newInstance, name);
            list.add((T) newInstance);
        }
        return list;
    }

    /**
     * @Title: setAccessibleIsTrue
     * @Description: //打开私有访问
     * @param field
     * @return java.lang.reflect.Field
     * @throws
     * @author wanglei
     * @Date 2019/8/3/10:35
     */
    private Field setAccessibleIsTrue(Field field){
        field.setAccessible(true);
        return field;
    }
}
