<template>
  <div class="ProductTabs">
    <el-tabs v-model="activeName">
      <el-tab-pane label="交易员信息" name="first">
        <ParamRivalTrader v-if="activeName === 'first'"></ParamRivalTrader>
      </el-tab-pane>
      <el-tab-pane label="托管账户信息" name="second">
        <ParamRivalBankAccount v-if="activeName === 'second'"></ParamRivalBankAccount>
      </el-tab-pane>
      <el-tab-pane label="资金账户信息" name="third">
        <ParamRivalCashAccount v-if="activeName === 'third'"></ParamRivalCashAccount>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import ParamRivalTabsController from "../controller/ParamRivalTabsController";
import Component from "vue-class-component";

@Component
export default class ParamRivalTabs extends ParamRivalTabsController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
</style>