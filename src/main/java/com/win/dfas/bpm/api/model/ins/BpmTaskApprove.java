package com.win.dfas.bpm.api.model.ins;

import lombok.Data;

import java.util.Date;

/**
 *
 * 包名称： com.win.dfas.bpm.api.model.ins
 * 类名称：BpmTaskApprove
 * 类描述：已办实体类
 * 创建人：@author maliang
 * 创建时间：2019/5/14/14:30
 *
 */
@Data
public class BpmTaskApprove {
    /* 主键 */
    protected String id;
    /*节点名称*/
    protected String nodeName;
   /* 节点ID*/
    protected String nodeId;
    /*办理时间*/
    protected Date approveTime;
    /*办理用时*/
    protected Long durMs;
    /*办理状态  同意，驳回*/
    protected String approveStatus;
    /*流程实例主题*/
    protected String subject;
    /*流程定义名称*/
    protected String defName;
    /*流程实例状态*/
    protected String status;
    protected Date endTime;
    /*办理用时格式化*/
    protected String duration;
    protected String typeId;
    /*activiti实例ID*/
    protected String actInstId;
    protected String createBy;
    protected String creator;
    protected Date createTime;

    public BpmTaskApprove() {
    }


}
