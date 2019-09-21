package com.win.dfas.bpm.img;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class ThreadMapUtil {
    private static ThreadLocal<Map<String, Object>> threadLocalMap = new ThreadLocal();

    private ThreadMapUtil() {
    }

    private static Map<String, Object> map() {
        Map<String, Object> map = (Map)threadLocalMap.get();
        if (map == null) {
            threadLocalMap.set(new HashMap());
            map = (Map)threadLocalMap.get();
        }

        return map;
    }

    public static void put(String key, Object value) {
        map().put(key, value);
    }

    public static Object get(String key) {
        return map().get(key);
    }

    public static void remove(String key) {
        map().remove(key);
        if (map().isEmpty()) {
            threadLocalMap.remove();
        }

    }

    public static void remove() {
        threadLocalMap.remove();
    }

    public static Object getOrDefault(String key, Object defaultValue) {
        return map().getOrDefault(key, defaultValue);
    }

    public static Object computeIfAbsent(String key, Function<? super String, ? extends Object> mappingFunction) {
        return map().computeIfAbsent(key, mappingFunction);
    }
}
