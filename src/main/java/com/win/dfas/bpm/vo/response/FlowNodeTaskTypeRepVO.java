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
    private String processId;
    private String taskType;
}
