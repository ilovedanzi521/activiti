package com.win.dfas.bpm.api.model.task;

import java.util.Date;

public interface IBpmTask {
    short STATUS_SUSPEND = 1;
    short STATUS_NO_SUSPEND = 0;

    String getId();

    String getName();

    String getSubject();

    String getTaskId();

    String getActExecutionIdId();

    String getNodeId();

    String getInstId();

    String getDefId();

    String getAssigneeId();

    String getStatus();

    Integer getPriority();

    Date getCreateTime();

    Date getDueTime();

    String getTaskType();

    String getParentId();

    String getActInstId();

    void setAssigneeId(String var1);

    void setAssigneeNames(String var1);
}
