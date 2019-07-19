package com.win.dfas.bpm.controller;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.win.dfas.bpm.constant.GroupTypeConstant;
import com.win.dfas.bpm.util.AppUtil;
import com.win.dfas.bpm.util.EnumUtil;
import com.win.dfas.bpm.util.RequestUtil;
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

@Slf4j
@RestController
public class SystemController {

    @RequestMapping(value = "/sys/tools/getEnum", method = RequestMethod.POST)
    public Object getEnum(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String enumClassPath = RequestUtil.getString(request, "path");
        boolean listMode = RequestUtil.getBoolean(request, "listMode");// 列表模式
        if (listMode) {
            JSONArray objects = EnumUtil.toJSONArray(enumClassPath);
            return objects;
        }
        JSONObject jsonObject = EnumUtil.toJSON(enumClassPath);
        return jsonObject;
    }



    @RequestMapping("/sys/tools/getInterFaceImpls")
    public Object getInterFaceImpls(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        String classPath = RequestUtil.getString(request, "classPath");
//        Class<?> clazz = Class.forName(classPath);
//        Map<String, ?> map = AppUtil.getImplInstance(clazz);
        List<Map<String,String>> list = new ArrayList<>();
        Map<String,String> map = new HashMap<>();
        map.put("title","部门");
        map.put("type","group");
        list.add(map);
        Map<String,String> map1 = new HashMap<>();
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
