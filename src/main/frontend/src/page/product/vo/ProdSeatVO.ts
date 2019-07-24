import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
import { DicRepVO } from "../../dictionary/vo/DicVO";

export class ProdSeatReqVO extends BaseReqVO {
    /**
     * 交易市场No
     */
    public marketNo: string = "";

    /**
     * 席位编码
     */
    public seatCode: string = "";

    /**
     * 产品No
     */
    public fundNo: number;
}

export class ProdSeatRepVO extends BaseRepVO {
    /**
     * 席位序号
     */
    public no: number;

    /**
     * 交易所序号
     */
    public marketNo: string = "";

    /**
     * 席位编码
     */
    public code: string = "";

    /**
     * 席位名称
     */
    public name: string = "";

    /**
     * 所属券商序号
     */
    public brokerCode: string = "";

    /**
     * 主席位
     */
    public mainCode: string = "";

    /**
     * 交易所识别码
     */
    public marketRemark: string = "";

    /**
     * 参与人结算账户
     */
    public participantAccount: string = "";

    /**
     * 密码
     */
    public password: string = "";

    /**
     * 联系人
     */
    public linkman: string = "";

    /**
     * 联系方式
     */
    public linkType: string = "";

    /**
     * 最小合同起始号
     */
    public minContractNo: number;

    /**
     * 最大合同号
     */
    public maxContractNo: number;

    /**
     * 当前合同号
     */
    public contractNo: number;

    /**
     * 备注
     */
    public summary: string = "";

    /**
     * 资产单元序号
     */
    public assetUnitNo: number;

    /**
     * 投资组合序号
     */
    public portfNo: number;

    /**
     * 席位代码
     */
    public seatCode: string = "";

    /**
     * *当天是否交易
     */
    public trade: string = "";
    /**
     * 产品序号
     */
    public fundNo: number;
    /**
     * 产品代码
     */
    public fundCode: number;
    /**
     * 产品名称
     */
    public fundName: string = "";
}
export class ProdSeatDicVO {
    public tradeTypes: DicRepVO[] = [];
    public marketTypes: DicRepVO[] = [];
}
