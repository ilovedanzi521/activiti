import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ParamFlowClassReqVO extends BaseReqVO {
    /**
     * 流程名称
     */
    flowName: string = "";
    /**
     * 流程类型
     */
    flowType: string = "";
    /**
     * 产品
     */
    productCode: string = "";
    /**
     * 投资单位
     */
    investCompany: string = "";
    /**
     * 组合资产
     */
    investConstitute: string = "";
    /**
     * 指令类型
     */
    instructionType: string = "";
}
