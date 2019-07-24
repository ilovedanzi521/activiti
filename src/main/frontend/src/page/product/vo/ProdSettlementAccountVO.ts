/****************************************************
 * 创建人：  @author zoujian
 * 创建时间: 2019-07-03 16:36:52
 * 项目名称：dfbp-common-basicparameter
 * 文件名称: ProdSettlementAccountRepVO.ts
 * 文件描述: @Description: 结算账户表 返回VO
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { BaseRepVO, BaseReqVO } from "../../common/vo/BaseVO";

export class ProdSettlementAccountRepVO extends BaseRepVO {
    /**
     * 结算账户序列
     */
    public settlementAccountNo: number;
    /**
     * 资金账户户名
     */
    public capitalAccountName: string;
    /**
     * 资金账号
     */
    public capitalAccountCode: string;
    /**
     * 资金开户行
     */
    public capitalOpenBank: string;
    /**
     * 托管账户户名
     */
    public escrowAccountName: string;
    /**
     * 托管账号
     */
    public escrowAccountCode: string;
    /**
     * 托管机构
     */
    public escrowAgency: string;
    /**
     * 备注
     */
    public summary: string;
    /**
     * 产品序号
     */
    public fundNo: string;
    /**
     * 产品代码
     */
    public fundCode: string;
    /**
     * 产品名称
     */
    public fundName: string;
}

export class ProdSettlementAccountReqVO extends BaseReqVO {
    /**
     * 结算账户序列
     */
    public settlementAccountNo: number;
    /**
     * 资金账户户名
     */
    public capitalAccountName: string;
    /**
     * 资金开户行
     */
    public capitalOpenBank: string;
    /**
     * 托管账户户名
     */
    public escrowAccountName: string;
    /**
     * 托管账号
     */
    public escrowAccountCode: string;
    /**
     * 托管机构
     */
    public escrowAgency: string;
    /**
     * 产品序号
     */
    public fundNo: string;
}
