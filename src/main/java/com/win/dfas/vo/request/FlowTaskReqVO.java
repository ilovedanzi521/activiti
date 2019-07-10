package com.win.dfas.vo.request;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 包名称：com.win.dfas.entity
 * 类名称：FlowTaskReqVO
 * 类描述：FlowTaskReqVO
 * 创建人：@author wanglei
 * 创建时间：2019/6/27/14:18
 */
@Data
public class FlowTaskReqVO {
    private String userName; //流程用户
    private String groupName; //流程用户组
//    private String
    private String taskType;
    private BigDecimal amt;
    private String processId;
    private String processDefId;
    private String taskId;
    private String permit="0"; //0-通过，1-是不通过
    //todo
}
