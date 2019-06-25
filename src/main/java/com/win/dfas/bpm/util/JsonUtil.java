package com.win.dfas.bpm.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class JsonUtil {
    protected static final Logger LOGGER = LoggerFactory.getLogger(JsonUtil.class);

    public JsonUtil() {
    }

    public static String getString(JSONObject obj, String key, String defaultValue) {
        return obj != null && obj.containsKey(key) ? obj.getString(key) : defaultValue;
    }

    public static String getString(JSONObject obj, String key) {
        return getString(obj, key, "");
    }

    public static int getInt(JSONObject obj, String key) {
        return obj != null && obj.containsKey(key) ? obj.getIntValue(key) : 0;
    }

    public static int getInt(JSONObject obj, String key, int defaultValue) {
        return obj != null && obj.containsKey(key) ? obj.getIntValue(key) : defaultValue;
    }

    public static boolean getBoolean(JSONObject obj, String key) {
        return obj != null && obj.containsKey(key) ? obj.getBoolean(key) : false;
    }

    public static boolean getBoolean(JSONObject obj, String key, boolean defaultValue) {
        return obj != null && obj.containsKey(key) ? obj.getBoolean(key) : defaultValue;
    }

    public static <T> T parseObject(String jsonStr, Class<T> cls) {
        return StringUtil.isEmpty(jsonStr) ? null : JSON.parseObject(jsonStr, cls);
    }

    public static <T> List<T> parseArray(String jsonStr, Class<T> cls) {
        return StringUtil.isEmpty(jsonStr) ? null : JSON.parseArray(jsonStr, cls);
    }

    public static String toJSONString(Object obj) {
        return obj == null ? null : JSON.toJSONString(obj);
    }

    public static void main(String[] args) {
        String str = JSON.toJSONString((Object)null);
        System.out.println();
    }
}
