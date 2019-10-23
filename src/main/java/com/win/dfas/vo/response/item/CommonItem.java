/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/19/13:53
 * 项目名称: dfas-common-bpm
 * 文件名称: CommonItem.java
 * 文件描述: @Description: 公共Item类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.vo.response.item;

import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

/**
 * 包名称：com.win.dfas.vo.response.item
 * 类名称：CommonItem
 * 类描述：公共Item类
 * 创建人：@author wanglei
 * 创建时间：2019/8/19/13:53
 */
@Data
public class CommonItem{
    private String code;
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommonItem that = (CommonItem) o;
        return Objects.equals(code, that.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }
}
