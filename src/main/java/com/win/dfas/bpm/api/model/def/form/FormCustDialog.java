package com.win.dfas.bpm.api.model.def.form;

import com.win.dfas.bpm.api.model.custdialog.*;
import com.win.dfas.bpm.util.JsonUtil;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import java.util.List;

@Data
public class FormCustDialog {
    public static final String DATA_SOURCE_INTERFACE = "interface";
    @NotEmpty
    private String key;
    @NotEmpty
    private String name;
    private String desc;
    @NotEmpty
    private String style;
    @NotEmpty
    private String dsKey;
    @NotEmpty
    private String dsName;
    @NotEmpty
    private String objType;
    @NotEmpty
    private String objName;
    private String id;
    private boolean page;
    private int pageSize;
    private int width;
    private int height;
    private boolean system;
    private boolean multiple;
    private String treeConfigJson;
    private String displayFieldsJson;
    private String conditionFieldsJson;
    private String returnFieldsJson;
    private String sortFieldsJson;
    private String dataSource;
    @Valid
    private FormCustDialogTreeConfig treeConfig;
    @Valid
    private List<FormCustDialogDisplayField> displayFields;
    @Valid
    private List<FormCustDialogConditionField> conditionFields;
    @Valid
    private List<FormCustDialogReturnField> returnFields;
    @Valid
    private List<FormCustDialogSortField> sortFields;

    public FormCustDialog() {
    }

    public String getTreeConfigJson() {
        return this.treeConfigJson;
    }

    public void setTreeConfigJson(String treeConfigJson) {
        this.treeConfig = (FormCustDialogTreeConfig) JsonUtil.parseObject(treeConfigJson, FormCustDialogTreeConfig.class);
        this.treeConfigJson = treeConfigJson;
    }

    public String getDisplayFieldsJson() {
        return this.displayFieldsJson;
    }

    public void setDisplayFieldsJson(String displayFieldsJson) {
        this.displayFields = JsonUtil.parseArray(displayFieldsJson, FormCustDialogDisplayField.class);
        this.displayFieldsJson = displayFieldsJson;
    }

    public String getConditionFieldsJson() {
        return this.conditionFieldsJson;
    }

    public void setConditionFieldsJson(String conditionFieldsJson) {
        this.conditionFields = JsonUtil.parseArray(conditionFieldsJson, FormCustDialogConditionField.class);
        this.conditionFieldsJson = conditionFieldsJson;
    }

    public String getReturnFieldsJson() {
        return this.returnFieldsJson;
    }

    public void setReturnFieldsJson(String returnFieldsJson) {
        this.returnFields = JsonUtil.parseArray(returnFieldsJson, FormCustDialogReturnField.class);
        this.returnFieldsJson = returnFieldsJson;
    }

    public String getSortFieldsJson() {
        return this.sortFieldsJson;
    }

    public void setSortFieldsJson(String sortFieldsJson) {
        this.sortFields = JsonUtil.parseArray(sortFieldsJson, FormCustDialogSortField.class);
        this.sortFieldsJson = sortFieldsJson;
    }

    public FormCustDialogTreeConfig getTreeConfig() {
        return this.treeConfig;
    }

    public void setTreeConfig(FormCustDialogTreeConfig treeConfig) {
        this.treeConfigJson = JsonUtil.toJSONString(treeConfig);
        this.treeConfig = treeConfig;
    }

    public List<FormCustDialogDisplayField> getDisplayFields() {
        return this.displayFields;
    }

    public void setDisplayFields(List<FormCustDialogDisplayField> displayFields) {
        this.displayFieldsJson = JsonUtil.toJSONString(displayFields);
        this.displayFields = displayFields;
    }

    public List<FormCustDialogConditionField> getConditionFields() {
        return this.conditionFields;
    }

    public void setConditionFields(List<FormCustDialogConditionField> conditionFields) {
        this.conditionFieldsJson = JsonUtil.toJSONString(conditionFields);
        this.conditionFields = conditionFields;
    }

    public List<FormCustDialogReturnField> getReturnFields() {
        return this.returnFields;
    }

    public void setReturnFields(List<FormCustDialogReturnField> returnFields) {
        this.returnFieldsJson = JsonUtil.toJSONString(returnFields);
        this.returnFields = returnFields;
    }

    public List<FormCustDialogSortField> getSortFields() {
        return this.sortFields;
    }

    public void setSortFields(List<FormCustDialogSortField> sortFields) {
        this.sortFieldsJson = JsonUtil.toJSONString(sortFields);
        this.sortFields = sortFields;
    }


}
