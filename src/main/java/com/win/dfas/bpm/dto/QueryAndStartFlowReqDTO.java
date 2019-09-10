package com.win.dfas.bpm.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
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
    @NotNull(message = "productCode(产品)不能为空")
    private String productCode;
    @NotNull(message = "investConstitute(组合)不能为空")
    private String investConstitute;
    @NotNull(message = "transactionDirection(交易方向)不能为空")
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
    @NotNull(message = "amt(金额)不能为空")
    private BigDecimal amt;
    private String processId;
    private String processDefId;
    private String taskId;
    /**
     * 0-通过，1-是不通过
     */
    @NotNull(message = "permit(审核状态:0-通过，1-是不通过)不能为空")
    private String permit="0";
}
