<template>
  <div class="Bond">
    <el-tabs v-model="activeName">
      <el-tab-pane label="债券基本信息" name="first">
        <BondInfo v-if="activeName === 'first'"></BondInfo>
      </el-tab-pane>
      <el-tab-pane label="标准券折算率" name="second">
        <BondRate  v-if="activeName === 'second'"></BondRate>
      </el-tab-pane>
      <el-tab-pane label="分期还本信息" name="third">
        <BondSerial v-if="activeName === 'third'"></BondSerial>
      </el-tab-pane>
      <el-tab-pane label="利率变动信息" name="fourth">
        <BondInterestRateChange v-if="activeName === 'fourth'"></BondInterestRateChange>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import BondController from "../controller/BondController";
import Component from "vue-class-component";

@Component
export default class Bond extends BondController {}
</script>
<style lang="scss" scoped>
</style>