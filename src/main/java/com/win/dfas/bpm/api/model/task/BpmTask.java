package com.win.dfas.bpm.api.model.task;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.Date;

public class BpmTask implements IBpmTask {
    protected String id;
    protected String name;
    protected String subject;
    protected String instId;
    protected String taskId;
    protected String nodeId;
    protected String defId;
    protected String assigneeId;
    protected String assigneeNames;
    protected String status;
    protected Integer priority;
    protected Date dueTime;
    protected String taskType;
    protected String parentId;
    protected String actInstId;
    protected String actExecutionId;
    protected String typeId;
    protected Date createTime;
    protected String createBy;
    protected Integer supportMobile;
    protected String backNode;
    /** 耗时:xx天xx小时xx分钟 */
    private String duration;

    public BpmTask() {
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getTaskType() {
        return this.taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getSubject() {
        return this.subject;
    }

    public String getAssigneeNames() {
        return this.assigneeNames;
    }

    public void setAssigneeNames(String assigneeNames) {
        this.assigneeNames = assigneeNames;
    }

    public void setInstId(String instId) {
        this.instId = instId;
    }

    public String getInstId() {
        return this.instId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTaskId() {
        return this.taskId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getNodeId() {
        return this.nodeId;
    }

    public void setDefId(String defId) {
        this.defId = defId;
    }

    public String getDefId() {
        return this.defId;
    }

    public void setAssigneeId(String assigneeId) {
        this.assigneeId = assigneeId;
    }

    public String getAssigneeId() {
        return this.assigneeId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }

    public String getBackNode() {
        return this.backNode;
    }

    public void setBackNode(String backNode) {
        this.backNode = backNode;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getPriority() {
        return this.priority;
    }

    public void setDueTime(Date dueTime) {
        this.dueTime = dueTime;
    }

    public Date getDueTime() {
        return this.dueTime;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getParentId() {
        return this.parentId;
    }

    public void setActInstId(String actInstId) {
        this.actInstId = actInstId;
    }

    public String getActInstId() {
        return this.actInstId;
    }

    public void setActExecutionId(String actExecutionId) {
        this.actExecutionId = actExecutionId;
    }

    public String getActExecutionId() {
        return this.actExecutionId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public String getTypeId() {
        return this.typeId;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getCreateTime() {
        return this.createTime;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public void setSupportMobile(Integer supportMobile) {
        this.supportMobile = supportMobile;
    }

    public Integer getSupportMobile() {
        return this.supportMobile;
    }

    public String toString() {
        return (new ToStringBuilder(this)).append("id", this.id).
                append("name", this.name).
                append("subject", this.subject).
                append("instId", this.instId).
                append("taskId", this.taskId).
                append("nodeId", this.nodeId).
                append("defId", this.defId).
                append("assigneeId", this.assigneeId).
                append("status", this.status).
                append("priority", this.priority).
                append("dueTime", this.dueTime).
                append("taskType", this.taskType).
                append("parentId", this.parentId).
                append("actInstId", this.actInstId).
                append("actExecutionId", this.actExecutionId).
                append("typeId", this.typeId).
                append("createTime", this.createTime).
                append("createBy", this.createBy).
                append("supportMobile", this.supportMobile).
                toString();
    }

    public String getActExecutionIdId() {
        return this.actExecutionId;
    }

    public Date getUpdateTime() {
        return null;
    }

    public void setUpdateTime(Date updatetime) {
    }

    public String getUpdateBy() {
        return null;
    }

    public void setUpdateBy(String updateBy) {
    }
}
