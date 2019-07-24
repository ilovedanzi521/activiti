import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
import { DicRepVO } from "../../dictionary/vo/DicVO";

export class StockholderReqVO extends BaseReqVO {
    /**
     * 交易市场
     */
    public marketNo: string = "";
    /**
     * 股东账户编码(股东代码)
     */
    public code: string = "";
    /**
     * 产品No
     */
    public fundNo: string = "";
    /**
     * 股东账户状态
     */
    public registerStatus: string = "";
}

export class StockholderRepVO extends BaseRepVO {
    /**
     * 交易市场序号
     */
    public marketNo: string = "";

    /**
     * 股东账户编码(股东代码)
     */
    public code: string = "";

    /**
     * 股东名称
     */
    public name: string = "";

    /**
     * 股东账户简称
     */
    public shortname: string = "";

    /**
     * 指定席位/主席位
     */
    public seat: string = "";

    /**
     * 股东属性
     */
    public ownerType: string = "";

    /**
     * 登记公司
     */
    public registration: string = "";

    /**
     * 登记状态
     */
    public registerStatus: string = "";

    /**
     * 备注
     */
    public summary: string = "";

    /**
     * 产品序号
     */
    public fundNo: number;

    /**
     * 产品代码
     */
    public fundCode: string = "";

    /**
     * 产品全称
     */
    public fundName: string = "";

    /**
     * 资产单元序号
     */
    public assetUnitNo: number;

    /**
     * 投资组合序号
     */
    public portfNo: number;

    /**
     * *缺省股东
     */
    public defaultStatus: string = "";
}
export class StockholderDicVO {
    public marketTypes: DicRepVO[] = [];
    public registrations: DicRepVO[] = [];
    public ownerTypes: DicRepVO[] = [];
    public dicRegisterStatus: DicRepVO[] = [];
}
