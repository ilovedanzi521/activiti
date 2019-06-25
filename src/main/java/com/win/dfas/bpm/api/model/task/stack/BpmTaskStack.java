package com.win.dfas.bpm.api.model.task.stack;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.Date;

//流程执行堆栈树
public class BpmTaskStack implements BpmExecutionStack {
    protected String id;
    protected String taskId;
    protected String instId;
    protected String parentId;
    protected String nodeId;
    protected String nodeName;
    protected Date startTime;
    protected Date endTime;
    protected Short isMulitiTask;
    protected String nodeType;
    protected String actionName;
    protected Date createTime;
    protected Date updateTime;
    public BpmTaskStack() {
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTaskId() {
        return this.taskId;
    }

    public void setInstId(String instId) {
        this.instId = instId;
    }

    public String getInstId() {
        return this.instId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getParentId() {
        return this.parentId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getNodeId() {
        return this.nodeId;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getNodeName() {
        return this.nodeName;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getStartTime() {
        return this.startTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getEndTime() {
        return this.endTime;
    }

    public void setIsMulitiTask(Short isMulitiTask) {
        this.isMulitiTask = isMulitiTask;
    }

    public Short getIsMulitiTask() {
        return this.isMulitiTask;
    }

    public String getActionName() {
        return this.actionName;
    }

    public void setActionName(String actionName) {
        this.actionName = actionName;
    }

    public String toString() {
        return (new ToStringBuilder(this)).append("id", this.id).append("taskId", this.taskId).append("instId", this.instId).append("parentId", this.parentId).append("nodeId", this.nodeId).append("nodeName", this.nodeName).append("startTime", this.startTime).append("endTime", this.endTime).append("isMulitiTask", this.isMulitiTask).append("nodeTYpe", this.nodeType).toString();
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }

    public String getNodeType() {
        return this.nodeType;
    }

//    public void setActionName(ActionCmd actionModel) {
//        if (actionModel != null) {
//            this.setActionName(actionModel.getActionName());
//        }
//
//    }
}
