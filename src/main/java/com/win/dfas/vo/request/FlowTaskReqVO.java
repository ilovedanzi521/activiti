package com.win.dfas.vo.request;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 包名称：com.win.dfas.entity
 * 类名称：FlowTaskReqVO
 * 类描述：FlowTaskReqVO
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/14:18
 */
@Data
public class FlowTaskReqVO {
    /**
     * 流程用户
     */
    private String userId;
    /**
     * 流程用户组
     */
    private String groupId;
    /**
     * 节点用户组信息
     */
    private String taskType;
    /**
     * 审批金额
     */
    private BigDecimal amt;
    /**
     * 流程实例id
     */
    private String processId;
    /**
     * 流程定义id
     */
    private String processDefId;
    /**
     * 任务id
     */
    private String taskId;
    /**
     * 审批标志 0-通过，1-是不通过
     */
    private String permit="0";
    //todo
}
