package com.win.dfas.vo.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.win.dfas.common.util.LongJsonDeserializer;
import com.win.dfas.common.util.LongJsonSerializer;
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
@ApiModel(value = "流程类更新VO")
@Data
public class ParamFlowGroupUpdateReqVO extends BaseReqVO {
    private static final long serialVersionUID = 1L;

    /**
     * 流程名称
     */
    @ApiModelProperty(value = "流程名称")
    private String flowName;

    @Override
    public String toString() {
        return "ParamFlowGroupUpdateReqVO{" +
                "flowName='" + flowName + '\'' +
                '}';
    }
}
