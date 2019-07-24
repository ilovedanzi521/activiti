/****************************************************
 * 创建人：  @author zoujian
 * 创建时间: 2019-07-10 11:35:35
 * 文件名称: ParamRivalInfoVO.ts
 * 文件描述: @Description: 交易对手表 返回VO
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { BaseRepVO, BaseReqVO } from "../../common/vo/BaseVO";

export class ParamRivalTraderRepVO extends BaseRepVO {
    /**
     * 对手序号
     */
    public rivalNo: number;

    /**
     * 对手名称
     */
    public rivalName: string;

    /**
     * 对手交易员序号
     */
    public rivalTraderNo: number;

    /**
     * 交易员姓名
     */
    public traderName: string;

    /**
     * 电话
     */
    public phone: string;

    /**
     * 传真
     */
    public fax: string;

    /**
     * 邮件地址
     */
    public email: string;

    /**
     * QQ即时通讯
     */
    public qq: string;

    /**
     * 通讯地址
     */
    public address: string;

    /**
     * 停用标志
     */
    public stop: string;

    /**
     * 备注
     */
    public remark: string;
}
export class ParamRivalTraderReqVO extends BaseReqVO {
    /**
     * 对手序号
     */
    public rivalNo: number;

    /**
     * 对手名称
     */
    public rivalName: string;

    /**
     * 交易员姓名
     */
    public traderName: string;

    /**
     * 电话
     */
    public phone: string;

    /**
     * 停用标志
     */
    public stop: string;
}
