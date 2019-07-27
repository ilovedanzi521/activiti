<template>
    <div class="ProdConsignorTabs">
        <win_tabs class="second-tabs" v-model="activeName">
            <win_tab label="委托人" name="first">
                <ProdConsignor v-if="activeName === 'first'"> </ProdConsignor>
            </win_tab>
            <win_tab label="二级委托人" name="second">
                <ProdSubConsignor v-if="activeName === 'second'"></ProdSubConsignor>
            </win_tab>
        </win_tabs>
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