<template>
    <div class="container">
        <div class="aside">
            <div style="background-color:#273049;width:224px;height:100%;padding-top:10px">
                <win_row type="flex" style="background-color:#0b1431;margin:0px 5px 5px;" align="middle">
                    <win_col :span="16" style="margin-right:10px">
                        <win_input placeholder="请输入内容" class="search"></win_input>
                    </win_col>
                    <win_col :span="1">
                        <span style="cursor:pointer;color:white">|</span>
                    </win_col>
                    <win_col :span="4" style="text-align:center">
                        <i style="color:white;font-size:16px;vertical-align:middle" class="el-icon-s-help"></i>
                    </win_col>
                </win_row>
                <div class="jy">交易市场</div>
                <div class="tree" style="position:relative">
                    <win_tree :data="data" node-key="id" :props="defaultProps" style="width:224px" highlight-current @node-click="handleNodeClick"></win_tree>
                </div>
            </div>
        </div>
        <div class="main">
            <div style="background-color:#444e69;margin-bottom:20px;">
                <win_row style="width:224px;background-color:#273049" type="flex" align="middle">
                    <win_col :span="16" style="margin-right:10px">
                        <win_input placeholder="请输入内容" class="search"></win_input>
                    </win_col>
                    <win_col :span="1">
                        <span style="color:white">|</span>
                    </win_col>
                    <win_col :span="4" style="text-align:center">
                        <i style="cursor:pointer;color:white;font-size:16px;vertical-align:middle" class="el-icon-s-help"></i>
                    </win_col>
                </win_row>
            </div>
            <div class="ps1">
                <win_tabs v-model="activeName" @tab-click="tabClick" v-show="tabsFlag">
                    <el-tab-pane label="市场详情" name="marketDetail"></el-tab-pane>
                    <el-tab-pane label="交易方向" name="paramTransactionDirection"></el-tab-pane>
                    <el-tab-pane label="交易规则" name="securityType"></el-tab-pane>
                    <el-tab-pane label="证券信息" name="securityInfo"></el-tab-pane>
                    <el-tab-pane label="证券行情" name="securityPriceInfo"></el-tab-pane>
                </win_tabs>
                <win_tabs v-model="activeName" @tab-click="tabClick" v-show="!tabsFlag">
                    <el-tab-pane label="交易规则" name="securityType"></el-tab-pane>
                </win_tabs>
            </div>
            <router-view v-bind:code="code" :key="code"></router-view>
        </div>
    </div>
</template>
<script lang="ts">
{
    headertitle: [];
    body: [];
}
import Vue from "vue";
import Component from "vue-class-component";
import MarketController from "../controller/MarketController";
// import { main }
@Component({ components: {} })
export default class Market extends MarketController {}
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    flex-basis: auto;
    height: 100%;
}
.main {
    flex: 1;
    flex-basis: auto;
    overflow: hidden;
    // padding: 0 10px;
}
.jy {
    position: relative;
    color: #fff;
    font-size: 16px;
    margin: 10px 0 0 20px;
}
.ps1 {
    margin-bottom: 20px;
}
.search {
    width: 100%;
}
.search /deep/ .el-input__inner {
    border: none;
}
.tree /deep/ .el-tree {
    top: 0;
}
</style>