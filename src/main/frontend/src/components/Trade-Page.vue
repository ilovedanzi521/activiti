/* @page分页 组件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-06-04 09:40:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-06-04 09:58:26
 */


<template>
    <div class="pages-container">
        <span class="page-title">
            每页：
            <b class="page-number" v-if="pageisOpen">
                <i
                    v-for="number in pages"
                    :key="number"
                    @click="hangleChangePage(number)"
                >{{number}}</i>
            </b>
        </span>
        <span class="page" @click="handlePageOpen">{{currentPage}}</span>
        <span class="page-max">第{{currentPage}}页/共{{pageMax}}页</span>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Bread extends Vue {
    pageisOpen: boolean = false;
    currentPage: number = 0;
    // @Prop({ default: 0 })
    // currentPage: number;
    @Prop({ default: 10 })
    maxPage: number;
    @Prop({ default: 3 })
    setpPage: number;
    @Prop({
        default() {
            return [1, 2, 3, 4, 5, 6];
        }
    })
    pages: number[];

    hangleChangePage(number) {
        this.pageisOpen = false;
        this.currentPage = number;
        this.$emit("pageClick", number);
    }
    handlePageOpen() {
        this.pageisOpen = true;
    }
    get pageMax() {
        return this.pages.length;
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.pages-container {
    position: relative;
    font-size: $font-size4;
    color: #dcdfe6;
    text-align: center;

    > span {
        display: inline-block;
        vertical-align: middle;
        margin-right: 26px;
        cursor: pointer;
    }
    .page-title {
        position: relative;
    }
    .page-number {
        position: absolute;
        left: 67px;
        z-index: 9;
        &:last-of-type i {
            border-bottom-color: #fff;
        }
        i {
            width: 30px;
            height: 20px;
            line-height: 20px;
            display: block;
            font-size: 14px;
            color: #fff;
            border: 1px solid #fff;
            border-bottom-color: transparent;
            text-align: center;
            font-style: normal;
            cursor: pointer;
            &:hover {
                color: $color-orange;
            }
        }
    }
    .page {
        position: relative;
        padding-right: 26px;
        &:after {
            content: "";
            position: absolute;
            top: 8px;
            left: 38px;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top-color: #dcdfe6;
        }
    }
}
</style>