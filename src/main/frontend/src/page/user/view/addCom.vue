<template>
    <el-dialog title="新增公司" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="420px">
        <win-form :inline="true" :model="compan" :rules="rules" ref="compan">
            <div>
                <win-form-item label="公司全称" prop="companyName">
                    <win-input placeholder="请填写公司全称" v-model="compan.companyName" :maxlength="50" v-focus></win-input>
                    <!-- <span class="must">*</span> -->
                </win-form-item>
            </div>
            <div>
                <win-form-item label="公司简称" prop="companySimpleName">
                    <win-input placeholder="请填写公司简称" v-model="compan.companySimpleName" :maxlength="50"></win-input>
                    <!-- <span class="must">*</span> -->
                </win-form-item>
            </div>
            <div>
                <win-form-item label="公司编号" prop="companyCode">
                    <win-input placeholder="请填写公司编号" v-model="compan.companyCode" :maxlength="5"></win-input>
                    <!-- <span class="must">*</span> -->
                </win-form-item>
            </div>
        </win-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="handleAddCom('compan')">确 认</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";

import { WinButton } from "@win-frond-frameworks/biz-common";
import { WinForm, WinFormItem } from "@win-frond-frameworks/biz-common";
import { WinTabs, WinTabpane } from "@win-frond-frameworks/biz-common";
import { WinSelect, WinOption } from "@win-frond-frameworks/biz-common";
import { WinInput } from "@win-frond-frameworks/biz-common";
import { WinTable, WinTableColumn } from "@win-frond-frameworks/biz-common";
import {
    WinCheckbox,
    WinCheckboxButton,
    WinCheckboxGroup
} from "@win-frond-frameworks/biz-common";
import { CompanyClass, UserReqVO } from "../vo/UserVO";

@Component({
    components: {
        WinTabs,
        WinTabpane,
        WinSelect,
        WinOption,
        WinInput,
        WinForm,
        WinFormItem,
        WinFdialog,
        WinButton,
        WinTable,
        WinTableColumn,
        WinCheckbox,
        WinCheckboxButton,
        WinCheckboxGroup
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