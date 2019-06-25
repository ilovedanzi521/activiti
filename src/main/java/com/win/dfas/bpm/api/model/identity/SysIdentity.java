package com.win.dfas.bpm.api.model.identity;

import java.io.Serializable;

/**
 *
 * 包名称： com.win.dfas.bpm.api.model
 * 类名称：SysIdentity
 * 类描述：用户身份信息父接口
 * 创建人：@author yss
 * 创建时间：2019/5/10/16:07
 *
 */
public interface SysIdentity extends Serializable {
    String TYPE_USER = "user";
    String TYPE_ROLE = "role";
    String TYPE_GROUP = "group";
    String TYPE_ORG = "org";
    String TYPE_POST = "post";
    String TYPE_JOB = "job";

    String getId();

    void setId(String id);

    String getName();

    void setName(String name);

    String getType();

    void setType(String type);
}
