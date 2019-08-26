<template>
    <div class="mask">
        <win-fdialog :title="userReqVo.stateController.switchDepartment?'删除部门':'修改部门'" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="460px" v-win-dialogDrag>
            <win-form :inline="true" :model="department" :rules="rules" ref="department">
                <div>
                    <win-form-item label="所属公司">
                        <win-input :placeholder="userReqVo.company.companyName" :disabled="true"></win-input>
                    </win-form-item>
                </div>

                <div>
                    <win-form-item label="部门名称" v-if="userReqVo.stateController.switchDepartment">
                        <win-input placeholder="请填写部门名称" v-model="department.departmentname" :disabled="true" :maxlength="50"></win-input>
                    </win-form-item>
                    <win-form-item label="部门名称" prop="departmentname" v-else>
                        <win-input placeholder="请填写部门名称" v-model="department.departmentname"></win-input>
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

                <win-button type="primary" v-if=" userReqVo.stateController.switchDepartment" @click="handleDeleteDep">确 认删 除</win-button>
                <win-button type="primary" v-else @click="handleEditDep('department')">确 认</win-button>
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
    department = {
        departmentname: ""
    };

    rules = {
        departmentname: [
            { required: true, message: "请输入部门名称", trigger: "blur" }
        ]
    };

    @Prop()
    userReqVo: UserReqVO;

    // @Emit("cliclClose")
    // handleClose() {}

    /***编辑部门提交 */
    handleEditDep(formName) {
        let form: any = this.$refs[formName];
        form.validate(valid => {
            if (valid) {
                const depParams = {
                    id: this.userReqVo.department.departmentId,
                    departmentName: this.department["departmentname"],
                    departmentCode: this.userReqVo.department.departmentCode
                };
                this.$emit("editDep", depParams);
            } else {
                // alert("部门不能为空");
                return false;
            }
        });
    }

    /***删除部门提交 */

    handleDeleteDep() {
        const depParams = {
            id: this.userReqVo.department.departmentId
        };
        this.$emit("deleteDep", depParams);
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }
    mounted() {
        this.department.departmentname = this.userReqVo.department.departmentname;
    }
}
</script>
<style lang="scss" scoped>
</style>