import {
    FlowNameItems,
    FlowTypeItem,
    InstructionTypeItem,
    InvestCompanyItem,
    InvestConstituteItem,
    MarketItem,
    ProductItem,
    SecurityTypeItem,
    TransactionDirectionItem,
    ControlTypeItem
} from ".//SelectSources";

/**
 * 静态下拉
 */
export class StaticSelectItemVO {
    /**下拉框数据**/
    flowNameItems: FlowNameItems[] = [];
    // 流程类型
    flowTypeItems: FlowTypeItem[] = [];
    // 产品
    productItems: ProductItem[] = [];
    // 指令类型
    instructionTypeItems: InstructionTypeItem[] = [];
    // 交易市场
    marketItems: MarketItem[] = [];
    // 控制类型
    controlTypeItems: ControlTypeItem[] = [];

}

/**
 * D动态下拉
 */
export class DynamicSelectItemVO {
    // 投资单位
    investCompanyItems: InvestCompanyItem[] = [];
    // 组合资产
    investConstituteItems: InvestConstituteItem[] = [];
    //证券类型
    securityTypeItems: SecurityTypeItem[] = [];
    // 交易方向
    transactionDirectionItems: TransactionDirectionItem[] = [];
}
