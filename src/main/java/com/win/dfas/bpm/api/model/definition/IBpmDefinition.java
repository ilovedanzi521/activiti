package com.win.dfas.bpm.api.model.definition;

import java.util.Date;

/**
 *
 * 包名称： com.win.dfas.bpm.api.model.def
 * 类名称：BpmDefinition
 * 类描述：流程定义封装类接口方法
 * 创建人：@author malaing
 * 创建时间：2019/5/10/17:33
 *
 */
public interface IBpmDefinition  {
    String getId();

    String getName();

    String getKey();

    String getDesc();

    String getTypeId();

    String getStatus();

    void setActDefId(String var1);

    String getActDefId();

    void setActModelId(String var1);

    String getActModelId();

    void setActDeployId(String var1);

    String getActDeployId();

    void setVersion(Integer var1);

    Integer getVersion();

    void setMainDefId(String var1);

    String getMainDefId();

    void setIsMain(String var1);

    String getIsMain();

    void setCreateBy(String var1);

    String getCreateBy();

    void setCreateTime(Date var1);

    Date getCreateTime();

    void setCreateOrgId(String var1);

    String getCreateOrgId();

    void setUpdateBy(String var1);

    String getUpdateBy();

    void setUpdateTime(Date var1);

    Date getUpdateTime();

    Integer getSupportMobile();

    String getDefSetting();

    Integer getRev();

    public static final class STATUS {
        public static final String DRAFT = "draft";
        public static final String DEPLOY = "deploy";
        public static final String FORBIDDEN = "forbidden";

        public STATUS() {
        }
    }
}
