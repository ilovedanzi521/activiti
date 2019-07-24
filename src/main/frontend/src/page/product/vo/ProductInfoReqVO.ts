/* @ 产品信息请求VO
 * @Author: lixiuquan
 * @Date: 2019-06-23 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-23 19:34:05
 */

import { BaseReqVO } from "../../common/vo/BaseVO";

export class ProductInfoReqVO extends BaseReqVO {
    /**
     * 产品编码
     */
    public code: string = "";

    /**
     * 产品名称
     */
    public name: string = "";

    /**
     * 产品状态
     */
    public status: string = "";

    /**
     * 一级委托人数组
     */
    public consignorNo: number;

    /**
     * 一级委托人数组
     */
    public consignorNoList: number[] = [];

    /**
     * 二级委托人
     */
    public subConsignorNo: number;
}
