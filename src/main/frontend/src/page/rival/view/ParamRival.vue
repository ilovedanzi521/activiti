<template>
  <div class="container">
    <div class="main">
      <div class="main-header" style="margin-bottom:0px;">
        <ParamRivalInfo> </ParamRivalInfo>
      </div>
      <div ref="mainHeader" style="height:21px;">
        <win_row type="flex" style="" justify="center" align="middle">
          <win_col style="text-align:center;background-color:#273049;">
            <el-button type="text" :icon="isShowClass" @click="showMore" style="color:#FF900D;padding: 0px 10px;" round>关联信息</el-button>
          </win_col>
        </win_row>
      </div>
      <div div class="ps1" v-show="isTabsDisabled" style="overflow:hidden;">
        <ParamRivalTabs></ParamRivalTabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ParamRivalController from "../controller/ParamRivalController";
@Component({ components: {} })
export default class ParamRival extends ParamRivalController {}
</script>
<style lang="scss" scoped>
.container {
  flex-flow: row nowrap;
  flex: 1;
  flex-basis: auto;
  height: 98%;
  background: "";
}
.main {
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  flex-basis: auto;
  overflow: hidden;
  padding: 0 10px;
  height: 98%;

  .main-header {
    flex-grow: 1;
    height: 48%;
  }
}
.ps1 {
  height: 35%;
}
</style>