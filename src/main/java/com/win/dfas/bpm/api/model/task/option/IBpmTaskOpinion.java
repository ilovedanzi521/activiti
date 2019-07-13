package com.win.dfas.bpm.api.model.task.option;

import java.util.Date;

public interface IBpmTaskOpinion {
    String getId();

    String getInstId();

    String getSupInstId();

    String getTaskId();

    String getTaskKey();

    String getTaskName();

    String getToken();

    String getAssignInfo();

    String getApprover();

    String getApproverName();

    String getOpinion();

    String getStatus();

    String getFormId();

    String getCreateBy();

    Date getCreateTime();

    Date getApproveTime();
}
