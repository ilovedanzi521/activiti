package com.win.dfas.bpm.util;

import com.github.pagehelper.util.StringUtil;
import com.win.dfas.constant.InitDataConstant;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * 包名称：com.win.dfas.bpm.util
 * 类名称：RequestUtil
 * 类描述：RequestUtil
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
public class RequestUtil {
    protected static final Logger LOGGER = LoggerFactory.getLogger(RequestUtil.class);
    /**
     * 把当前上下文的请求封装在map中
     * @param request
     * @param keepArray 保持为数组
     * @return
     */
    public static Map getParameterValueMap(HttpServletRequest request, boolean keepArray) {
        Map<String, Object> map = new HashMap(InitDataConstant.MAP_INIT_CAPACITY);
        Enumeration params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String paramKey = String.valueOf(params.nextElement());
            String[] values = request.getParameterValues(paramKey);
            if (values==null || values.length==0) {continue;}

            String rtn = getByAry(values);
            if (rtn.length() > 0 && values.length > 0) {
                if (keepArray) {
                    map.put(paramKey, rtn.split(","));
                }
                else {
                    map.put(paramKey, rtn);
                }
            }
        }
        return map;
    }

    /**
     * @param aryTmp
     * @param
     * @return
     */
    private static String getByAry(String[] aryTmp) {
        if(aryTmp==null || aryTmp.length==0){return "";}

        if(aryTmp.length == 1) {
            return aryTmp[0];
        }

        StringBuilder rtn = new StringBuilder();
        for (int i = 0; i < aryTmp.length; i++) {
            String str = aryTmp[i].trim();

            if(StringUtil.isEmpty(str)) {continue;}
            rtn.append(str);
            rtn.append(",");
        }

        return  rtn.substring(0, rtn .length() - 1);
    }

    /**
     * 根据参数名称获取参数值。
     *
     * <pre>
     * 1.根据参数名称取得参数值的数组。
     * 2.将数组使用逗号分隔字符串。
     * </pre>
     *
     * @param request
     * @param paramName
     * @return
     */
    public static String getStringValues(HttpServletRequest request, String paramName) {
        String[] aryValue = request.getParameterValues(paramName);
        if (aryValue==null || aryValue.length==0) {return "";}

        StringBuilder str  = new StringBuilder();
        for (String v : aryValue) {
            if (StringUtil.isEmpty(v)) {continue;}
            str.append(v).append(",");
        }
        return str.substring(0, str.length()-1);
    }


    /**
     * 获取IP地址
     *
     * @param request
     * @return
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        LOGGER.debug("x-forwarded-for ip: {}" , ip);

        if (ip != null && ip.length() != 0 && !InitDataConstant.UNKNOWN.equalsIgnoreCase(ip)) {
            // 多次反向代理后会有多个ip值，第一个ip才是真实ip
            if( ip.indexOf(InitDataConstant.COMMA_SPLIT)!=-1 ){
                ip = ip.split(",")[0];
            }
        }
        if (ip == null || ip.length() == 0 || InitDataConstant.UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");

            LOGGER.debug("Proxy-Client-IP ip: {}" , ip);
        }
        if (ip == null || ip.length() == 0 || InitDataConstant.UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
            LOGGER.debug("WL-Proxy-Client-IP ip: {}" ,ip);
        }
        if (ip == null || ip.length() == 0 || InitDataConstant.UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
            LOGGER.debug("HTTP_CLIENT_IP ip: {}", ip);
        }
        if (ip == null || ip.length() == 0 || InitDataConstant.UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
            LOGGER.debug("HTTP_X_FORWARDED_FOR ip: {}", ip);
        }
        if (ip == null || ip.length() == 0 || InitDataConstant.UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
            LOGGER.debug("X-Real-IP ip: {}" , ip);
        }
        if (ip == null || ip.length() == 0 || InitDataConstant.UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
            LOGGER.debug("getRemoteAddr ip: {}", ip);
        }
        return ip;
    }


    /**
     * 下载文件。
     * // path是指欲下载的文件的路径。
     */
    public static void downLoadFile(HttpServletRequest request, HttpServletResponse response, String path) throws IOException {
        File file = new File(path);
        downLoadFile(response,file);
    }
    /**
     * 下载文件。
     */
    public static void downLoadFile( HttpServletResponse response, File file) throws IOException {
        try {
            // 取得文件名。
            String filename = file.getName();
            // 取得文件的后缀名。
            String ext = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();

            // 以流的形式下载文件。
            InputStream fis = new BufferedInputStream(new FileInputStream(file));
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();
            // 清空response
            response.reset();
            // 设置response的Header
            response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes()));
            response.addHeader("Content-Length", "" + file.length());
            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    /**
     * 从Request中取得boolean值 对字符串,如无值则返回缺省值, 如值为数字1，则返回true
     *
     * @param request
     * @param key
     * @param defaultValue
     * @return
     */
    public static boolean getBoolean(HttpServletRequest request, String key, boolean defaultValue) {
        String str = request.getParameter(key);
        if (StringUtil.isEmpty(str)) {
            return defaultValue;
        }
        if (StringUtils.isNumeric(str)) {
            return (Integer.parseInt(str) == 1 ? true : false);
        }
        return Boolean.parseBoolean(str);
    }

    /**
     * 从Request中取得boolean值,如无值则返回缺省值 false, 如值为数字1，则返回true
     *
     * @param request
     * @param key
     * @return
     */
    public static boolean getBoolean(HttpServletRequest request, String key) {
        return getBoolean(request, key, false);
    }
    /**
     * 取字符串类型的参数。 如果取得的值为null，则返回默认字符串。
     *
     * @param request
     * @param key          字段名
     * @param defaultValue
     * @return
     */
    public static String getString(HttpServletRequest request, String key, String defaultValue, boolean b) {
        String value = request.getParameter(key);
        if (StringUtil.isEmpty(value)) {
            return defaultValue;
        }
        if (b) {
            return value.replace("'", "''").trim();
        } else {
            return value.trim();
        }
    }

    public static String getString(HttpServletRequest request, String key) {
        return getString(request, key, "", true);
    }

    /**
     * 取字符串类型的参数。 如果取得的值为null，则返回空字符串。
     *
     * @param request
     * @param key
     * @param b       是否替换'为''
     * @return
     */
    public static String getString(HttpServletRequest request, String key, String defaultValue) {
        return getString(request, key, defaultValue, true);
    }
}
