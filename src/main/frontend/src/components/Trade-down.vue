/* @down组件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-06-04 01:09:02 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-06-04 01:34:00
 * @prop: label:string代表有label标题
 */


<template>
    <span>
        <label class="label-title" v-if="label">{{label}}:</label>
        <div :class="['down-container',{'active': downIsOpen} ]">
            <span class="down-info" @click="handleDownIsShow">{{title}}</span>
            <div class="dowm-content" v-if="downIsOpen">
                <p
                    v-for="downItem in downList"
                    :key="downItem.title"
                    @click="handleChangeItem(downItem)"
                >{{downItem.title}}</p>
            </div>
        </div>
    </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Panel extends Vue {
    title: string = "名称";
    downIsOpen: boolean = false;
    @Prop({})
    label: string;
    @Prop({
        default() {
            return [
                { title: "首页"},
                { title: "分控管理2" },
                { title: "分控管理3" },
                { title: "分控管理4" },
                { title: "分控管理5" }
            ];
        }
    })
    downList: [];

    handleDownIsShow() {
        this.downIsOpen = true;
    }
    handleChangeItem(item) {
        console.log(1111)
        this.$emit("downClick", item);
        this.title = item.title;
        this.downIsOpen = false;
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.label-title {
    margin-right: 10px;
    color: #fff;
}
.down-container {
    position: relative;
    display: inline-block;
    width: 224px;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
    border: 1px solid #d8dce6;
    box-sizing: border-box;
    color: #909399;
    border-radius: 4px;
    cursor: pointer;
    &.active {
        &::after {
            content: "";
            position: absolute;
            right: 10px;
            top: 12px;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-left-color: $color-orange;
            border-top-color: transparent;
        }
    }
    &::after {
        content: "";
        position: absolute;
        right: 10px;
        top: 16px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-top-color: #909399;
    }
    .down-info {
        display: inline-block;
        width: 100%;
    }
    .dowm-content {
        position: absolute;
        left: 0;
        top: 50px;
        border-radius: 4px;
        width: 224px;
        border: 1px solid #fff;
        box-sizing: border-box;
        &::after {
            content: "";
            position: absolute;
            top: -16px;
            right: 10px;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom-color: #1d243e;
        }
        &::before {
            content: "";
            position: absolute;
            top: -20px;
            right: 8px;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-bottom-color: #fff;
        }
        p {
            height: 34px;
            line-height: 34px;
            color: #fff;
            padding-left: 20px;
            cursor: pointer;
            &:hover {
                color: $color-orange;
            }
        }
    }
}
</style>