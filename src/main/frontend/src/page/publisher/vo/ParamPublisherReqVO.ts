import { BaseReqVO } from "../../common/vo/BaseVO";
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
