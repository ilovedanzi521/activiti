<template>
    <div class="ProdConsignorTabs">
        <win-tabs class="second-tabs" v-model="activeName">
            <win-tab-pane label="委托人" name="first">
                <ProdConsignor v-if="activeName === 'first'"> </ProdConsignor>
            </win-tab-pane>
            <win-tab-pane label="二级委托人" name="second">
                <ProdSubConsignor v-if="activeName === 'second'"></ProdSubConsignor>
            </win-tab-pane>
        </win-tabs>
    </div>
</template>
<script lang="ts">
import ProdConsignorTabsController from "../controller/ProdConsignorTabsController";
import Component from "vue-class-component";

@Component
export default class ProdConsignorTabs extends ProdConsignorTabsController {}
</script>
<style lang="scss" scoped>
</style>