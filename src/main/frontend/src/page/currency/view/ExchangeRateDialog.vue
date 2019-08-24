<template>
    <win-fdialog :title="dialogVO.title" :visible.sync="dialogVO.visible" width="780px" :close-on-click-modal="dialogVO.closeOnClickModal" :before-close="closeFormDialog">
        <win-form :inline="true" :model="rateVO" :rules="rules" ref="exchangeForm" :disabled="dialogVO.disableFlag">
            <div class="form_content">
                <win-form-item label="源币种" prop="sourceCurrencyCode">
                    <win-select v-model="rateVO.sourceCurrencyCode" placeholder="请选择" :disabled="dialogVO.action === 2" @visible-change="HandlehideSource($event)">
                        <win-option v-for="item in repCurrencyVOs" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode" @click.native="handleSelectSource"></win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="目标币种" prop="targetCurrencyCode">
                    <win-select v-model="rateVO.targetCurrencyCode" placeholder="请选择" :disabled="dialogVO.action === 2" @visible-change="HandlehideTarget($event)">
                        <win-option v-for="item in repCurrencyVOs" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode" @click.native="handleSelectTarget"></win-option>
                    </win-select>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="现钞买入价" prop="cashBuyPrice">
                    <win-input suffix-icon="xxxx" v-model="rateVO.cashBuyPrice"></win-input>
                </win-form-item>
                <win-form-item label="现钞卖出价" prop="cashSellPrice">
                    <win-input suffix-icon="xxxx" v-model="rateVO.cashSellPrice"></win-input>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="现汇买入价" prop="exchangeBuyPrice">
                    <win-input suffix-icon="xxxx" v-model="rateVO.exchangeBuyPrice"></win-input>
                </win-form-item>
                <win-form-item label="现汇卖出价" prop="exchangeSellPrice">
                    <win-input suffix-icon="xxxx" v-model="rateVO.exchangeSellPrice"></win-input>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="中间价" prop="middlePrice">
                    <win-input suffix-icon="xxxx" v-model="rateVO.middlePrice"></win-input>
                </win-form-item>

                <win-form-item label="日期" prop="editDate">
                    <win-date-picker v-model="rateVO.editDate" type="date" placeholder="选择日期" :disabled="dialogVO.action === 2"></win-date-picker>
                </win-form-item>
            </div>
        </win-form>
        <span slot="footer" class="dialog-footer">
            <win-button @click="closeFormDialog()" type="default">取消</win-button>
            <win-button v-if="dialogVO.action === 1" @click="addExchangeRate('exchangeForm')" type="primary">确认</win-button>
            <win-button v-else-if="dialogVO.action === 2" @click="updateExchangeRate('exchangeForm')" type="primary">确认</win-button>
            <win-button v-else @click="deleteExchangeRate('exchangeForm')" type="primary">确认</win-button>
        </span>
    </win-fdialog>
</template>
<script lang="ts">
import ExchangeRateDialogController from "../controller/ExchangeRateDialogController";
import Component from "vue-class-component";
export default class ExchangeRateView extends ExchangeRateDialogController {}
</script>
<style lang="scss" scoped>
</style>
