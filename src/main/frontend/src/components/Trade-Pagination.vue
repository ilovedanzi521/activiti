/**
* 分页组件
*/ 
<template>
    <win_pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="childMsg.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="childMsg.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="childMsg.total"
    ></win_pagination>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { win_pagination } from "./win-pagination";

@Component({ components: { win_pagination } })
export default class Pagination extends Vue {
    @Prop({ default: "Pagination" })
    name: string;

    @Prop()
    childMsg: any;

    pageParm: any = {
        pageNum: this.childMsg.pageNum,
        pageSize: this.childMsg.pageSize
    };

    handleSizeChange(val: number) {
        this.pageParm.pageSize = val;
        this.handleCallFather(this.pageParm);
    }

    handleCurrentChange(val: number) {
        this.pageParm.pageNum = val;
        this.handleCallFather(this.pageParm);
    }

    @Emit("callFather")
    handleCallFather(pageParm: any) {}
}
</script>


<style lang="scss" scoped>
.page-box {
    margin: 10px auto;
}
</style>
