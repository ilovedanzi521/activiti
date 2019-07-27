<template>
    <el-dialog title="新增公司" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="420px">
        <win_form :inline="true" :model="compan" :rules="rules" ref="compan">
            <div>
                <win_form_item label="公司全称" prop="companyName">
                    <win_input placeholder="请填写公司全称" v-model="compan.companyName" :maxlength="50" v-focus></win_input>
                    <!-- <span class="must">*</span> -->
                </win_form_item>
            </div>
            <div>
                <win_form_item label="公司简称" prop="companySimpleName">
                    <win_input placeholder="请填写公司简称" v-model="compan.companySimpleName" :maxlength="50"></win_input>
                    <!-- <span class="must">*</span> -->
                </win_form_item>
            </div>
            <div>
                <win_form_item label="公司编号" prop="companyCode">
                    <win_input placeholder="请填写公司编号" v-model="compan.companyCode" :maxlength="5"></win_input>
                    <!-- <span class="must">*</span> -->
                </win_form_item>
            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="handleAddCom('compan')">确 认</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { win_fdialog } from "@win-frond-frameworks/biz-common";
import { win_button } from "@win-frond-frameworks/biz-common";
import { win_form, win_form_item } from "@win-frond-frameworks/biz-common";
import { win_tabs, win_tab } from "@win-frond-frameworks/biz-common";
import { win_select, win_option } from "@win-frond-frameworks/biz-common";
import { win_input } from "@win-frond-frameworks/biz-common";
import { win_table, win_table_column } from "@win-frond-frameworks/biz-common";
import {
    win_checkbox,
    win_checkboxButton,
    win_checkboxGroup
} from "@win-frond-frameworks/biz-common";
import { CompanyClass, UserReqVO } from "../vo/UserVO";

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
        win_button,
        win_table,
        win_table_column,
        win_checkbox,
        win_checkboxButton,
        win_checkboxGroup
    }
})
export default class AddCome extends Vue {
    dialogFormVisible: boolean = true;
    startX;
    startY;
    isDrag: Boolean = false;
    style = {
        position: "absolute",
        left: "400px",
        top: "20px",
        width: "422px",
        height: "665px",
        overflow: "hidden",
        cursor: "move"
    };
    $ref;
    rules = {
        companyName: [
            { required: true, message: "请输入公司全称", trigger: "blur" }
        ],
        companySimpleName: [
            { required: true, message: "请输入公司全称", trigger: "blur" }
        ],
        companyCode: [
            { required: true, message: "请输入公司编码", trigger: "blur" }
        ]
    };

    @Prop()
    userReqVo: UserReqVO;
    compan: CompanyClass = new CompanyClass();

    handleAddCom(formName) {
        const comParams = {
            companyFullName: this.compan.companyName,
            companySimpleName: this.compan.companySimpleName,
            companyCode: this.compan.companyCode
        };

        this.$emit("addCom", comParams);
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }
}
</script>
<style lang="scss" scoped>
.must {
    position: absolute;
    top: 0;
    left: 0;
    color: #ff4d4d;
    margin: -4px -9px;
}
</style>