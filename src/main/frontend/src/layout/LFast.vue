/* @ 全局快速区组件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-29 10:30:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-31 09:10:32
 */

<template>
    <span class="fast-contanier">
        <i
            :class="['icon',fastItem.class] "
            v-for="(fastItem,index) in fastList "
            @contextmenu.prevent="handleOpenDelPanel(index)"
            :key="fastItem.title"
            :title="fastItem.title"
            v-dragging="{ item: fastItem, list: fastList, group: 'fastItem' }"
        >
            <span :class="['delte',{'active':index===fastIndex}]">
                <span @click="handleCloseDelPanel">关闭</span>
                <i class="icon-2" @click="handleDeleteItem(fastItem)"></i>
            </span>
            <b class="right-hr"></b>
        </i>
    </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Fast extends Vue {
    fastIndex: string = "";

    fastList: Array<any> = [
        { id: "1", class: "icon-35", title: "资产配置", path: "/" },
        { id: "2", class: "icon-28", title: "风险管理", path: "/" },
        { id: "3", class: "icon-13", title: "系统运作", path: "/" },
        { id: "4", class: "icon-9", title: "衍生品", path: "/" },
        { id: "15", class: "icon-33", title: "组合管理", path: "/" }
    ];

    mounted() {}

    /**显示元素删除窗口 */
    handleOpenDelPanel(index) {
        this.fastIndex = index;
    }
    /*删除元素动作 */
    handleDeleteItem(item) {
        this.fastIndex = "";
    }
    /*关闭删除元素窗口动作 */
    handleCloseDelPanel() {
        this.fastIndex = "";
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.fast-contanier {
    padding-left: 48px;
    position: relative;
    .icon {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        &:last-of-type {
            .right-hr {
                background: transparent;
            }
        }
        cursor: pointer;
        &:hover {
            &::before {
                color: $color-orange;
            }
        }
        .right-hr {
            display: inline-block;
            vertical-align: middle;
            height: 12px;
            width: 1px;
            margin: 0 16px;
            background: #adb5bb;
        }
    }
    .delte {
        position: absolute;
        left: -26px;
        top: 28px;
        width: 104px;
        height: 34px;
        line-height: 34px;
        padding: 0 14px 0 4px;
        color: #fff;
        text-align: left;
        border: 1px solid #cc791b;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
        z-index: 99;
        cursor: pointer;
        display: none;
        background: rgba(0, 0, 0, 1);
        &::after {
            content: "";
            position: absolute;
            top: -20px;
            left: 41px;
            height: 0;
            width: 0;
            border: 10px solid transparent;
            border-bottom-color: rgba(0, 0, 0, 1);
        }
        &::before {
            content: "";
            position: absolute;
            top: -24px;
            left: 39px;
            height: 0;
            width: 0;
            border: 12px solid transparent;
            border-bottom-color: #cc791b;
        }
        .icon-2 {
            position: relative;
            left: 36px;
        }
        &.active {
            display: inline;
        }
    }
}
</style>