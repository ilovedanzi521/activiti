<template>
    <div class="mask">
        <win_fdialog :title="this.userReqVo.stateController.switchCompany?'删除公司':'修改公司'" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="460px" v-win_dialogDrag>
            <win_form :inline="true" :model="company" :rules="rules" ref="company">
                <div>
                    <win_form_item label="公司全称" prop="companyFullName">
                        <win_input v-model="company['companyFullName']" v-if="this.userReqVo.stateController.switchCompany" :disabled="true"></win_input>
                        <win_input v-model="company['companyFullName']" v-else></win_input>
                    </win_form_item>
                </div>
                <div>
                    <win_form_item label="公司简称" prop="companySimpleName">
                        <win_input v-if="this.userReqVo.stateController.switchCompany" placeholder="请填写公司简称" v-model="company['companySimpleName']" :disabled="true"></win_input>
                        <win_input v-else placeholder="请填写公司简称" v-model="company['companySimpleName']"></win_input>
                    </win_form_item>
                </div>
                <div>
                    <win_form_item label="公司编号" prop="companyCode">
                        <win_input placeholder="请填写公司编号" v-model="company.companyCode" v-if="this.userReqVo.stateController.switchCompany" :disabled="true"></win_input>
                        <win_input placeholder="请填写公司编号" v-model="company.companyCode" v-else :disabled="true"></win_input>
                    </win_form_item>
                </div>
            </win_form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="handleDeleteCom" v-if="this.userReqVo.stateController.switchCompany">确 认</el-button>
                <el-button type="primary" @click="handleEditCom('company')" v-else>确 认</el-button>
            </div>
        </win_fdialog>
    </div>
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
// import { Company } from "../vo/UserVO";
import { UserReqVO } from "../vo/UserVO";
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