package com.win.dfas.bpm.api.model.ins;

import java.util.Date;

public interface IBpmInstance {
    Short INSTANCE_FORBIDDEN = Short.valueOf((short)1);
    Short INSTANCE_NO_FORBIDDEN = Short.valueOf((short)0);

    String getId();

    String getSubject();

    String getDefId();

    String getActDefId();

    String getDefKey();

    String getDefName();

    String getBizKey();

    String getStatus();

    Date getEndTime();

    Long getDuration();

    String getTypeId();

    String getActInstId();

    String getCreateBy();

    String getCreator();

    Date getCreateTime();

    String getCreateOrgId();

    String getUpdateBy();

    Date getUpdateTime();

    String getIsFormmal();

    String getParentInstId();

    Short getIsForbidden();

    String getDataMode();

    Integer getSupportMobile();

    String getSuperNodeId();

    Boolean hasCreate();

    void setHasCreate(Boolean var1);
}
