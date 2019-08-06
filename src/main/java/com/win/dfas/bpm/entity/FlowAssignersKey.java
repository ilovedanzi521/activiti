package com.win.dfas.bpm.entity;
/**
 * 包名称：com.win.dfas.bpm.entity;
 * 类名称：FlowAssignersKey
 * 类描述：FlowAssignersKey
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
public class FlowAssignersKey {
    private String modelId;

    private String nodeId;

    private Integer descIndex;

    private String pluginType;

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId == null ? null : modelId.trim();
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId == null ? null : nodeId.trim();
    }

    public Integer getDescIndex() {
        return descIndex;
    }

    public void setDescIndex(Integer descIndex) {
        this.descIndex = descIndex;
    }

    public String getPluginType() {
        return pluginType;
    }

    public void setPluginType(String pluginType) {
        this.pluginType = pluginType == null ? null : pluginType.trim();
    }
}
