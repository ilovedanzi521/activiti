<template>
    <div class="ps1">
        <div class="fl">
            <ul>
                <li>
                    <div class="fl">
                        <span>交易方向:</span>
                        <input v-model="directionReqVO.transactionDirection">
                    </div>
                    <div class="fr">
                        <span>证券方向:</span>
                        <input v-model="directionReqVO.securitiesPath">
                    </div>
                    <div class="fr">
                        <span>资金方向:</span>
                        <input v-model="directionReqVO.fundsPath">
                    </div>
                    <div class="fr">
                        <TButton @bClick="queryTransactionDirection">查询</TButton>
                    </div>
                </li>
            </ul>
        </div>
        <div class=".ps2">
            <TTable>
                <tr slot="tableHeader">
                    <td>交易市场</td>
                    <td>交易方向</td>
                    <td>交易方向名称</td>
                    <td>申报方向</td>
                    <td>资金方向</td>
                    <td>证券方向</td>
                    <td>影响证券</td>
                    <td>关联变动方向</td>
                    <td>关联影响证券</td>
                </tr>
                <tr slot="tableBody" v-for="item in directionList" :key="item.id">
                    <td>{{item.marketCode}}</td>
                    <td>{{item.transactionDirection}}</td>
                    <td>{{item.transactionDirectionName}}</td>
                    <td>{{item.declarePath}}</td>
                    <td>{{item.fundsPath}}</td>
                    <td>{{item.securitiesPath}}</td>
                    <td>{{item.effectSecurities}}</td>
                    <td>{{item.relationChangePath}}</td>
                    <td>{{item.relationEffectSecurities}}</td>
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