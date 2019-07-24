<template>
    <div class="ProdConsignorTabs">
        <el-tabs v-model="activeName">
            <el-tab-pane label="委托人" name="first">
                <ProdConsignor v-if="activeName === 'first'"> </ProdConsignor>
            </el-tab-pane>
            <el-tab-pane label="二级委托人" name="second">
                <ProdSubConsignor v-if="activeName === 'second'"></ProdSubConsignor>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts">
import ProdConsignorTabsController from "../controller/ProdConsignorTabsController";
import Component from "vue-class-component";

@Component
export default class ProdConsignorTabs extends ProdConsignorTabsController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
</style>