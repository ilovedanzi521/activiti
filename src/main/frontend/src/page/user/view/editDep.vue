<template>
    <div class="mask">
        <win_fdialog :title="userReqVo.stateController.switchDepartment?'删除部门':'修改部门'" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="460px" v-win_dialogDrag>
            <win_form :inline="true" :model="department" :rules="rules" ref="department">
                <div>
                    <win_form_item label="所属公司">
                        <win_input :placeholder="userReqVo.company.companyName" :disabled="true"></win_input>
                    </win_form_item>
                </div>

                <div>
                    <win_form_item label="部门名称" v-if="userReqVo.stateController.switchDepartment">
                        <win_input placeholder="请填写部门名称" v-model="department.departmentname" :disabled="true" :maxlength="50"></win_input>
                    </win_form_item>
                    <win_form_item label="部门名称" prop="departmentname" v-else>
                        <win_input placeholder="请填写部门名称" v-model="department.departmentname"></win_input>
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

                <win_button type="primary" v-if=" userReqVo.stateController.switchDepartment" @click="handleDeleteDep">确 认删 除</win_button>
                <win_button type="primary" v-else @click="handleEditDep('department')">确 认</win_button>
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