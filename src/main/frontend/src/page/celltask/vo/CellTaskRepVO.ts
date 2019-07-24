/****************************************************
* 创建人：  @author wanglei
* 创建时间: 2019-07-11 13:55:33
* 项目名称：dfas-common-schedule
* 文件名称: CellTaskRepVO.ts
* 文件描述: @Description: 基础任务表 返回VO
*
* All rights Reserved, Designed By 投资交易团队
* @Copyright:2016-2019
*
********************************************************/
import { BaseRepVO } from "../../common/vo/BaseVO";

/**
 * <p>
 * 基础任务表 返回VO
 * </p>
 *
 * @author wanglei
 * @since 2019-07-11 13:55:33
 */

export default class CellTaskRepVO extends BaseRepVO {

    /**
     * 任务名称
     */
    public taskName: string;
    /**
     * 任务类型
     */
    public taskType: string;
    /**
     * 任务路径
     */
    public path: string;
    /**
     * 描述
     */
    public description: string;
}
