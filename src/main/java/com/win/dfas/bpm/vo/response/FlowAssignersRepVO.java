package com.win.dfas.bpm.vo.response;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 包名称：com.win.dfas.bpm.vo.request
 * 类名称：FlowAssignersReqVO
 * 类描述：根据modelId获取和nodeId和description的映射信息
 * 创建人：@author wanglei
 * 创建时间：2019/7/1/13:23
 */
@Data
public class FlowAssignersRepVO implements Serializable{
    /**
     * modelId 流程模型id
     */
    private String modelId;
    /**
     * nodeId 流程节点id
     */
    private String nodeId;
    /**
     * 节点用户类型
     */
    private String pluginType;
    /**
     * 节点用户信息顺序
     */
    private Integer descIndex;
    /**
     * 节点用户信息
     */
    private String description;
    /**
     * 节点用户信息全描述
     */
    private String allDescription;

    @Override
    public String toString() {
        return "FlowAssignersRepVO{" +
                "pluginType='" + pluginType + '\'' +
                ", descIndex=" + descIndex +
                ", description='" + description + '\'' +
                '}';
    }
}
