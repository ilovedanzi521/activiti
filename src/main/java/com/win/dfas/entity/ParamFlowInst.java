package com.win.dfas.entity;

import com.win.dfas.common.entity.BaseEntity;

import java.util.Date;

/**
 * 包名称：com.win.dfas.entity
 * 类名称：ParamFlowInst
 * 类描述：ParamFlowInst
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
public class ParamFlowInst extends BaseEntity {

    private String flowName;

    private String flowType;

    private String beginDate;

    private String endDate;

    private String productCode;

    private String investCompany;

    private String investConstitute;

    private String instructionType;

    private String marketCode;

    private String securityType;

    private String transactionDirection;

    private String modelId;

    private Long flowCode;

    private Boolean startFlag;

    private String deploymentId;
    private String  processDefId;
    private String controlType;

    public String getProcessDefId() {
        return processDefId;
    }

    public void setProcessDefId(String processDefId) {
        this.processDefId = processDefId == null ? null : processDefId.trim();
    }

    public String getDeploymentId() {
        return deploymentId;
    }

    public void setDeploymentId(String deploymentId) {
        this.deploymentId = deploymentId == null ? null : deploymentId.trim();
    }

    public String getFlowName() {
        return flowName;
    }

    public void setFlowName(String flowName) {
        this.flowName = flowName == null ? null : flowName.trim();
    }

    public String getFlowType() {
        return flowType;
    }

    public void setFlowType(String flowType) {
        this.flowType = flowType == null ? null : flowType.trim();
    }

    public String getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(String beginDate) {
        this.beginDate = beginDate == null ? null : beginDate.trim();
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate == null ? null : endDate.trim();
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode == null ? null : productCode.trim();
    }

    public String getInvestCompany() {
        return investCompany;
    }

    public void setInvestCompany(String investCompany) {
        this.investCompany = investCompany == null ? null : investCompany.trim();
    }

    public String getInvestConstitute() {
        return investConstitute;
    }

    public void setInvestConstitute(String investConstitute) {
        this.investConstitute = investConstitute == null ? null : investConstitute.trim();
    }

    public String getInstructionType() {
        return instructionType;
    }

    public void setInstructionType(String instructionType) {
        this.instructionType = instructionType == null ? null : instructionType.trim();
    }

    public String getMarketCode() {
        return marketCode;
    }

    public void setMarketCode(String marketCode) {
        this.marketCode = marketCode == null ? null : marketCode.trim();
    }

    public String getSecurityType() {
        return securityType;
    }

    public void setSecurityType(String securityType) {
        this.securityType = securityType == null ? null : securityType.trim();
    }

    public String getTransactionDirection() {
        return transactionDirection;
    }

    public void setTransactionDirection(String transactionDirection) {
        this.transactionDirection = transactionDirection == null ? null : transactionDirection.trim();
    }


    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId == null ? null : modelId.trim();
    }

    public Long getFlowCode() {
        return flowCode;
    }

    public void setFlowCode(Long flowCode) {
        this.flowCode = flowCode;
    }

    public Boolean getStartFlag() {
        return startFlag;
    }

    public void setStartFlag(Boolean startFlag) {
        this.startFlag = startFlag;
    }

    public String getControlType() {
        return controlType;
    }

    public void setControlType(String controlType) {
        this.controlType = controlType == null ? null : controlType.trim();
    }
}
