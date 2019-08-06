package com.win.dfas.bpm.controller;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.win.dfas.bpm.constant.GroupTypeConstant;
import com.win.dfas.bpm.util.AppUtil;
import com.win.dfas.bpm.util.EnumUtil;
import com.win.dfas.bpm.util.RequestUtil;
import com.win.dfas.constant.InitDataConstant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * 包名称：com.win.dfas.bpm.controller
 * 类名称：SystemController
 * 类描述：SystemController
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
@Slf4j
@RestController
public class SystemController {

    @RequestMapping(value = "/sys/tools/getEnum", method = RequestMethod.POST)
    public Object getEnum(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String enumClassPath = RequestUtil.getString(request, "path");
        // 列表模式
        boolean listMode = RequestUtil.getBoolean(request, "listMode");
        if (listMode) {
            JSONArray objects = EnumUtil.toJSONArray(enumClassPath);
            return objects;
        }
        JSONObject jsonObject = EnumUtil.toJSON(enumClassPath);
        return jsonObject;
    }



    @RequestMapping("/sys/tools/getInterFaceImpls")
    public Object getInterFaceImpls(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<Map<String,String>> list = new ArrayList<>();
        Map<String,String> map = new HashMap<>(InitDataConstant.MAP_INIT_CAPACITY);
        map.put("title","部门");
        map.put("type","group");
        list.add(map);
        Map<String,String> map1 = new HashMap<>(InitDataConstant.MAP_INIT_CAPACITY);
        map1.put("title","姓名");
        map1.put("type","user");
        list.add(map1);
        log.info(list.toString());
        return list;
    }


    @RequestMapping({"/sys/tools/getGroupTypes"})
    public Object getGroupTypes(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObject = new JSONObject();
        JSONArray objects = EnumUtil.toJSONArray(GroupTypeConstant.class);
        jsonObject.put("data",objects);
        jsonObject.put("isOk",true);
        return jsonObject;
    }
}
