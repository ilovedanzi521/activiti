/* @tab切换控件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-29 10:28:02 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-31 03:39:37
 * @prpps [type:(primary,primary1)切换tab样式,
    tabList:array，
    tabList列表[{title:"首页",path:"/home"},
    path:string,二级路由名称
    ]
 * @callback:  tabClick 监听获取当前切换tab的索引。返回值：当前切换tab的索引
 */

<template>
    <div :class="['tag-container' ,type]">
        <span
            v-for="(item,index) in tabList"
            :key="item.title"
            :class="{'active':value==index}"
            @click="handleChangTab(index,item)"
        >{{item.title}}</span>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

class TabItem {
    title: string;
    path: string;
}

@Component({})
export default class Tab extends Vue {
    @Prop({ default: "primary" })
    type: string;

    @Prop({
        default() {
            return [];
        }
    })
    tabList: Array<TabItem>;

    @Prop({ default: "market" })
    path: string;
    @Prop({ default: 0 })
    value: number = 0;

    handleChangTab(index, item) {
        this.$router.push({
            path: `/${this.path}/${item.path}`
        });

        this.$emit("tabClick", index);
    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/theme.scss";
.tag-container {
    position: relative;
    left: -20px;
    margin-bottom: 20px;
    display: inline-block;
    font-size: 0;
    span {
        display: inline-block;
        width: 127px;
        height: 37px;
        line-height: 37px;
        vertical-align: middle;
        text-align: center;
        font-size: $font-size4;
        color: $color-white;
        font-size: 14px;
        font-family: Microsoft YaHei;
        cursor: pointer;
    }
    &.primary {
        span {
            border-right: 1px solid $color-main;
            background: #353f58;
            &.active {
                background: $color-orange;
                border-right: 1px solid $color-orange;
            }
        }
    }
    &.primary2 {
        border-bottom: 2px solid $color-white;
        span {
            display: inline-block;
            margin-bottom: -2px;
            background: transparent;
            &.active {
                border-bottom: 2px solid $color-orange;
            }
        }
    }
}
</style>