package com.win.dfas.bpm.api.model.def;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import java.io.Serializable;

@Data
public class BpmDefProperties implements Serializable {
    @NotBlank
    protected String subjectRule = "{发起人:startorName}在{发起时间:startDate}发起{流程标题:title}";
    protected String description = "";
    protected boolean allowExecutorEmpty = true;
    protected Integer supportMobile = 0;
    protected boolean logSubmitData = true;
    @NotBlank
    protected String status = "draft";

    public BpmDefProperties() {
    }
}
