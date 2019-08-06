package com.win.dfas.bpm.api.model.definition;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringBuilder;

import javax.xml.bind.annotation.*;
import java.util.Date;

/**
 *
 * 包名称： com.win.dfas.bpm.api.model.def
 * 类名称：BpmDefinition
 * 类描述：流程定义封装类
 * 创建人：@author malaing
 * 创建时间：2019/5/10/17:33
 *
 */
@XmlRootElement(
        name = "BpmDefinition"
)
@XmlAccessorType(XmlAccessType.NONE)
@Data
public class BpmDefinition implements IBpmDefinition {
    protected String id;
    @XmlAttribute(
            name = "name"
    )
    protected String name;
    @XmlAttribute(
            name = "key"
    )
    protected String key;
    @XmlAttribute(
            name = "desc"
    )
    protected String desc;
    @XmlAttribute(
            name = "typeId"
    )
    protected String typeId;
    @XmlAttribute(
            name = "status"
    )
    protected String status = "draft";
    @XmlAttribute(
            name = "supportMobile"
    )
    /**
     * 流程定义json数据
     */
    protected Integer supportMobile = 0;
    @XmlElement(
            name = "defSetting"
    )
    @JSONField(
            serialize = false
    )
    protected String defSetting;
    protected String actDefId;
    protected String actModelId;
    protected String actDeployId;
    protected Integer version;
    protected String mainDefId;
    protected String isMain;
    protected String createBy;
    protected Date createTime;
    protected String createOrgId;
    protected String updateBy;
    protected Date updateTime;
    protected Integer rev;

    public BpmDefinition() {
    }
    @Override
    public String toString() {
        return (new ToStringBuilder(this)).append("id", this.id).append("name", this.name).append("key", this.key).append("desc", this.desc).append("typeId", this.typeId).append("status", this.status).append("actDefId", this.actDefId).append("actModelId", this.actModelId).append("actDeployId", this.actDeployId).append("version", this.version).append("mainDefId", this.mainDefId).append("isMain", this.isMain).append("createBy", this.createBy).append("createTime", this.createTime).append("createOrgId", this.createOrgId).append("updateBy", this.updateBy).append("updateTime", this.updateTime).append("supportMobile", this.supportMobile).append("defSetting", this.defSetting).append("rev", this.rev).toString();
    }
}
