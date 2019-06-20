package com.win.dfas.vo.response;

import com.win.dfas.common.vo.BaseReqVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * 包名称：com.win.dfas.vo.request
 * 类名称：ParamFlowReqVO
 * 类描述：ParamFlowReqVO
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/9:38
 */
@ApiModel(value = "流程类查询VO")
@Data
public class ParamFlowGroupRepVO extends BaseReqVO {
    private static final long serialVersionUID = 1L;
    /**
     * 可编辑
     */
    @ApiModelProperty(value = "可编辑")
    private String edit;
    /**
     * 流程名称
     */
    @ApiModelProperty(value = "流程名称")
    private String label;
    /**
     * 等级
     */
    @ApiModelProperty(value = "等级")
    private String level;
    /**
     * rownum
     */
    @ApiModelProperty(value = "rownum")
    private String rownum;
    /**
     * 子流程
     */
    @ApiModelProperty(value = "子流程")
    private List<ParamFlowGroupRepVO> children;

}
