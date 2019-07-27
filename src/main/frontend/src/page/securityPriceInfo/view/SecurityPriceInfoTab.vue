<template>
  <div style="margin-top:10px">

    <el-tabs v-model="activeName" tab-position="left">
      <el-tab-pane label="证券基础行情" name="first">
        <SecurityPriceInfo v-if="activeName === 'first'"></SecurityPriceInfo>
      </el-tab-pane>
      <el-tab-pane label="投资基金净值" name="second">
        <fundValue v-if="activeName === 'second'"></fundValue>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script lang="ts">
import SecurityPriceInfoTabController from "../controller/SecurityPriceInfoTabController";
import Component from "vue-class-component";

@Component
export default class priceInfoTab extends SecurityPriceInfoTabController {}
</script>
<style lang="scss" scoped>
span {
  display: inline-block;
  width: 80px;
  text-align: left;
  vertical-align: middle;
  color: #fff;
}
</style>