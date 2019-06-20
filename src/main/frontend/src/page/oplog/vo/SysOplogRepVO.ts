import { BaseRepVO } from "../../common/vo/BaseVO";
export default class SysOplogRepVO extends BaseRepVO {
    /**
     * 日志的类型，字典key
     */
    logType: string = "";
    /**
     * 操作页面
     */
    operatePage: string = "";
    /**
     * 日志描述
     */
    logDescrip: string = "";
    /**
     * 操作用户ID
     */
    operateUserId: number = 0;
    /**
     * 日志路径
     */
    logPath: string = "";
    /**
     * 操作时间
     */
    operateTime: string = "";
    /**
     * 操作前数据
     */
    operatePreData: string = "";
    /**
     * 操作后数据
     */
    operateAfterData: string = "";
    /**
     * 终端机器名
     */
    terminalName: string = "";
    /**
     * 请求IP
     */
    requestIp: string = "";
    /**
     * MAC地址
     */
    macAddress: string = "";
    /**
     * 微服务名
     */
    microServiceName: string = "";
    /**
     * 请求路径
     */
    requestPath: string = "";
    /**
     * 请求参数
     */
    requestParam: string = "";
}
