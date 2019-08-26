<template>
    <win-fdialog title="新增部门" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="460px" v-win-dialogDrag>
        <win-form :inline="true" :model="department" :rules="rules" ref="department">
            <div>
                <win-form-item label="所属公司">
                    <win-input :placeholder="userReqVo.company.companyName" :disabled="true"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="部门名称" prop="departmentname">
                    <win-input placeholder="请填写部门名称" v-model="department.departmentname" :maxlength="50"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="部门编号">
                    <win-input placeholder="请填写部门编号" v-model="userReqVo.department.departmentCode" :disabled="true"></win-input>
                </win-form-item>
            </div>
        </win-form>
        <div slot="footer" class="dialog-footer">
            <win-button @click="close">取 消</win-button>
            <win-button type="primary" @click="handleAddDep('department')">确 认</win-button>
        </div>
    </win-fdialog>
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
import { UserReqVO, DepartmentClass } from "../vo/UserVO";
import BaseController from "../../common/controller/BaseController";
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