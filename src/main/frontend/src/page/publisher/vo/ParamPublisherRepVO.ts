import { BaseRepVO } from "../../common/vo/BaseVO";
export default class ParamPublisherRepVO extends BaseRepVO {
    /**
     * 发行人编号
     */
    publisherCode: string;
    /**
     * 发行人名称
     */
    publisherName: string;
    /**
     * 法人代表
     */
    legalPerson: string;
    /**
     * 注册资本
     */
    registerCapital: number;
    /**
     * 注册地址
     */
    registerAddress: string;
    /**
     * 公司类别
     */
    companyCategory: string;
    /**
     * 企业性质，字典key
     */
    enterpriseNature: string;
    /**
     * 净资产,保留两位小数
     */
    netAssets: number;
    /**
     * 总资产,保留两位小数
     */
    totalAssets: number;
    /**
     * 资产币种，币种表code
     */
    assetsCurrencyCode: string;
    /**
     * 外部评级，字典key
     */
    externalRating: string;
    /**
     * 内部评级，字典key
     */
    internalRating: string;
    /**
     * 是否删除： 0-未删除 1-已删除
     */
    delFlag: boolean = false;
    /**
     * 备注
     */
    remark: string;
}
