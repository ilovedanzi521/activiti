package com.win.dfas.bpm.api.model.def;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import java.io.Serializable;

/**
 *
 * 包名称： com.win.dfas.bpm.api.model.def
 * 类名称：NodeInit
 * 类描述：节点初始化类
 * 创建人：@author maliang
 * 创建时间：2019/5/10/17:36
 *
 */
@Data
public class NodeInit implements Serializable {
    @NotBlank(
            message = "节点不能为空"
    )
    private String nodeId = "";
    @NotBlank(
            message = "节点初始化描述不能为空"
    )
    private String desc = "";
    private String beforeShow;
    private String whenSave;

    public NodeInit() {
    }

}
