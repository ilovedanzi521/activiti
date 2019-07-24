package com.win.dfas.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 包名称：com.win.dfas.dto
 * 类名称：InvestConstituteDTO
 * 类描述：投资组合转换类
 * 创建人：@author wanglei
 * 创建时间：2019/7/24/14:32
 */
@Data
public class InvestConstituteDTO {

     /**
      * 所属产品序号
      */
     @ApiModelProperty(value = "所属产品序号")
     private Integer fundNo;

     /**
      * 组合编号
      */
     @ApiModelProperty(value = "组合编号")
     private Integer no;

     /**
      * 组合名称
      */
     @ApiModelProperty(value = "组合名称")
     private String portfolioName;


}
