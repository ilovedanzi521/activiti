import { BaseRepVO } from "../../common/vo/BaseVO";
/**
 * 类描述：用户操作日志，返回VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class SysOplogRepVO extends BaseRepVO {
    /**
     * 日志的类型，字典key
     */
    public logType: string = "";
    /**
     * 操作页面
     */
    public operatePage: string = "";
    /**
     * 日志描述
     */
    public logDescrip: string = "";
    /**
     * 操作用户ID
     */
    public operateUserId: number = 0;
    /**
     * 日志路径
     */
    public logPath: string = "";
    /**
     * 操作时间
     */
    public operateTime: string = "";
    /**
     * 操作前数据
     */
    public operatePreData: string = "";
    /**
     * 操作后数据
     */
    public operateAfterData: string = "";
    /**
     * 终端机器名
     */
    public terminalName: string = "";
    /**
     * 请求IP
     */
    public requestIp: string = "";
    /**
     * MAC地址
     */
    public macAddress: string = "";
    /**
     * 微服务名
     */
    public microServiceName: string = "";
    /**
     * 请求路径
     */
    public requestPath: string = "";
    /**
     * 请求参数
     */
    public requestParam: string = "";
}
