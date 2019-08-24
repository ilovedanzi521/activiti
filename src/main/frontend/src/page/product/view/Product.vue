<template>
    <div class="container">
        <div class="aside">
            <div style="background-color:#273049;width:224px;height:100%;padding-top:5px">
                <div class="tree" style="position:relative">
                    <win-tree :data="catalogData" node-key="id" :props="defaultProps" style="{width:224px}" highlight-current @node-click="handleNodeClick">
                    </win-tree>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="main-header" style="margin-bottom:0px;">
                <ProductInfo> </ProductInfo>
            </div>
            <div ref="mainHeader" style="background-color:#273049;height:20px;">
                <win-row type="flex" style="" justify="center" align="middle">
                    <win-col style="text-align:center;">
                        <win-button type="text" :icon="isShowClass" @click="showMore" style="background-color:#273049;color:#FF900D;padding: 0px 10px;" round>关联信息</win-button>
                    </win-col>
                </win-row>
            </div>
            <div div class="ps1" v-show="isTabsDisabled" style="overflow:hidden;">
                <ProductTabs></ProductTabs>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ProductController from "../controller/ProductController";
@Component({ components: {} })
export default class Product extends ProductController {}
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    flex-basis: auto;
    height: 830px;
}
.main {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    flex-basis: auto;
    overflow: hidden;
    padding: 0 10px;
    height: 830px;

    .main-header {
        flex-grow: 1;
        height: 480px;
    }
}
.ps1 {
    height: 350px;
}
.tree /deep/ .el-tree {
    top: 0;
}
</style>