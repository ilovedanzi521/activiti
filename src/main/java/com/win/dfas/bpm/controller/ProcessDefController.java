package com.win.dfas.bpm.controller;

import cn.hutool.core.collection.CollectionUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.util.StringUtil;
import com.win.dfas.bpm.api.model.def.BpmDataModel;
import com.win.dfas.bpm.api.model.definition.BpmDefinition;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Iterator;
import java.util.List;

/**
 * 包名称：com.win.dfas.bpm.controller
 * 类名称：ProcessDefController
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/25/19:07
 */
@RestController
@RequestMapping({"/service/bpm/processDef"})
public class ProcessDefController {
    /**
     * @Title: getSubjectVariable
     * @Description 流程信息
     * @param defId
     * @return com.alibaba.fastjson.JSONArray
     * @throws
     * @author wanglei
     * @Date 2019/8/6/14:58
     */
    @RequestMapping({"/getSubjectVariable"})
    public JSONArray getSubjectVariable(@RequestParam String defId) throws Exception {
        JSONArray jsonArray = new JSONArray();
            JSONObject json = JSONObject.parseObject("{name:\"发起人\",key:\"startorName\"}");
            jsonArray.add(json);
            JSONObject json1 = JSONObject.parseObject("{name:\"发起时间\",key:\"startDate\"}");
            jsonArray.add(json1);
            JSONObject json2 = JSONObject.parseObject("{name:\"流程标题\",key:\"title\"}");
            jsonArray.add(json2);
            return jsonArray;

    }
}
