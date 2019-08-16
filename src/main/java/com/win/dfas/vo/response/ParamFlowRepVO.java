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
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

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
    @NotNull(message = "name(流程名称)不能为空")
    @Length(min = 1, max = 80, message = "name(流程名称)长度需要在1和80之间")
    @Pattern(regexp = "^[\\w\\u4e00-\\u9fa5]{1,80}$", message = "name(流程名称)格式错误")

    private String flowName;
    /**
     * 流程类型
     */
    @NotNull(message = "flowType(流程类型)不能为空")
    @Length(min = 1, max = 12, message = "flowType(流程类型)长度需要在1和12之间")
    @ApiModelProperty(value = "流程类型")
    private String flowType;

    /**
     * 产品
     */
    @NotNull(message = "productCode(产品)不能为空")
    @Length(min = 1, max = 22, message = "productCode(产品)长度需要在1和22之间")
    @ApiModelProperty(value = "产品")
    private String productCode;
    /**
     * 投资单位
     */
    @Length(max = 22, message = "investCompany(资产单元)长度需要在1和22之间")
    @ApiModelProperty(value = "资产单元")
    private String investCompany;
    /**
     * 组合资产
     */
    @Length( max = 22, message = "investConstitute(投资组合)长度需要在1和22之间")
    @ApiModelProperty(value = "投资组合")
    private String investConstitute;
    /**
     * 指令类型
     */
    @Length( max = 20, message = "instructionType(指令类型)长度需要在1和20之间")
    @ApiModelProperty(value = "指令类型")
    private String instructionType;
    /**
     * 开始日期
     */
    @Length( max = 10, message = "beginDate(开始日期)长度需要在1和10之间")
    @ApiModelProperty(value = "开始日期")
    private String beginDate;
    /**
     * 结束日期
     */
    @Length( max = 10, message = "endDate(结束日期)长度需要在1和10之间")
    @ApiModelProperty(value = "结束日期")
    private String endDate;
    /**
     * 交易市场
     */
    @Length( max = 8, message = "marketCode(交易市场)长度需要在1和8之间")
    @ApiModelProperty(value = "交易市场")
    private String marketCode;
    /**
     * 证券类型
     */
    @Length(max = 16, message = "securityType(证券类型)长度需要在1和16之间")
    @ApiModelProperty(value = "证券类型")
    private String securityType;
    /**
     * 交易方向
     */
    @Length(max = 8, message = "transactionDirection(交易方向)长度需要在1和8之间")
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
