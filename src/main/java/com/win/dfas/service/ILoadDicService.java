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
import com.win.dfas.common.enumeration.FormatEnum;
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

   /**
    * @Title: queryDataList
    * @Description 查询数据字典项，首先从缓存查询，缓存没数据从feign接口查询
    * @param param
    * @param relation
    * @param strategy
    * @param formatEnum
    * @return java.util.List
    * @throws
    * @author wanglei
    * @Date 2019/8/20/15:24
    */
    List queryDataList(String param, String relation, String strategy, FormatEnum formatEnum);

    /**
     * @Title: queryFlow
     * @Description 查询流程名称
     * @param
     * @return java.util.List<com.win.dfas.vo.response.item.FlowNameItem>
     * @throws
     * @author wanglei
     * @Date 2019/8/20/15:19
     */
    List<FlowNameItem> queryFlow();

    public <T> List<T> converterVO(Object data, Class afterClazz, String... fields) throws Exception;
}
