package com.win.dfas.bpm.api.model.def;

import lombok.Data;

import java.io.Serializable;

@Data
public class BpmDataModel implements Serializable {
    private String name = "";
    private String code = "";

    public BpmDataModel() {
    }
}
