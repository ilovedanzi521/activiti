package com.win.dfas.vo.request;

import com.win.dfas.common.vo.BaseReqVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 包名称：com.win.dfas.vo.request
 * 类名称：ParamFlowReqVO
 * 类描述：ParamFlowReqVO
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/9:38
 */
@ApiModel(value = "流程查询VO")
@Data
public class ParamFlowReqVO extends BaseReqVO {
    private static final long serialVersionUID = 1L;

    /**
     * 流程名称
     */
    @ApiModelProperty(value = "流程名称")
    private String flowName;
    /**
     * 流程类型
     */
    @ApiModelProperty(value = "流程类型")
    private String flowType;

    /**
     * 产品
     */
    @ApiModelProperty(value = "产品")
    private String productCode;
    /**
     * 投资单位
     */
    @ApiModelProperty(value = "投资单位")
    private String investCompany;
    /**
     * 组合资产
     */
    @ApiModelProperty(value = "组合资产")
    private String investConstitute;
    /**
     * 指令类型
     */
    @ApiModelProperty(value = "指令类型")
    private String instructionType;
    /**
     * 流程组id
     */
    @ApiModelProperty(value = "流程组id")
    private Long flowCode;
    /**
     * 交易市场
     */
    @ApiModelProperty(value = "交易市场")
    private String marketCode;
    /**
     * 证券类型
     */
    @ApiModelProperty(value = "证券类型")
    private String securityType;
    /**
     * 交易方向
     */
    @ApiModelProperty(value = "交易方向")
    private String transactionDirection;

    public String primaryKey() {
        return "{" +
                "  securityType='" + securityType + '\'' +
                ", instructionType='" + instructionType + '\'' +
                ", marketCode='" + marketCode + '\'' +
                ", productCode='" + productCode + '\'' +
                ", investConstitute='" + investConstitute + '\'' +
                ", investCompany='" + investCompany + '\'' +
                '}';
    }
}
