/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/9/20/16:43
 * 项目名称: dfas-common-bpm
 * 文件名称: FontConfig.java
 * 文件描述: @Description: 字体加载器
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.bpm.util;

import lombok.extern.slf4j.Slf4j;

import java.awt.*;
import java.io.IOException;
import java.io.InputStream;

/**
 * 包名称：com.win.dfas.config
 * 类名称：FontConfig
 * 类描述：字体加载器
 * 创建人：@author wanglei
 * 创建时间：2019/9/20/16:43
 */
@Slf4j
public class FontsUtil {
    /**
     * 宋体
     * @param style
     * @param size
     */
    public static Font getSimsun(int style, float size) {
        Font font = null;
        //获取字体流
         InputStream simsunFontFile = FontsUtil.class.getResourceAsStream("/fonts/simsun.ttc");
        try {
            //创建字体
            font = Font.createFont(Font.PLAIN, simsunFontFile).deriveFont(style, size);
        } catch (FontFormatException e) {
            log.error("",e);
        } catch (IOException e) {
            font = new Font("宋体", Font.BOLD, 6);
            log.error("",e);
        }
        return font;
    }

}
