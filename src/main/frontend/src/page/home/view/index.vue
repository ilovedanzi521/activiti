/* @首页Home路口文件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-31 01:44:49 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-08 19:04:00
 */


<template>
    <div class="home-content">
        <Panels></Panels>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Panels from "./addPanel.vue";

@Component({ components: { Panels } })
export default class Index extends Vue {
    tabValue: number = 0;

    handleChangeTab(index) {
        this.tabValue = index;
    }
}
</script>
<style lang="scss" scoped>
.home-content {
    font-size: 80px;
}
</style>