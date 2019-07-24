/* @ 委托人表单验证
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
 * 委托人信息弹出框表单规则
 */
export class ProdConsignorRules {
    // 委托人名称
    public name: any[];
    // 委托人简称
    public shortName: any[];
    // 公司类型
    public type: any[];

    constructor(type: boolean) {
        if (type) {
            this.name = [inputBlurRule];
            this.shortName = [inputBlurRule];
            this.type = [selectChangeRule];
        }
    }
}
