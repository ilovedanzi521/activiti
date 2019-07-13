package com.win.dfas.bpm.api.model.def.nodedef;

import lombok.Data;

import java.io.Serializable;

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

    public String toString() {
        return "[name=" + this.name + ", alias=" + this.alias + "]";
    }
}
