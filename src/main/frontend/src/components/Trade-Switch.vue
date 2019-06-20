/* @Switch组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 * @props:无
 * @有callback 外部组件监听@switchClicl  返回true 表示选中，false表示未选中
 */)

<template>
    <span :class="['switch-container',{'active':switchBox}]" @click="handleCheck"></span>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Checkbox extends Vue {
    switchBox: boolean = false;
    handleCheck() {
        this.switchBox = !this.switchBox;
        this.$emit("switchClicl", this.switchBox);
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.switch-container {
    position: relative;
    display: inline-block;
    width: 25px;
    height: 15px;
    border-radius: 36px;
    background: #99a59b;
    transition: 0.2s all linear;
    cursor: pointer;
    &.active {
        background: #4dd865;

        &::after {
            content: "";
            position: absolute;
            width: 14px;
            height: 14px;
            background: #fff;
            border-radius: 50%;
            left: 50%;
            top: 0;
        }
    }
    &::after {
        content: "";
        position: absolute;
        width: 14px;
        height: 14px;
        background: #fff;
        border-radius: 50%;
        left: 0;
        top: 0;
        transition: 0.2s all linear;
    }
}
</style>
