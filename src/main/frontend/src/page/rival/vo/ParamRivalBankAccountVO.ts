/****************************************************
 * 创建人：  @author zhongyuqi
 * 创建时间: 2019-07-10 17:37:53
 * 项目名称：dfbp-repo-manage
 * 文件名称: ParamRivalBankAccountRepVO.ts
 * 文件描述: @Description: 对手方-托管行账户信息表 返回VO
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { BaseRepVO, BaseReqVO } from "../../common/vo/BaseVO";

/**
 * <p>
 * 对手方-托管行账户信息表 返回VO
 * </p>
 *
 * @author zhongyuqi
 * @since 2019-07-10 17:37:53
 */

export class ParamRivalBankAccountRepVO extends BaseRepVO {
    /**
     * 对手序号
     */
    public rivalNo: number;
    /**
     * 对手名称
     */
    public rivalName: string;
    /**
     * 托管账户
     */
    public escrowAccount: string;
    /**
     * 托管账户名称
     */
    public escrowName: string;
    /**
     * 托管机构
     */
    public escrowParty: string;
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
 * 对手方-托管行账户信息表 请求VO
 * </p>
 *
 * @author zhongyuqi
 * @since 2019-07-10 17:37:53
 */
export class ParamRivalBankAccountReqVO extends BaseReqVO {
    /**
     * 对手序号
     */
    public rivalNo: number;
    /**
     * 托管账户
     */
    public escrowAccount: string;
    /**
     * 托管账户名称
     */
    public escrowName: string;
    /**
     * 托管机构
     */
    public escrowParty: string;
    /**
     * 0停用,1启用
     */
    public stop: string;
    /**
     * 备注
     */
    public remark: string;
}
