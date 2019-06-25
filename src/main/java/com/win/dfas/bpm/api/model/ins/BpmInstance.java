package com.win.dfas.bpm.api.model.ins;

import lombok.Data;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.Date;

@Data
public class BpmInstance implements IBpmInstance {
    protected String id;
    protected String subject;
    protected String defId;
    protected String actDefId;
    protected String defKey;
    protected String defName;
    protected String bizKey;
    protected String status;
    protected Date endTime;
    protected Long duration;
    protected String typeId;
    protected String actInstId;
    protected String createBy;
    protected String creator;
    protected Date createTime;
    protected String createOrgId;
    protected String updateBy;
    protected Date updateTime;
    protected String isFormmal;
    protected String parentInstId;
    protected Short isForbidden = Short.valueOf((short)0);
    protected String dataMode;
    protected Integer supportMobile;
    protected String superNodeId;
    protected transient boolean hasCreate = true;
    private String duraStr;
    public BpmInstance() {
    }


    public String toString() {
        return (new ToStringBuilder(this)).append("id", this.id).
                append("subject", this.subject).
                append("defId", this.defId).
                append("actDefId", this.actDefId).
                append("defKey", this.defKey).
                append("defName", this.defName).
                append("bizKey", this.bizKey).
                append("status", this.status).
                append("endTime", this.endTime).
                append("duration", this.typeId).
                append("typeId", this.typeId).
                append("actInstId", this.actInstId).
                append("createBy", this.createBy).
                append("creator", this.creator).
                append("createTime", this.createTime).
                append("createOrgId", this.createOrgId).
                append("updateBy", this.updateBy).
                append("updateTime", this.updateTime).
                append("isFormmal", this.isFormmal).
                append("parentInstId", this.parentInstId).
                append("isForbidden", this.isForbidden).
                append("dataMode", this.dataMode).
                append("supportMobile", this.supportMobile).
                append("superNodeId", this.superNodeId).toString();
    }

    public Boolean hasCreate() {
        return this.hasCreate;
    }
    public String getBizKey() {
        return this.bizKey == null ? "" : this.bizKey;
    }
    public void setHasCreate(Boolean hasCreate) {
        this.hasCreate = hasCreate;
    }
}
