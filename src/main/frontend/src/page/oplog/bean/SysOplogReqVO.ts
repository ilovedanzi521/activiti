import { BaseReqVO } from "../../common/vo/BaseVO";
export default class SysOplogReqVO extends BaseReqVO {
    /**操作用户 */
    operateUserIds: number[] = [];
    /**日志类型 */
    logTypes: Array<string> = [];
    /**日志描述 */
    logDescrip: string = "";
    /**时间范围 */
    timeRange: string = "TD";
    /**开始时间 */
    timeStart: string = "";
    /**结束时间 */
    timeEnd: string = "";
    /**日志路径 */
    logPath: string = "";
    /**操作页面 */
    operatePage: string = "";
    /**当前页面 */
    pageNum: number = 1;
    /**页面行数 */
    pageSize: number = 10;
    /**开始、结束时间数组 */
    timeArray: string[] = [];
}
