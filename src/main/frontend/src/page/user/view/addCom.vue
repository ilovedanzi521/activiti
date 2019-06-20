<template>
    <div class="mask">
        <win_fdialog title="新增公司" :visible.sync="dialogFormVisible">
            <win_form :inline="true">
                <div class="form_content">
                    <win_form_item label="公司全称">
                        <win_input placeholder="请填写公司全称" v-model="companyFullName"></win_input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="公司简称">
                        <win_input placeholder="请填写公司简称" v-model="companySimpleName"></win_input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="公司编号">
                        <win_input placeholder="请填写公司编号" v-model="companyCode"></win_input>
                    </win_form_item>
                </div>
            </win_form>
            <div slot="footer" class="dialog-footer">
                <el-button>取 消</el-button>
                <el-button type="warning" @click="handleAddCom">确 认</el-button>
            </div>
        </win_fdialog>
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
        win_checkboxGroup
    }
})
export default class FromDialog extends Vue {
    dialogFormVisible: boolean = true;
    companyFullName: string = "1111";
    companySimpleName: string = "2222";
    companyCode: string = "22333";
    handleClose() {
        this.$emit("cliclClose");
    }
    handleAddCom() {
        const comParams = {
            companyFullName: this.companyFullName,
            companySimpleName: this.companySimpleName,
            companyCode: this.companyCode
        };
        this.$emit("addCom", comParams);
    }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/theme.scss";
@import "../../../assets/style/element.scss";
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    .dialogFrom-contaier {
        padding: 30px 32px;
        border: 1px solid $color-orange;
        border-radius: 4px;
        background: #494949;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            padding-bottom: 8px;
            font-size: 18px;
            color: #fff;
            font-weight: bold;
            font-weight: bolder;
            border-bottom: 2px solid #707070;
            .header-close {
                cursor: pointer;
            }
        }
        .footer {
            padding: 28px 0 0;
            margin-top: 16px;
            text-align: center;
            border-top: 2px solid #707070;
            button {
                @include button();
                &:last-of-type {
                    margin-left: 16px;
                }
                &.submit {
                    @include button($bg: #ff900d, $color: #fff);
                }
            }
        }
        .content {
            p {
                display: flex;
                margin-bottom: 16px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                span {
                    display: inline-block;
                    label,
                    input {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 4px;
                        &.input {
                            width: 220px;
                            height: 40px;
                            padding-left: 6px;
                            line-height: 40px;
                            background: #494949;
                            border: none;
                            color: #fff;
                            border: 1px solid #adb5bb;
                            border-radius: 4px;
                            box-sizing: border-box;
                        }
                        &.label {
                            color: #adb5bb;
                            font-weight: bolder;
                            margin-right: 6px;
                            position: relative;
                            width: 60px;
                            text-align: right;
                            &.required {
                                &::after {
                                    content: "*";
                                    position: absolute;
                                    color: red;
                                    right: -6px;
                                    top: -4px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>