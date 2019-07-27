<template>
    <win_fdialog title="新增部门" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="460px" v-win_dialogDrag>
        <win_form :inline="true" :model="department" :rules="rules" ref="department">
            <div>
                <win_form_item label="所属公司">
                    <win_input :placeholder="userReqVo.company.companyName" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="部门名称" prop="departmentname">
                    <win_input placeholder="请填写部门名称" v-model="department.departmentname" :maxlength="50"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="部门编号">
                    <win_input placeholder="请填写部门编号" v-model="userReqVo.department.departmentCode" :disabled="true"></win_input>
                </win_form_item>
            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <win_button @click="close">取 消</win_button>
            <win_button type="primary" @click="handleAddDep('department')">确 认</win_button>
        </div>
    </win_fdialog>
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
import { UserReqVO, DepartmentClass } from "../vo/UserVO";
import BaseController from "../../common/controller/BaseController";
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
export default class AddDep extends BaseController {
    dialogFormVisible: boolean = true;
    department: DepartmentClass = new DepartmentClass();
    @Prop()
    userReqVo: UserReqVO;
    rules = {
        departmentname: [
            { required: true, message: "请输入公司部门名称", trigger: "blur" }
        ]
    };

    //验证部门名称不能为空
    handleAddDep(formName) {
        let form: any = this.$refs[formName];
        form.validate(valid => {
            if (valid) {
                const depParams = {
                    companyId: this.userReqVo.company.companyId,
                    departmentName: this.department.departmentname,
                    departmentCode: this.userReqVo.department.departmentCode
                };
                this.$emit("addDep", depParams);
            } else {
                this.errorMessage("请填写完整信息");
                return false;
            }
        });
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }
}
</script>
<style lang="scss" scoped>
</style>