<template>
    <div class="container">
        <div class="left">
            <!--币种列表-->
            <win_menu v-for="currency in repCurrencyVOs" :key="currency.id">
                <win_menu_item
                    v-on:click="queryExchangeRate(currency.currencyCode)"
                >{{currency.currencyName}} {{currency.currencyCode}}</win_menu_item>
            </win_menu>
        </div>
        <div class="right">
            <!--汇率查询表单-->
            <win_form :inline="true" class="form">
                <div class="form_content">
                    <el-button
                        round
                        @click="openAddDialog('exchangeForm')"
                        icon="el-icon-plus"
                        class="iconAddbutton"
                    >新增</el-button>
                    <win_form_item label="日期">
                        <el-date-picker
                            v-model="timeArray"
                            value-format="yyyy-MM-dd"
                            v-on:change="setFormTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </win_form_item>
                    <win_form_item label="目标币种">
                        <el-select v-model="reqVO.targetCurrencyCode" placeholder="请选择">
                            <el-option
                                v-for="item in repCurrencyVOs"
                                :key="item.currencyCode"
                                :label="item.currencyName"
                                :value="item.currencyCode"
                            ></el-option>
                        </el-select>
                    </win_form_item>
                    <win_form_item>
                        <win_button @click="queryExchangeRate()" class="yellowButton">查询</win_button>
                        <win_button @click="reset()" class="defaultButton">重置</win_button>
                    </win_form_item>
                </div>
            </win_form>
            <div style="padding:50px">
                <!--汇率列表-->
                <el-table :data="pageVO.list">
                    <el-table-column
                        prop="sourceCurrencyCode"
                        :formatter="currencyFormatter"
                        label="源币种"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        prop="targetCurrencyCode"
                        :formatter="currencyFormatter"
                        label="目标币种"
                        sortable
                    ></el-table-column>
                    <el-table-column prop="cashBuyPrice" label="现钞买入价" sortable></el-table-column>
                    <el-table-column prop="cashSellPrice" label="现钞卖出价" sortable></el-table-column>
                    <el-table-column prop="exchangeBuyPrice" label="现汇买入价" sortable></el-table-column>
                    <el-table-column prop="exchangeSellPrice" label="现汇卖出价" sortable></el-table-column>
                    <el-table-column prop="middlePrice" label="中间价" sortable></el-table-column>
                    <el-table-column prop="date" label="日期" sortable></el-table-column>
                    <el-table-column prop="publisherCode" label="操作" sortable>
                        <template slot-scope="scope">
                            <div class="operate">
                                <span @click="openUpdateDialog(scope.row)">
                                    <i class="el-icon-edit"></i>修改
                                </span>
                                <span @click="openDeleteDialog(scope.row)">
                                    <i class="el-icon-delete"></i>删除
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页组件 -->
                <Pagination v-bind:child-msg="pageVO" @callFather="queryExchangeRate"></Pagination>
            </div>
        </div>
        <!--新增、修改-->
        <win_dialog :title="dialogVO.title" :visible.sync="dialogVisible" width="40%">
            <win_form
                :inline="true"
                ref="exchangeForm"
                :model="rateVO"
                :rules="rules"
                :disabled="dialogVO.disableFlag"
            >
                <div class="form_content">
                    <win_form_item label="源币种" prop="sourceCurrencyCode">
                        <el-select v-model="rateVO.sourceCurrencyCode" placeholder="请选择">
                            <el-option
                                v-for="item in repCurrencyVOs"
                                :key="item.currencyCode"
                                :label="item.currencyName"
                                :value="item.currencyCode"
                            ></el-option>
                        </el-select>
                    </win_form_item>
                    <win_form_item label="目标币种" prop="targetCurrencyCode">
                        <el-select v-model="rateVO.targetCurrencyCode" placeholder="请选择">
                            <el-option
                                v-for="item in repCurrencyVOs"
                                :key="item.currencyCode"
                                :label="item.currencyName"
                                :value="item.currencyCode"
                            ></el-option>
                        </el-select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="现钞买入价" prop="cashBuyPrice">
                        <el-input suffix-icon="xxxx" v-model="rateVO.cashBuyPrice"></el-input>
                    </win_form_item>
                    <win_form_item label="现钞卖出价" prop="cashSellPrice">
                        <el-input suffix-icon="xxxx" v-model="rateVO.cashSellPrice"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="现汇买入价" prop="exchangeBuyPrice">
                        <el-input suffix-icon="xxxx" v-model="rateVO.exchangeBuyPrice"></el-input>
                    </win_form_item>
                    <win_form_item label="现汇卖出价" prop="exchangeSellPrice">
                        <el-input suffix-icon="xxxx" v-model="rateVO.exchangeSellPrice"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content" prop="middlePrice">
                    <win_form_item label="中间价">
                        <el-input suffix-icon="xxxx" v-model="rateVO.middlePrice"></el-input>
                    </win_form_item>

                    <win_form_item label="日期" prop="date">
                        <el-date-picker
                            v-model="rateVO.date"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </win_form_item>
                </div>
            </win_form>
            <div>
                <win_button @click="closeDialog()" class="defaultButton">取消</win_button>
                <span v-if="dialogVO.action === 1">
                    <win_button @click="addExchangeRate('exchangeForm')" class="yellowButton">确认</win_button>
                </span>
                <span v-else-if="dialogVO.action === 2">
                    <win_button @click="updateExchangeRate('exchangeForm')" class="yellowButton">确认</win_button>
                </span>
                <span v-else>
                    <win_button @click="deleteExchangeRate()" class="yellowButton">确认</win_button>
                </span>
            </div>
        </win_dialog>
    </div>
</template>
<script lang="ts">
import ExchangeRateController from "../controller/ExchangeRateController";
import Component from "vue-class-component";
import ElementUI from "element-ui";
export default class Exchange extends ExchangeRateController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/page.scss";
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
.el-menu-item:focus,
.el-menu-item:hover {
    color: #f58a0d;
    border-right: solid 3px #f58a0d;
}
.right {
    float: left;
    width: 88.4%;
}
.form {
    padding: 5px 50px;
}
</style>


      