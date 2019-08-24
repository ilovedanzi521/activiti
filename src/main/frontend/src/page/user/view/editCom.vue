<template>
    <div class="mask">
        <win-fdialog :title="this.userReqVo.stateController.switchCompany?'删除公司':'修改公司'" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="460px" v-win-dialogDrag>
            <win-form :inline="true" :model="company" :rules="rules" ref="company">
                <div>
                    <win-form-item label="公司全称" prop="companyFullName">
                        <win-input v-model="company['companyFullName']" v-if="this.userReqVo.stateController.switchCompany" :disabled="true"></win-input>
                        <win-input v-model="company['companyFullName']" v-else></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="公司简称" prop="companySimpleName">
                        <win-input v-if="this.userReqVo.stateController.switchCompany" placeholder="请填写公司简称" v-model="company['companySimpleName']" :disabled="true"></win-input>
                        <win-input v-else placeholder="请填写公司简称" v-model="company['companySimpleName']"></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="公司编号" prop="companyCode">
                        <win-input placeholder="请填写公司编号" v-model="company.companyCode" v-if="this.userReqVo.stateController.switchCompany" :disabled="true"></win-input>
                        <win-input placeholder="请填写公司编号" v-model="company.companyCode" v-else :disabled="true"></win-input>
                    </win-form-item>
                </div>
            </win-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="handleDeleteCom" v-if="this.userReqVo.stateController.switchCompany">确 认</el-button>
                <el-button type="primary" @click="handleEditCom('company')" v-else>确 认</el-button>
            </div>
        </win-fdialog>
    </div>
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
// import { Company } from "../vo/UserVO";
import { UserReqVO } from "../vo/UserVO";
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
export default class FromDialog extends Vue {
    dialogFormVisible: boolean = true;
    company = {
        companyFullName: "",
        companySimpleName: "",
        companyCode: ""
    };
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

    handleEditCom(formName) {
        let form: any = this.$refs[formName];
        form.validate((valid: boolean) => {
            if (valid) {
                const comParams = {
                    id: this.userReqVo.company.companyId,
                    companyFullName: this.company["companyFullName"],
                    companySimpleName: this.company["companySimpleName"],
                    companyCode: this.company["companyCode"]
                };
                this.emitEdit(comParams);
            } else {
                return false;
            }
        });
    }

    @Emit("editCom")
    emitEdit(comParams) {
        return comParams;
    }

    handleDeleteCom() {
        const comParams = {
            id: this.userReqVo.company.companyId
        };

        this.$emit("deletetCom", comParams);
    }

    mounted() {
        this.company["companyFullName"] = this.userReqVo.company.companyName;
        console.log(this.company["companyFullName"]);
        this.company[
            "companySimpleName"
        ] = this.userReqVo.company.companySimpleName;
        this.company["companyCode"] = this.userReqVo.company.companyCode;
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }
}
</script>
<style lang="scss" scoped>
</style>