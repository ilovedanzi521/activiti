/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/7/25/15:31
 * 项目名称: dfas-common-bpm
 * 文件名称: TransactionDirectionDTO.java
 * 文件描述: @Description: feign接口获取交易方向
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 包名称：com.win.dfas.dto
 * 类名称：TransactionDirectionDTO
 * 类描述：feign接口获取交易方向
 * 创建人：@author wanglei
 * 创建时间：2019/7/25/15:31
 */
@Data
public class TransactionDirectionDTO {
    @ApiModelProperty(value = "市场编码")
    private String marketCode;

    /**
     *  transaction_direction
     */
    @ApiModelProperty(value = "交易方向")
    private String transactionDirection;

    /**
     *  transaction_direction_name
     */
    @ApiModelProperty(value = "交易方向名称")
    private String transactionDirectionName;
}
