<template>
    <div>
        <win-fdialog title="新增部门角色" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="800px" v-win-dialogDrag>
            <win-form :inline="true" :model="role" :rules="rules" ref="role">
                <div>
                    <win-form-item label="所属公司">
                        <win-input :placeholder="userReqVo.company.companyName" :disabled="true"></win-input>
                    </win-form-item>
                    <win-form-item label="所属部门" v-if="userReqVo.department.departmentname">
                        <win-input :placeholder="userReqVo.department.departmentname" :disabled="true"></win-input>
                    </win-form-item>
                    <win-form-item label="所属部门" v-else>
                        <win-select v-model="value" placeholder="请选择">
                            <win-option v-for="item in userReqVo.department.departmentArray" :key="item.id" :value="item.label" @click.native="handleDepartmentId(item.id)"></win-option>
                        </win-select>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="角色编码">
                        <win-input placeholder="角色编码" v-model="userReqVo.role.roleCode" :disabled="true"></win-input>
                    </win-form-item>
                    <win-form-item label="角色名称" prop="role">
                        <win-input placeholder="角色名称" v-model="role.role" :maxlength="50"></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="角色类型">
                        <win-select v-model="value" placeholder="请选择角色类型">
                            <win-option v-for="(item) in userReqVo.role.roleType" :key="item.id" :value="item.name" @click.native="changeRoleType(item)"></win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="角色状态">
                        <win-input placeholder="角色状态" v-model="userReqVo.role.roleStatus[0]" :disabled="true"></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="互斥角色">
                        <win-select v-model="excludeRole" clearable placeholder="请选择互斥角色">
                            <win-option v-for="item in userReqVo.company.companyRoleArray" :key="item.mutexRoleId" :value="item.roleName" @click.native="changeExcludeRoleItem(item)"></win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="复制权限">
                        <win-select v-model="copyRole" placeholder="请选择需要复制的角色" clearable>
                            <win-option v-for="item in userReqVo.company.companyRoleArray" :key="item.mutexRoleId" :value="item.roleName" @click.native="changeCopyRoleItem(item)"></win-option>
                        </win-select>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="角色描述">
                        <win-input placeholder="角色描述" v-model="role.roleInfo" type="textarea" :rows="2"></win-input>
                    </win-form-item>
                </div>
                <div class="role-jurisdiction">
                    <span class="text">权限分配</span>
                    <i class="el-icon-edit-outline"></i>
                    <span @click="handleAddJurisdiction" class="jurisdiction">功能权限</span>
                </div>
            </win-form>
            <div slot="footer" class="dialog-footer">
                <win-button @click="close">取 消</win-button>
                <win-button type="primary" @click="handleAddRole('role')">确 认</win-button>
            </div>
        </win-fdialog>
        <!-- <RoleRight @addRightRole="addRightRole" @closeRoleRight="closeRoleRight" :userReqVo="userReqVo" v-if="userReqVo.stateController.swichRoleRight"></RoleRight> -->
        <RoleRight @closeRole="closeRoleRight" @addRoleRight="addRoleRight" :userReqVo="userReqVo" v-if="isRoleRightOpen"></RoleRight>
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
import RoleRight from "../view/roleRight.vue";
import {
    WinCheckbox,
    WinCheckboxButton,
    WinCheckboxGroup
} from "@win-frond-frameworks/biz-common";
import { UserReqVO, RoleClass } from "../vo/UserVO";
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
        WinCheckboxGroup,
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