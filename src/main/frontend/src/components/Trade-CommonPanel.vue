/* @panel组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>
    <section class="panel-container">
        <!-- <div class="panel-header">
         <span>资产净值走势图</span>
         <i class="icon-2"></i>
        </div>-->
        <div class="hr1"></div>
        <div class="hr2"></div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class CommonPanel extends Vue {}
</script>
<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.panel-container {
    float: left;
    position: relative;
    width: 456px;
    height: 390px;
    margin: 0 10px 12px 0;
    border-radius: 11px;
    border: 2px dotted #68718e;
    box-sizing: border-box;
    overflow: hidden;
    background: #1f2640;
    cursor: pointer;
    .hr2 {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -10px;
        margin-top: -60px;
        width: 20px;
        height: 120px;
        background: #68718e;
    }
    .hr1 {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -60px;
        margin-top: -10px;
        width: 120px;
        height: 20px;
        background: #68718e;
    }
}
</style>
