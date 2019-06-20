<template>
    <div class="pannel-container">
        <!---tabs组件--->
        <div :style="{'width':'180px','position':'absolute','text-align':'center',}">
            <win_menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#353f58"
                text-color="#fff"
                active-text-color="#FF900D"
            >
                <win_Menu_item index="2">
                    <span slot="title">导航二</span>
                </win_Menu_item>
                <win_Menu_item index="1">
                    <span slot="title">导航一</span>
                </win_Menu_item>
            </win_menu>
        </div>
        <!---formdialog组件--->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { win_fdialog } from "../../../components/win-fdialog";
import { win_button } from "../../../components/win-button";
import { win_dialog } from "../../../components/win-dialog";
import { win_form, win_form_item } from "../../../components/win-form";
import { win_tabs, win_tab } from "../../../components/win-tabs";
import { win_select, win_option } from "../../../components/win-select";
import { win_input } from "../../../components/win-input";
import { win_table, win_table_column } from "../../../components/win-table";
import { win_pagination } from "../../../components/win-pagination";
import { win_switch } from "../../../components/win-switch";
import { win_tree } from "../../../components/win-tree";
import { win_menu, win_menu_item } from "../../../components/win-menu.ts";
import {
    win_checkbox,
    win_checkboxButton,
    win_checkboxGroup
} from "../../../components/win_checkbox";

@Component({
    components: {
        win_tabs,
        win_tab,
        win_select,
        win_option,
        win_input,
        win_form,
        win_form_item,
        win_fdialog,
        win_dialog,
        win_button,
        win_table,
        win_table_column,
        win_pagination,
        win_switch,
        win_tree,
        win_checkbox,
        win_checkboxButton,
        win_checkboxGroup,
        win_menu,
        win_menu_item
    }
})
export default class Panel extends Vue {
    activeName: string = "first";
    centerDialogVisible: boolean = true;
    dialogFormVisible: boolean = true;
    checkList: string[] = ["选中且禁用", "复选框 A"];
    data: any[] = [
        {
            id: 1,
            label: "A-赢和基金管理公司",
            children: [
                {
                    id: 4,
                    label: "A1-固收投资部",
                    children: [
                        {
                            id: 9,
                            label: "投资总监"
                        },
                        {
                            id: 10,
                            label: "投资总监"
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            label: "一级 2",
            children: [
                {
                    id: 5,
                    label: "二级 2-1"
                },
                {
                    id: 6,
                    label: "二级 2-2"
                }
            ]
        },
        {
            id: 3,
            label: "一级 3",
            children: [
                {
                    id: 7,
                    label: "二级 3-1"
                },
                {
                    id: 8,
                    label: "二级 3-2"
                }
            ]
        }
    ];

    tableData: any[] = [
        {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
        },
        {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
        }
    ];
    defaultProps = {
        children: "children",
        label: "label"
    };
}
</script>
<style lang="scss" scoped>
</style>