/* @checkbox组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 * @props:无
 * @有callback 外部组件监听@checkClicl  返回true 表示选中，false表示未选中
 */)

<template>
    <span :class="['checkbox-container',{'active':checkBox}]" @click="handleCheck"></span>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Checkbox extends Vue {
    checkBox: boolean = false;
    handleCheck() {
        this.checkBox = !this.checkBox;
        this.$emit("checkClicl", this.checkBox);
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.checkbox-container {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #fff;
    cursor: pointer;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 14px;
        height: 14px;
        border: 1px solid #b7b7b7;
    }
    &.active {
        &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 4px;
            margin-left: -5px;
            margin-top: -4px;
            background: transparent;
            border: 1px solid transparent;
            border-left-color: #f58a0d;
            border-bottom-color: #f58a0d;
            transform: rotate(-40deg);
        }
    }
}
</style>
