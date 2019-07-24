/* @ 产品表单验证
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

/**
 * 选择框change更改校验规则
 */
const selectChangeRule = {
    required: true,
    message: "请选择",
    trigger: "change"
};
/**
 * 输入框blur校验规则
 */
const inputBlurRule = {
    required: true,
    message: "请输入",
    trigger: "blur"
};

/**
 * 债券基本信息弹出框表单规则
 */
export class ProdInfoDialogRules {
    // 委托人
    public consignorNo: any[];
    public subConsignorNo: any[];
    // 产品代码
    public code: any[];
    // 产品名称
    public name: any[];
    // 产品份额
    public prodShare: any[];
    // 产品类型
    public type: any[];
    // 资产币种
    public assetCury: any[];
    // 产品状态
    public status: any[];

    constructor(type: boolean) {
        if (type) {
            this.consignorNo = [selectChangeRule];
            this.subConsignorNo = [selectChangeRule];
            this.code = [inputBlurRule];
            this.name = [inputBlurRule];
            this.prodShare = [inputBlurRule];
            this.type = [selectChangeRule];
            this.assetCury = [selectChangeRule];
            this.status = [selectChangeRule];
        }
    }
}
