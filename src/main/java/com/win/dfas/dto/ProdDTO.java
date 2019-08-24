/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/1/16:42
 * 项目名称: dfas-common-bpm
 * 文件名称: ProdDTO.java
 * 文件描述: @Description: 调用第三方feign接口，产品返回
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.dto;

import lombok.Data;

/**
 * 包名称：com.win.dfas.dto
 * 类名称：ProdDTO
 * 类描述：调用第三方feign接口，产品返回
 * 创建人：@author wanglei
 * 创建时间：2019/8/1/16:42
 */
@Data
public class ProdDTO {
    private Integer no;
    private String name;
}
