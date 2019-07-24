<template>
    <div>
        <win_fdialog title="新增部门角色" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="800px">
            <win_form :inline="true" :model="role" :rules="rules" ref="role">
                <div class="form_content">
                    <win_form_item label="所属公司">
                        <win_input :placeholder="userReqVo.company.companyName" :disabled="true"></win_input>
                    </win_form_item>
                    <win_form_item label="所属部门" v-if="userReqVo.department.departmentname">
                        <win_input :placeholder="userReqVo.department.departmentname" :disabled="true"></win_input>
                    </win_form_item>
                    <win_form_item label="所属部门" v-else>
                        <win_select v-model="value" placeholder="请选择">
                            <win_option v-for="item in userReqVo.department.departmentArray" :key="item.id" :value="item.label" @click.native="handleDepartmentId(item.id)"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="角色编码">
                        <win_input placeholder="角色编码" v-model="userReqVo.role.roleCode" :disabled="true"></win_input>
                    </win_form_item>
                    <win_form_item label="角色名称" prop="role">
                        <win_input placeholder="角色名称" v-model="role.role" :maxlength="50"></win_input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="角色类型">
                        <win_select v-model="value" placeholder="请选择角色类型">
                            <win_option v-for="(item) in userReqVo.role.roleType" :key="item.id" :value="item.name" @click.native="changeRoleType(item)"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="角色状态">
                        <win_input placeholder="角色状态" v-model="userReqVo.role.roleStatus[0]" :disabled="true"></win_input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="互斥角色">
                        <win_select v-model="excludeRole" clearable placeholder="请选择互斥角色">
                            <win_option v-for="item in userReqVo.company.companyRoleArray" :key="item.mutexRoleId" :value="item.roleName" @click.native="changeExcludeRoleItem(item)"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="复制权限">
                        <win_select v-model="copyRole" placeholder="请选择需要复制的角色" clearable>
                            <win_option v-for="item in userReqVo.company.companyRoleArray" :key="item.mutexRoleId" :value="item.roleName" @click.native="changeCopyRoleItem(item)"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="角色描述">
                        <win_input placeholder="角色描述" v-model="role.roleInfo" type="textarea" :rows="2"></win_input>
                    </win_form_item>
                </div>
                <div class="role-jurisdiction">
                    <span class="text">权限分配</span>
                    <i class="el-icon-edit-outline"></i>
                    <span @click="handleAddJurisdiction" class="jurisdiction">功能权限</span>
                </div>
            </win_form>
            <div slot="footer" class="dialog-footer">
                <win_button @click="close">取 消</win_button>
                <win_button type="primary" @click="handleAddRole('role')">确 认</win_button>
            </div>
        </win_fdialog>
        <!-- <RoleRight @addRightRole="addRightRole" @closeRoleRight="closeRoleRight" :userReqVo="userReqVo" v-if="userReqVo.stateController.swichRoleRight"></RoleRight> -->
        <RoleRight @closeRole="closeRoleRight" @addRoleRight="addRoleRight" :userReqVo="userReqVo" v-if="isRoleRightOpen"></RoleRight>
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
import RoleRight from "../view/roleRight.vue";
import {
    win_checkbox,
    win_checkboxButton,
    win_checkboxGroup
} from "@win-frond-frameworks/biz-common";
import { UserReqVO, RoleClass } from "../vo/UserVO";
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
        win_checkboxGroup,
        RoleRight
    }
})
export default class AddRole extends BaseController {
    dialogFormVisible: boolean = true;
    copyRole: string = "";
    excludeRole: string = "";
    excludeRoleId: string = "";
    copyRoleId: string = "";
    role: RoleClass = new RoleClass();
    isRoleRightOpen: boolean = false;
    menuList = [];
    roleParams = {};
    rules = {
        role: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
    };
    @Prop()
    userReqVo: UserReqVO;
    value: string = this.userReqVo.role.roleType[0].name;
    roleType: string;

    @Emit("cliclClose")
    handleClose() {}

    @Emit("setDepartmentId")
    handleDepartmentId(value) {
        return value;
    }
    /**选择互斥角色获取互斥角色的Id号 */
    changeExcludeRoleItem(item) {
        this.excludeRoleId = item.mutexRoleId;
    }
    /**选择复制角色获取复制角色的Id号 */
    changeCopyRoleItem(item) {
        this.copyRoleId = item.mutexRoleId;
    }

    /**获取角色类型* */
    changeRoleType(item) {
        this.roleType = item.id;
    }

    /**获取赋权角色* */
    addRoleRight(res) {
        this.menuList = res;
        this.isRoleRightOpen = false;
    }

    /**点击确认按钮添加给角色赋权* */
    handleAddRole(formName) {
        let form: any = this.$refs[formName];
        form.validate(valid => {
            if (valid) {
                let roleParams = {
                    mutexRoleId: this.excludeRoleId, //互斥角色Id
                    companyId: this.userReqVo.company.companyId, //公司Id
                    departmentId: this.userReqVo.department.departmentId, //部门ID
                    roleCode: this.userReqVo.role.roleCode, //角色编码
                    roleName: this.role.role, //角色名称
                    roleType: this.roleType, //角色类型
                    roleState: 1, //角色状态
                    roleDescription: this.role.roleInfo //角色描述
                };

                let options = {
                    ...roleParams,
                    menuList: this.menuList
                };
                this.$emit("addRoleRight", options);
            } else {
                this.errorMessage("请添写角色名称");
                return false;
            }
        });

        return this.roleParams;
    }

    /**打开权限面板* */
    handleAddJurisdiction() {
        this.isRoleRightOpen = true;
    }

    mounted() {
        this.userReqVo.role.companyId = this.userReqVo.company.companyId;
        this.userReqVo.role.departmentId = this.userReqVo.department.departmentId;
        this.roleType = this.userReqVo.role.roleType[0].id;
    }
    close() {
        this.userReqVo.stateController.switchFormType = "";
    }

    closeRoleRight() {
        this.isRoleRightOpen = false;
    }

    addRightRole(res) {
        this.userReqVo.checkArray = res;
        this.userReqVo.stateController.swichRoleRight = false;
    }
}
</script>
<style lang="scss" scoped>
.role-jurisdiction {
    cursor: pointer;
    .jurisdiction {
        color: #e6a23c;
        font-weight: bold;
        padding-left: 4px;
    }
    .el-icon-edit-outline {
        color: #e6a23c;
    }
    .text {
        color: #fff;
    }
    text-align: left;
    margin-left: 38px;
    /* margin-top: 24px; */
    padding-top: 12px;
}
</style>