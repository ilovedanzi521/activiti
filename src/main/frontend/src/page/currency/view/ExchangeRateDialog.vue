<template>
    <win_dialog :title="dialogVO.title" :visible.sync="dialogVO.visible" width="780px" :close-on-click-modal="dialogVO.closeOnClickModal" :before-close="closeFormDialog">
        <win_form :inline="true" :model="rateVO" :rules="rules" ref="exchangeForm" :disabled="dialogVO.disableFlag">
            <div class="form_content">
                <win_form_item label="源币种" prop="sourceCurrencyCode">
                    <win_select v-model="rateVO.sourceCurrencyCode" placeholder="请选择" :disabled="dialogVO.action === 2" @visible-change="HandlehideSource($event)">
                        <win_option v-for="item in repCurrencyVOs" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode" @click.native="handleSelectSource"></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="目标币种" prop="targetCurrencyCode">
                    <win_select v-model="rateVO.targetCurrencyCode" placeholder="请选择" :disabled="dialogVO.action === 2" @visible-change="HandlehideTarget($event)">
                        <win_option v-for="item in repCurrencyVOs" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode" @click.native="handleSelectTarget"></win_option>
                    </win_select>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="现钞买入价" prop="cashBuyPrice">
                    <win_input suffix-icon="xxxx" v-model="rateVO.cashBuyPrice"></win_input>
                </win_form_item>
                <win_form_item label="现钞卖出价" prop="cashSellPrice">
                    <win_input suffix-icon="xxxx" v-model="rateVO.cashSellPrice"></win_input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="现汇买入价" prop="exchangeBuyPrice">
                    <win_input suffix-icon="xxxx" v-model="rateVO.exchangeBuyPrice"></win_input>
                </win_form_item>
                <win_form_item label="现汇卖出价" prop="exchangeSellPrice">
                    <win_input suffix-icon="xxxx" v-model="rateVO.exchangeSellPrice"></win_input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="中间价" prop="middlePrice">
                    <win_input suffix-icon="xxxx" v-model="rateVO.middlePrice"></win_input>
                </win_form_item>

                <win_form_item label="日期" prop="editDate">
                    <win_date_picker v-model="rateVO.editDate" type="date" placeholder="选择日期" :disabled="dialogVO.action === 2"></win_date_picker>
                </win_form_item>
            </div>
        </win_form>
        <span slot="footer" class="dialog-footer">
            <win_button @click="closeFormDialog()" type="default">取消</win_button>
            <win_button v-if="dialogVO.action === 1" @click="addExchangeRate('exchangeForm')" type="primary">确认</win_button>
            <win_button v-else-if="dialogVO.action === 2" @click="updateExchangeRate('exchangeForm')" type="primary">确认</win_button>
            <win_button v-else @click="deleteExchangeRate('exchangeForm')" type="primary">确认</win_button>
        </span>
    </win_dialog>
</template>
<script lang="ts">
import ExchangeRateDialogController from "../controller/ExchangeRateDialogController";
import Component from "vue-class-component";
export default class ExchangeRateView extends ExchangeRateDialogController {}
</script>
<style lang="scss" scoped>
</style>
