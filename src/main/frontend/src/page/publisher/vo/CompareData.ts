import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import ParamCurrencyRepVO from "../vo/ParamPublisherRepVO";
/**
 * 类描述：发行人界面加载前数据VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class CompareData {
    /** 公司类别, 字典数据 */
    public companyCategorySelect: DicRepVO[] = [];
    /** 企业性质，字典数据 */
    public enterpriseNatureSelect: DicRepVO[] = [];
    /** 外部评级，字典数据 */
    public externalRating: DicRepVO[] = [];
    /** 内部评级，字典数据 */
    public internalRating: DicRepVO[] = [];
    /** 币种列表 */
    public repCurrencyVOs: ParamCurrencyRepVO[] = [];
}
