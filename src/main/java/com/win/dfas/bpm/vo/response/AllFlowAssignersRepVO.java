package com.win.dfas.bpm.vo.response;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 包名称：com.win.dfas.bpm.vo.request
 * 类名称：FlowAssignersReqVO
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/7/1/13:23
 */
@Data
public class AllFlowAssignersRepVO implements Serializable{
    //根据modelId获取和nodeId和description的映射信息
    private String modelId;
    private String nodeId;
    private List<FlowAssignersRepVO> flowAssignersRepVOS;

    @Override
    public String toString() {
        return "AllFlowAssignersRepVO{" +
                "modelId='" + modelId + '\'' +
                ", nodeId='" + nodeId + '\'' +
                ", flowAssignersRepVOS=" + flowAssignersRepVOS +
                '}';
    }
}
