package com.win.dfas.vo.response;

/**
 * 包名称：com.win.dfas.vo.response
 * 类名称：ParamFlowRepVO
 * 类描述：ParamFlowRepVO
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/9:45
 */
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.win.dfas.common.util.LongJsonDeserializer;
import com.win.dfas.common.util.LongJsonSerializer;
import com.win.dfas.common.vo.BaseRepVO;
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
@ApiModel(value = "流程返回参数项")
@Data
public class ParamFlowRepVO extends BaseRepVO {
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
     * 开始日期
     */
    @ApiModelProperty(value = "开始日期")
    private String beginDate;
    /**
     * 结束日期
     */
    @ApiModelProperty(value = "结束日期")
    private String endDate;
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

    /**
     * 流程模型id
     */
    @ApiModelProperty(value = "流程模型id")
    private String modelId;
    /**
     * 流程组id
     */
    @JsonSerialize(
            using = LongJsonSerializer.class
    )
    @JsonDeserialize(
            using = LongJsonDeserializer.class
    )
    @ApiModelProperty(value = "流程组id")
    private Long flowCode;
    /**
     * 启动标志
     */
    @ApiModelProperty(value = "启动标志")
    private Boolean startFlag;

    /**
     * 发布ID
     */
    @ApiModelProperty(value = "发布ID")
    private String deploymentId;

    /**
     * 流程定义ID
     */
    private String processDefId;

    /**
     * 控制类型
     */
    private String controlType;
}
