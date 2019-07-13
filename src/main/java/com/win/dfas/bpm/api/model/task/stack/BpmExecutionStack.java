package com.win.dfas.bpm.api.model.task.stack;

import java.util.Date;

public interface BpmExecutionStack {
    void setId(String var1);

    String getId();

    void setTaskId(String var1);

    String getTaskId();

    void setInstId(String var1);

    String getInstId();

    void setParentId(String var1);

    String getParentId();

    void setNodeId(String var1);

    String getNodeId();

    void setNodeName(String var1);

    String getNodeName();

    void setStartTime(Date var1);

    Date getStartTime();

    void setEndTime(Date var1);

    Date getEndTime();

    void setIsMulitiTask(Short var1);

    Short getIsMulitiTask();

    void setNodeType(String var1);

    String getNodeType();

    String getActionName();

    void setActionName(String var1);
}
