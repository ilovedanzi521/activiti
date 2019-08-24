<template>
    <div class="ProductTabs">
        <win-tabs class="second-tabs" v-model="activeName">
            <win-tab-pane label="资产单元" name="first">
                <ProdAssetUnit v-if="activeName === 'first'"></ProdAssetUnit>
            </win-tab-pane>
            <win-tab-pane label="组合" name="second">
                <ProdPortfolio v-if="activeName === 'second'"></ProdPortfolio>
            </win-tab-pane>
            <win-tab-pane label="托管账户" name="third">
                <ProdEscrowAccountInfo v-if="activeName === 'third'"></ProdEscrowAccountInfo>
            </win-tab-pane>
            <win-tab-pane label="结算账户" name="fourth">
                <ProdSettlementAccount v-if="activeName === 'fourth'"></ProdSettlementAccount>
            </win-tab-pane>
            <win-tab-pane label="券商资金账户" name="fifth">
                <ProdCapitalAccount v-if="activeName === 'fifth'"></ProdCapitalAccount>
            </win-tab-pane>
            <win-tab-pane label="股东账户" name="sixth">
                <ProdStockholder v-if="activeName === 'sixth'"></ProdStockholder>
            </win-tab-pane>
            <win-tab-pane label="席位" name="seventh">
                <ProdSeat v-if="activeName === 'seventh'"></ProdSeat>
            </win-tab-pane>
        </win-tabs>
    </div>
</template>
<script lang="ts">
import ProductTabsController from "../controller/ProductTabsController";
import Component from "vue-class-component";

@Component
export default class ProductTabs extends ProductTabsController {}
</script>
<style lang="scss" scoped>
</style>