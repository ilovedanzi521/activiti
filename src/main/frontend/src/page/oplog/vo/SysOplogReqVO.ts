import { BaseReqVO } from "../../common/vo/BaseVO";

/**
 * 类描述：用户操作日志，请求VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class SysOplogReqVO extends BaseReqVO {
    /**操作用户 */
    operateUserIds: number[] = [];
    /**日志类型 */
    logTypes: Array<string> = [];
    /**日志描述 */
    logDescrip: string = "";
    /**时间范围 */
    timeRange: string = "";
    /**开始时间 */
    timeStart: string = "";
    /**结束时间 */
    timeEnd: string = "";
    /**日志路径 */
    logPath: string = "";
    /**操作页面 */
    operatePage: string = "";
}
