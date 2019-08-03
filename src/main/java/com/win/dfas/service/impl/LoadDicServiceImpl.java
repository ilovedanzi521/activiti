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
import com.win.dfas.dao.ParamFlowInstMapper;
import com.win.dfas.dto.InvestCompanyDTO;
import com.win.dfas.entity.ParamFlowInst;
import com.win.dfas.service.ILoadDicService;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.item.FlowNameItem;
import com.win.dfas.vo.response.item.InvestCompanyItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.service.impl
 * 类名称：LoadDicServiceImpl
 * 类描述：实现类
 * 创建人：@author wanglei
 * 创建时间：2019/8/3/10:37
 */
@Service
public class LoadDicServiceImpl implements ILoadDicService {
    @Autowired
    private ParamFlowInstMapper paramFlowMapper;

    public <T> List<T> converterVO(Object data, Class clazz, Class afterClazz, String... fields) throws IllegalAccessException, InstantiationException, NoSuchMethodException, NoSuchFieldException, InvocationTargetException {
        List<T> list = new ArrayList<T>();
        List<T> rtnList = new ArrayList<T>();
        rtnList = JSONObject.parseArray(JSONObject.toJSONString(data)).toJavaList(clazz);
        for (Object t : rtnList) {
            Constructor<?> constructor = afterClazz.getConstructor();
            Object newInstance = constructor.newInstance();
            Object code = String.valueOf(setAccessibleIsTrue(clazz.getDeclaredField(fields[0])).get(t));
            setAccessibleIsTrue(afterClazz.getDeclaredField("code")).set(newInstance, code);
            Object name = String.valueOf(setAccessibleIsTrue(clazz.getDeclaredField(fields[1])).get(t));
            setAccessibleIsTrue(afterClazz.getDeclaredField("name")).set(newInstance, name);
            list.add((T) newInstance);
        }
        return list;
    }

    @Override
    public List<FlowNameItem> queryFlow() {
        return paramFlowMapper.listFlowName();
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
