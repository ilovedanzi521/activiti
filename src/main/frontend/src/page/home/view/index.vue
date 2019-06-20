/* @首页Home路口文件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-31 01:44:49 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-31 09:55:23
 */


<template>
    <div>
        <Tab type="primary" @tabClick="handleChangeTab" :value="tabValue"></Tab>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Tab from "@/components/Trade-Tab.vue";
import Panels from "./panel.vue";

@Component({ components: { Tab, Panels } })
export default class Index extends Vue {
    tabValue: number = 0;

    handleChangeTab(index) {
        this.tabValue = index;
    }
}
</script>
<style lang="scss" scoped>
</style>