<template>
    <div class="ps1">
        <div class="fl">
            <ul>
                <li>
                    <div class="fl">
                        <span>证券类别:</span>
                        <input v-model="directionReqVO.transactionDirection">
                    </div>
                    <div class="fr">
                        <span>资产类别:</span>
                        <input v-model="directionReqVO.securitiesPath">
                    </div>
                </li>
                <li>
                    <div class="fl">
                        <span>申报单位:</span>
                        <input v-model="directionReqVO.fundsPath">
                    </div>
                    <div class="fr">
                        <span>资金冻结方式:</span>
                        <input v-model="directionReqVO.transactionDirection">
                    </div>
                    <div class="fr">
                        <TButton @bClick="querySecurityType">查询</TButton>
                    </div>
                </li>
            </ul>
        </div>
        <div class=".ps2">
            <TTable>
                <tr slot="tableHeader">
                    <td>交易市场</td>
                    <td>交易平台</td>
                    <td>市场类型</td>
                    <td>证券类别</td>
                    <td>证券类别名称</td>
                    <td>资产类别</td>
                    <td>面值</td>
                    <td>证券类别单位</td>
                    <td>每手数量</td>
                    <td>买入最小数量</td>
                    <td>买入最大数量</td>
                    <td>买入变动单位数量</td>
                    <td>卖出最小数量</td>
                    <td>卖出最大数量</td>
                    <td>卖出变动单位数量</td>
                    <td>数量最小单位</td>
                    <td>买入最小金额</td>
                    <td>买入最大金额</td>
                    <td>卖出最小金额</td>
                    <td>卖出最大金额</td>
                    <td>申报单位</td>
                    <td>交易方向权限</td>
                    <td>资金冻结方式</td>
                    <td>买卖最小数量控制方式</td>
                </tr>
                <tr slot="tableBody" v-for="item in typeReqList" :key="item.id">
                    <td>{{item.marketCode}}</td>
                    <td>{{item.platformCode}}</td>
                    <td>{{item.marketType}}</td>
                    <td>{{item.securityType}}</td>
                    <td>{{item.securityTypeName}}</td>
                    <td>{{item.assetType}}</td>
                    <td>{{item.parValue}}</td>
                    <td>{{item.securityTypeUnit}}</td>
                    <td>{{item.boardNumber}}</td>
                    <td>{{item.buyMinNumber}}</td>
                    <td>{{item.buyMaxNumber}}</td>
                    <td>{{item.buyEventNumber}}</td>
                    <td>{{item.saleMinNumber}}</td>
                    <td>{{item.saleMaxNumber}}</td>
                    <td>{{item.saleEventNumber}}</td>
                    <td>{{item.minNumberUnit}}</td>
                    <td>{{item.buyMinAmount}}</td>
                    <td>{{item.buyMaxAmount}}</td>
                    <td>{{item.declarationUnit}}</td>
                    <td>{{item.relationEffectSecurities}}</td>
                    <td>{{item.relationEffectSecurities}}</td>
                    <td>{{item.directionList}}</td>
                    <td>{{item.blockFundsType}}</td>
                    <td>{{item.minControlType}}</td>
                </tr>
            </TTable>
        </div>
    </div>
</template>
<script lang="ts">
import MarketController from "../controller/MarketController";
import Component from "vue-class-component";

@Component
export default class ParamTransactionDirection extends MarketController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";

.ps1 {
    position: absolute;
    left: 0%;
    top: 0px;
    width: 100%;
    input {
        @include iuputUi();
        display: inline-block;
        vertical-align: middle;
    }

    span {
        display: inline-block;
        width: 80px;
        text-align: left;
        vertical-align: middle;
        color: #fff;
    }
}

li {
    width: 80%;
    margin-bottom: 32px;
    overflow: hidden;
    .fl {
        float: left;
    }
    .fr {
        float: left;
        margin-left: 30px;
    }
}
</style>