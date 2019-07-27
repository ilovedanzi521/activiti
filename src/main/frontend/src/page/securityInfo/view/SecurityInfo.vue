<template>
  <div>
    <el-tabs v-model="radioSecurity" @tab-click="changeItem" tab-position="left">
      <el-tab-pane :label="item.label" v-for="item in classifications" :key="item.name" :name="item.name"></el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </div>

</template>
<script lang="ts">
import SecurityInfoController from "../controller/SecurityInfoController";
export default class SecurityInfo extends SecurityInfoController {}
</script>
<style lang="scss" scoped>
</style>