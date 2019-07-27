import { BaseRepVO } from "../../common/vo/BaseVO";

/**
 * 类描述：币种，返回VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class ParamCurrencyRepVO extends BaseRepVO {
    /**
     * 币种代码
     */
    public currencyCode: string;
    /**
     * 币种名称
     */
    public currencyName: string;
    /**
     * 备注
     */
    public remark: string;
}
