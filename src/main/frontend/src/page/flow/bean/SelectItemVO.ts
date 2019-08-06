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
} from "../bean/SelectSources";
export class SelectItemVO {
    /**下拉框数据**/
    flowNameItems: FlowNameItems[] = [];
    // 流程类型
    flowTypeItems: FlowTypeItem[] = [];
    // 产品
    productItems: ProductItem[] = [];
    // 投资单位
    investCompanyItems: InvestCompanyItem[] = [];
    // 组合资产
    investConstituteItems: InvestConstituteItem[] = [];
    // 指令类型
    instructionTypeItems: InstructionTypeItem[] = [];
    // 交易市场
    marketItems: MarketItem[] = [];
    //证券类型
    securityTypeItems: SecurityTypeItem[] = [];
    // 交易方向
    transactionDirectionItems: TransactionDirectionItem[] = [];
    // 控制类型
    controlTypeItems: ControlTypeItem[] = [];
}
