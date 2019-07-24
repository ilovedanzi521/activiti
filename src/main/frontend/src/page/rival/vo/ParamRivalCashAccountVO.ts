/****************************************************
 * 创建人：  @author zhongyuqi
 * 创建时间: 2019-07-11 13:33:24
 * 项目名称：dfbp-repo-manage
 * 文件名称: ParamRivalCashAccountRepVO.ts
 * 文件描述: @Description: 对手方-资金账户信息表 返回VO
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { BaseRepVO, BaseReqVO } from "../../common/vo/BaseVO";

/**
 * <p>
 * 对手方-资金账户信息表 返回VO
 * </p>
 *
 * @author zhongyuqi
 * @since 2019-07-11 13:33:24
 */
export class ParamRivalCashAccountRepVO extends BaseRepVO {
    /**
     * 对手序号
     */
    public rivalNo: number;
    /**
     * 对手名称
     */
    public rivalName: string;
    /**
     * 资金账号
     */
    public bankAccount: string;
    /**
     * 资金账户名称
     */
    public bankAccountName: string;
    /**
     * 资金开户行
     */
    public bankName: string;
    /**
     * 资金支付系统行
     */
    public bankPayNo: string;
    /**
     * 0停用,1启用
     */
    public stop: string;
    /**
     * 备注
     */
    public remark: string;
}
/**
 * <p>
 * 对手方-资金账户信息表 请求VO
 * </p>
 *
 * @author zhongyuqi
 * @since 2019-07-11 13:33:24
 */
export class ParamRivalCashAccountReqVO extends BaseReqVO {
    /**
     * 对手序号
     */
    public rivalNo: number;
    /**
     * 资金账号
     */
    public bankAccount: string;
    /**
     * 资金账户名称
     */
    public bankAccountName: string;
    /**
     * 资金开户行
     */
    public bankName: string;
    /**
     * 资金支付系统行
     */
    public bankPayNo: string;
    /**
     * 0停用,1启用
     */
    public stop: string;
    /**
     * 备注
     */
    public remark: string;
}
