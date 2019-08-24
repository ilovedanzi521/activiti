package com.win.dfas.bpm.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 包名称：com.win.dfas.bpm.dto
 * 类名称：QueryAndStartFlowReqDTO
 * 类描述：查询并启动流程接口合并----hechengheng要求更改、是否违背单一原则？
 * 创建人：@author wanglei
 * 创建时间：2019/7/16/13:49
 */
@Data
public class QueryAndStartFlowReqDTO {
    private String productCode;
    private String investConstitute;
    private String transactionDirection;
    /**
     * 流程用户
     */
    private String userId;
    /**
     * 流程用户组
     */
    private String groupId;
    private String taskType;
    private BigDecimal amt;
    private String processId;
    private String processDefId;
    private String taskId;
    /**
     * 0-通过，1-是不通过
     */
    private String permit="0";
}
