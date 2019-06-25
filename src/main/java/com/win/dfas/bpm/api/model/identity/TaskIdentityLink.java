package com.win.dfas.bpm.api.model.identity;

import lombok.Data;
import org.apache.commons.lang.builder.ToStringBuilder;

import java.io.Serializable;

//任务候选人
@Data
public class TaskIdentityLink implements Serializable {
    public static final String ar = "user";
    protected String id;
    protected String taskId;
    protected String instId;
    protected String type;
    protected String identityName;
    protected String identity;
    protected String permissionCode;

    public TaskIdentityLink() {
    }

    public String toString() {
        return (new ToStringBuilder(this)).append("id", this.id).append("taskId", this.taskId).append("instId", this.instId).append("type", this.type).append("identityName", this.identityName).append("identity", this.identity).append("permissionCode", this.permissionCode).toString();
    }
}
