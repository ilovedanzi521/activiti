import { BaseReqVO } from "../../common/vo/BaseVO";
/**
 * 类描述：发行人请求VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class ParamPublisherReqVO extends BaseReqVO {
    /**
     * 发行人编号
     */
    publisherCode: string = "";
    /**
     * 发行人名称
     */
    publisherName: string = "";
    /**
     * 企业性质，字典key,多选
     */
    enterpriseNatures: Array<string> = [];
}
