import { BaseRepVO } from "../../common/vo/BaseVO";
/**
 * 类描述：发行人返回VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class ParamPublisherRepVO extends BaseRepVO {
    /**
     * 发行人编号
     */
    public publisherCode: string;
    /**
     * 发行人名称
     */
    public publisherName: string;
    /**
     * 法人代表
     */
    public legalPerson: string;
    /**
     * 注册资本
     */
    public registerCapital: number;
    /**
     * 注册地址
     */
    public registerAddress: string;
    /**
     * 公司类别
     */
    public companyCategory: string;
    /**
     * 企业性质，字典key
     */
    public enterpriseNature: string;
    /**
     * 净资产,保留两位小数
     */
    public netAssets: number;
    /**
     * 总资产,保留两位小数
     */
    public totalAssets: number;
    /**
     * 资产币种，币种表code
     */
    public assetsCurrencyCode: string;
    /**
     * 外部评级，字典key
     */
    public externalRating: string;
    /**
     * 内部评级，字典key
     */
    public internalRating: string;
    /**
     * 是否删除： 0-未删除 1-已删除
     */
    public delFlag: boolean = false;
    /**
     * 备注
     */
    public remark: string;
}
