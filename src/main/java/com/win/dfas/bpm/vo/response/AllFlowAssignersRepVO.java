package com.win.dfas.bpm.vo.response;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 包名称：com.win.dfas.bpm.vo.request
 * 类名称：FlowAssignersReqVO
 * 类描述：用户与流程对应信息
 * 创建人：@author wanglei
 * 创建时间：2019/7/1/13:23
 */
@Data
public class AllFlowAssignersRepVO implements Serializable{
    /**
     * 流程引擎模型id
     */
    private String modelId;
    /**
     * 流程引擎中节点的id
     */
    private String nodeId;
    /**
     * 流程中节点对用的人员信息
     */
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
