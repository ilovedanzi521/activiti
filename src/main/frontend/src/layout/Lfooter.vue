/* @全局底部组件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-31 00:48:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-31 00:55:27
 */


<template>
    <footer class="footer-container">
        <span class="transaction-time">交易日期 ：2019-05-22 星期三</span>
    </footer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.footer-container {
    position: absolute;
    bottom: 0;
    height: 22px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 16px;
    background: $color-footer-bg;
    .transaction-time {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color: $color-font6;
    }
}
</style>