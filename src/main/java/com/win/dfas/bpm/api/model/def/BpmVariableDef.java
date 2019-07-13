package com.win.dfas.bpm.api.model.def;

import java.io.Serializable;

public interface BpmVariableDef extends Serializable {
    String VAR_TYPE_STRING = "string";
    String VAR_TYPE_INT = "int";
    String VAR_TYPE_FLOAT = "float";
    String VAR_TYPE_DOUBLE = "double";
    String VAR_TYPE_LONG = "long";
    String VAR_TYPE_DATE = "date";
    String VAR_TYPE_JSON = "json";
    String VAR_TYPE_XML = "xml";
    String VAR_TYPE_BYTES = "bytes";

    String getName();

    void setName(String var1);

    String getNodeId();

    void setNodeId(String var1);

    String getKey();

    void setKey(String var1);

    String getDataType();

    void setDataType(String var1);

    Object getDefaultVal();

    void setDefaultVal(Object var1);

    boolean isRequired();

    void setRequired(boolean var1);

    boolean getIsRequired();

    void setIsRequired(boolean var1);

    String getDescription();

    void setDescription(String var1);
}
