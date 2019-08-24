import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
import { DynamicSelectItemVO } from "../vo/SelectItemVO";
export class ParamFlowInstReqVO extends BaseReqVO {

    /**
     * 流程名称
     */
    flowName: string;
    /**
     * 流程类型
     */
    flowType: string;
    /**
     * 产品
     */
    productCode: string;
    /**
     * 投资单位
     */
    investCompany: string;
    /**
     * 组合资产
     */
    investConstitute: string;
    /**
     * 指令类型
     */
    instructionType: string;
    /**
     * 开始日期
     */
    beginDate: string;
    /**
     * 结束日期
     */
    endDate: string;
    /**
     *流程组id
     */
    flowCode: number;
    /**
     * 交易市场
     */
    marketCode: string;
    /**
     * 证券类型
     */
    securityType: string;
    /**
     * 交易方向
     */
    transactionDirection: string;
}

/*流程实例列表返回响应*/
export class ParamFlowInstRepVO extends BaseReqVO {
    /**
     * 流程名称
     */
    flowName: string;
    /**
     * 流程类型
     */
    flowType: string;
    /**
     * 产品
     */
    productCode: string;
    /**
     * 投资单位
     */
    investCompany: string;
    /**
     * 组合资产
     */
    investConstitute: string;
    /**
     * 指令类型
     */
    instructionType: string;
    /**
     * 交易市场
     */
    marketCode: string;
    /**
     * 证券类型
     */
    securityType: string;
    /**
     * 交易方向
     */
    transactionDirection: string;
    /**
     * 流程id
     */
    modelId: string;
    /**
     * 开始日期
     */
    beginDate: string;
    /**
     * 结束日期
     */
    endDate: string;
    /**
     *流程组id
     */
    flowCode: number;

    /**
     * 启动标志
     */
    startFlag: boolean = false;

    /**
     * 发布id
     */
    eploymentId: string;

    /**
     * 流程定义id
     */
    processDefId: string;

    /**
     *控制类型
     */
    controlType: string;

    timeArray: Date[] = [];
}
