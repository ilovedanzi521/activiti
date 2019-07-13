package com.win.dfas.bpm.vo.request;

import com.win.dfas.common.vo.BaseReqVO;
import lombok.Data;

import java.io.Serializable;

/**
 * 包名称：com.win.dfas.bpm.vo.request
 * 类名称：FlowAssignersReqVO
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/7/1/13:23
 */
@Data
public class FlowAssignersReqVO implements Serializable{

    public FlowAssignersReqVO(String modelId, String nodeId, Integer descIndex, String description,String codeDesc,String pluginType) {
        this.modelId = modelId;
        this.nodeId = nodeId;
        this.descIndex = descIndex;
        this.description = description;
        this.codeDesc = codeDesc;
        this.pluginType = pluginType;
    }
    private String pluginType;
    private String modelId;

    private String nodeId;
    private String codeDesc;
    private Integer descIndex;

    private String description;

    @Override
    public String toString() {
        return "FlowAssignersReqVO{" +
                "pluginType='" + pluginType + '\'' +
                ", modelId='" + modelId + '\'' +
                ", nodeId='" + nodeId + '\'' +
                ", codeDesc='" + codeDesc + '\'' +
                ", descIndex=" + descIndex +
                ", description='" + description + '\'' +
                '}';
    }
}
