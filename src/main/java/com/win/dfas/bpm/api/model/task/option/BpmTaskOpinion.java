package com.win.dfas.bpm.api.model.task.option;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.Date;

//流程任务审批记录
public class BpmTaskOpinion implements IBpmTaskOpinion {
    protected String id;
    protected String instId;
    protected String supInstId;
    protected String taskId;
    protected String taskKey;
    protected String taskName;
    protected String token;
    private String assignInfo;
    protected String approver;
    protected String approverName;
    protected String opinion;
    protected String status;
    protected String formId;
    protected String createBy;
    protected Date createTime;
    protected Date approveTime;
    protected Long durMs;

    public BpmTaskOpinion() {
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setInstId(String instId) {
        this.instId = instId;
    }

    public String getInstId() {
        return this.instId;
    }

    public void setSupInstId(String supInstId) {
        this.supInstId = supInstId;
    }

    public String getSupInstId() {
        return this.supInstId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTaskId() {
        return this.taskId;
    }

    public void setTaskKey(String taskKey) {
        this.taskKey = taskKey;
    }

    public String getTaskKey() {
        return this.taskKey;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskName() {
        return this.taskName;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }

    public void setApprover(String approver) {
        this.approver = approver;
    }

    public String getApprover() {
        return this.approver;
    }

    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    public String getApproverName() {
        return this.approverName;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }

    public String getOpinion() {
        return this.opinion;
    }

    public Date getApproveTime() {
        return this.approveTime;
    }

    public void setApproveTime(Date approveTime) {
        this.approveTime = approveTime;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    public String getFormId() {
        return this.formId;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getCreateTime() {
        return this.createTime;
    }

    public void setDurMs(Long durMs) {
        this.durMs = durMs;
    }

    public Long getDurMs() {
        return this.durMs;
    }

    public String toString() {
        return (new ToStringBuilder(this)).append("id", this.id).append("instId", this.instId).append("supInstId", this.supInstId).append("taskId", this.taskId).append("taskKey", this.taskKey).append("taskName", this.taskName).append("token", this.token).append("approver", this.approver).append("approverName", this.approverName).append("opinion", this.opinion).append("status", this.status).append("formId", this.formId).append("createBy", this.createBy).append("createTime", this.createTime).append("approveTime", this.approveTime).append("durMs", this.durMs).toString();
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

    public String getAssignInfo() {
        return this.assignInfo;
    }

    public void setAssignInfo(String assignInfo) {
        this.assignInfo = assignInfo;
    }
}
