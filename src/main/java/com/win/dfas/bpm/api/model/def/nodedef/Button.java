package com.win.dfas.bpm.api.model.def.nodedef;

import lombok.Data;

import java.io.Serializable;

/**
 * 包名称：com.win.dfas.bpm.api.model.def.nodedef
 * 类名称：Button
 * 类描述：Button
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
@Data
public class Button implements Serializable {
    private static final long serialVersionUID = 1L;
    protected String name = "";
    protected String alias = "";
    protected String beforeScript = "";
    protected String afterScript = "";
    protected String groovyScript = "";
    protected String configPage = "";

    public Button() {
    }

    public Button(String name, String alias) {
        this.name = name;
        this.alias = alias;
    }

    public Button(String name, String alias, String groovyScript, String configPage) {
        this.name = name;
        this.alias = alias;
        this.groovyScript = groovyScript;
        this.configPage = configPage;
    }
    @Override
    public String toString() {
        return "[name=" + this.name + ", alias=" + this.alias + "]";
    }
}
