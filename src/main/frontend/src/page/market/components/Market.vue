<template>
    <div>
        <div>
            <div>
                <win_input placeholder="请输入内容"></win_input>
                <span>交易市场</span>
                <win_tree :data="data" node-key="id" :props="defaultProps"></win_tree>
            </div>
            <div class="ps1">
                <win_tabs v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane label="市场详情" name="marketDetail"></el-tab-pane>
                    <el-tab-pane label="交易方向" name="paramTransactionDirection"></el-tab-pane>
                    <el-tab-pane label="证券类别" name="securityType"></el-tab-pane>
                    <el-tab-pane label="证券信息" name="fourth"></el-tab-pane>
                    <el-tab-pane label="证券行情" name="five"></el-tab-pane>
                </win_tabs>
            </div>
        </div>
        <div>
            <div div class="ps2">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
{
    headertitle: [];
    body: [];
}
import Vue from "vue";
import Component from "vue-class-component";
import Tab from "@/page/market/components/Market-Tab.vue";
import Table from "@/components/Trade-Table.vue";
import { win_tree } from "../../../components/win-tree";
import { win_input } from "../../../components/win-input";
import { win_tabs, win_tab } from "../../../components/win-tabs";
@Component({
    components: { Tab, Table, win_tree, win_input, win_tabs, win_tab }
})
export default class Market extends Vue {
    activeName: string = "marketDetail";
    data = [
        {
            label: "一级 1",
            children: [
                {
                    label: "二级 1-1",
                    children: [
                        {
                            label: "三级 1-1-1"
                        }
                    ]
                }
            ]
        },
        {
            label: "一级 2",
            children: [
                {
                    label: "二级 2-1",
                    children: [
                        {
                            label: "三级 2-1-1"
                        }
                    ]
                },
                {
                    label: "二级 2-2",
                    children: [
                        {
                            label: "三级 2-2-1"
                        }
                    ]
                }
            ]
        },
        {
            label: "一级 3",
            children: [
                {
                    label: "二级 3-1",
                    children: [
                        {
                            label: "三级 3-1-1"
                        }
                    ]
                },
                {
                    label: "二级 3-2",
                    children: [
                        {
                            label: "三级 3-2-1"
                        }
                    ]
                }
            ]
        }
    ];
    defaultProps = {
        children: "children",
        label: "label"
    };
    tabClick() {
        this.$router.push({
            path: `/market/${this.activeName}`
        });
    }
    mounted() {
        this.activeName = this.$route.name;
    }
}
</script>
<style lang="scss" scoped>
.ps1 {
    position: absolute;
    left: 16%;
    top: 1px;
    width: 100%;
}
.ps2 {
    position: absolute;
    left: 13%;
    top: 15%;
    width: 100%;
}
</style>