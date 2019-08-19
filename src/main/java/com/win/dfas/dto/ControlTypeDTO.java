/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/19/11:02
 * 项目名称: dfas-common-bpm
 * 文件名称: ControlTypeDTO.java
 * 文件描述: @Description:
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.dto;

import lombok.Data;

/**
 * 包名称：com.win.dfas.dto
 * 类名称：ControlTypeDTO
 * 类描述：指令类型
 * 创建人：@author wanglei
 * 创建时间：2019/8/19/11:02
 */
@Data
public class ControlTypeDTO {
    private String parentDicCode;
    private String dicCode;
    private String dicExplain;
}
