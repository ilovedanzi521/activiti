/* @全局main组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */
<template>
    <section class="main-container">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Main extends Vue {}
</script>
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.main-container {
    position: absolute;
    left: 70px;
    right: 0;
    top: 48px;
    bottom: 0;
    background: $color-main2;
    padding: 0 0 0 0;
    overflow: hidden;
    box-sizing: border-box;
}
</style>
