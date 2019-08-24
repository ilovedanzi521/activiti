/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/7/27/16:18
 * 项目名称: dfas-common-bpm
 * 文件名称: FlowNodeTaskTypeRepVO.java
 * 文件描述: @Description: 流程节点任务类型信息
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.bpm.vo.response;

import lombok.Data;

/**
 * 包名称：com.win.dfas.bpm.vo.response
 * 类名称：FlowNodeTaskTypeRepVO
 * 类描述：流程节点任务类型信息
 * 创建人：@author wanglei
 * 创建时间：2019/7/27/16:18
 */
@Data
public class FlowNodeTaskTypeRepVO {
    public FlowNodeTaskTypeRepVO() {
    }

    public FlowNodeTaskTypeRepVO(String processId) {
        this.processId = processId;
    }

    public FlowNodeTaskTypeRepVO(String processId, EnumRunStatu statu) {
        this.processId = processId;
        this.statu = statu;
    }

    /**
     * 流程实例id
     */
    private String processId;
    /**
     * 下一节点任务类型
     */
    private String taskType;
    /**
     * 是否结束 true-结束，false-没有结束
     */
    private EnumRunStatu statu ;

    public FlowNodeTaskTypeRepVO setStatu(EnumRunStatu statu) {
        this.statu = statu;
        return this;
    }

    public static enum EnumRunStatu{
        /**
         * 流程运行中
         */
        RUNNING,
        /**
         * 审批后流程结束,正常结束
         */
        END,
        /**
         * 流程早已关闭或早已完成,执行的是非法操作
         */
        CLOSE,
        /**
         * 异常
         */
        EXCEPTION;
    }
}
