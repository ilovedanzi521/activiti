package com.win.dfas.vo.response;

/**
 * 包名称：com.win.dfas.vo.response
 * 类名称：SelectorItem
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/20/9:03
 */
public enum SelectorItemEnum {

   FLW ("flowTypeItems"),
    // 产品
   PRO("productItems"),
    // 投资单位
    COM("investCompanyItems"),
    // 组合资产
    CON("investConstituteItems"),
     // 指令类型
    INS("instructionTypeItems"),
    // 交易市场
    MAK("marketItems"),
    //证券类型
    SEC("securityTypeItems"),
    // 交易方向
    TRN("transactionDirectionItems");

    private String value;

    SelectorItemEnum(String value)
    {
        this.value = value;
    }

    public String getValue()
    {
        return value;
    }
    }
