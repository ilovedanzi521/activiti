<template>
    <div class="container">
        <div class="left">
            <!--币种列表-->
            <win_menu v-for="currency in repCurrencyVOs" :key="currency.id">
                <win_menu_item :class="{ select: currency.currencyCode === reqVO.sourceCurrencyCode }" v-on:click="queryExchangeRate(currency.currencyCode)">{{currency.currencyName}} {{currency.currencyCode}}</win_menu_item>
            </win_menu>
        </div>
        <div class="right">
            <!--汇率查询表单-->
            <win_form :inline="true" class="form">
                <div class="form_content">
                    <el-button round @click="openAddDialog('exchangeForm')" icon="el-icon-plus" class="iconAddbutton">新增</el-button>
                    <win_form_item label="日期">
                        <win_date_picker v-model="timeArray" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></win_date_picker>
                    </win_form_item>
                    <win_form_item label="目标币种">
                        <win_select v-model="reqVO.targetCurrencyCodes" multiple placeholder="请选择">
                            <win_option v-for="item in selectCurrencys" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item>
                        <win_button @click="queryExchangeRate()" type="primary">查询</win_button>
                        <win_button @click="reset()" type="default">重置</win_button>
                    </win_form_item>
                </div>
            </win_form>
            <div style="padding:0 50px">
                <!--汇率列表-->
                <win_table :data="pageVO.list" :showSelection="false" :showIndex="false">
                    <win_table_column width="170" prop="sourceCurrencyCode" :formatter="currencyFormatter" label="源币种" sortable></win_table_column>
                    <win_table_column width="170" prop="targetCurrencyCode" :formatter="currencyFormatter" label="目标币种" sortable></win_table_column>
                    <win_table_column width="170" prop="cashBuyPrice" :formatter="moneyFormatter" label="现钞买入价" sortable></win_table_column>
                    <win_table_column width="170" prop="cashSellPrice" :formatter="moneyFormatter" label="现钞卖出价" sortable></win_table_column>
                    <win_table_column width="170" prop="exchangeBuyPrice" :formatter="moneyFormatter" label="现汇买入价" sortable></win_table_column>
                    <win_table_column width="170" prop="exchangeSellPrice" :formatter="moneyFormatter" label="现汇卖出价" sortable></win_table_column>
                    <win_table_column width="170" prop="middlePrice" :formatter="moneyFormatter" label="中间价" sortable></win_table_column>
                    <win_table_column width="170" prop="rateDate" label="日期" sortable></win_table_column>
                    <win_table_column width="170" prop="publisherCode" label="操作">
                        <template slot-scope="scope">
                            <div class="operate">
                                <span @click="openUpdateDialog(scope.row)" style="padding:10px">
                                    <i class="icon1 el-icon-edit"></i>修改
                                </span>
                                <span @click="openDeleteDialog(scope.row)">
                                    <i class="icon2 el-icon-delete"></i>删除
                                </span>
                            </div>
                        </template>
                    </win_table_column>
                </win_table>
                <!-- 分页组件 -->
                <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>
            </div>
        </div>
        <!--新增、修改-->
        <ExchangeDialog :dialogVO="dialogVO" :rateVO="rateVO" :repCurrencyVOs="repCurrencyVOs" @queryExchangeRate="queryExchangeRate"></ExchangeDialog>
    </div>
</template>
<script lang="ts">
import ExchangeRateController from "../controller/ExchangeRateController";
import Component from "vue-class-component";
export default class Exchange extends ExchangeRateController {}
</script>
<style lang="scss" scoped>
.left {
    float: left;
    width: 11.5%;
    height: 100%;
    background: #323b54;
}

.el-menu {
    background: #323b54;
    border: none;
}
.el-menu-item {
    color: #adb5bb;
}
.select {
    color: #f58a0d;
    border-right: solid 3px #f58a0d;
    background: #323b54;
    outline: 0;
}
.right {
    float: left;
    width: 88.4%;
}
.form {
    padding: 5px 50px;
}

.iconAddbutton {
    background: #2b3551;
    border: none;
    color: #ffffff;
}

.icon1 {
    color: #33cc33;
}

.icon2 {
    color: #ff4d4d;
}
</style>


      