/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/2/17:28
 * 项目名称: dfas-common-bpm
 * 文件名称: ILoadDicService.java
 * 文件描述: @Description: 加载数据字典
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service;

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.util.StringUtil;
import com.win.dfas.dto.TransactionDirectionDTO;
import com.win.dfas.vo.response.item.FlowNameItem;
import com.win.dfas.vo.response.item.TransactionDirectionItem;
import org.springframework.stereotype.Service;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.service
 * 类名称：ILoadDicService
 * 类描述：加载数据字典
 * 创建人：@author wanglei
 * 创建时间：2019/8/2/17:28
 */
@Service
public interface ILoadDicService {

    public <T> List<T> converterVO(Object data, Class clazz, Class afterClazz, String... fields) throws Exception;

    List<FlowNameItem> queryFlow() throws InvocationTargetException, NoSuchMethodException, NoSuchFieldException, InstantiationException, IllegalAccessException;

}
