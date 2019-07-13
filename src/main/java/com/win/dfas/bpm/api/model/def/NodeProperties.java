package com.win.dfas.bpm.api.model.def;

import lombok.Data;

import java.io.Serializable;

@Data
public class NodeProperties implements Serializable {
    public static final String BACK_MODEL_NORMAL = "normal";
    public static final String BACK_MODEL_BACK = "back";
    public static final String BACK_USER_MODEL_HISTORY = "history";
    public static final String BACK_USER_MODEL_NORMAL = "normal";
    private static final long serialVersionUID = -3157546646728816168L;
    private String nodeId = "";
    private String jumpType = "";
    private boolean allowExecutorEmpty = true;
    private String backMode = "normal";
    private String backNode = "";
    private String backUserMode = "history";
    private String freeSelectUser = "no";
    private boolean freeSelectNode = false;

    public NodeProperties() {
    }
}
