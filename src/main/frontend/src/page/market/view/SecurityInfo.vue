<template>
  <div>
    <el-tabs v-model="radioSecurity" @tab-click="changeItem">
      <el-tab-pane :label="item.label" v-for="item in classifications" :key="item.name" :name="item.name"></el-tab-pane>
    </el-tabs>
    <div>
      <router-view></router-view>
    </div>
  </div>

</template>
<script lang="ts">
import SecurityInfoController from "../controller/SecurityInfoController";
export default class SecurityInfo extends SecurityInfoController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
</style>