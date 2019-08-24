<template>
    <div>
        <win-fdialog title="删除部门角色" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="840px" v-win-dialogDrag>
            <win-form :inline="true" :disabled="true">
                <div>
                    <win-form-item label="所属公司">
                        <win-input :placeholder="userReqVo.company.companyName" :disabled="true"></win-input>
                    </win-form-item>
                    <win-form-item label="所属部门">
                        <win-input :placeholder="userReqVo.department.departmentname" :disabled="true"></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="角色编码">
                        <win-input placeholder="角色编码" v-model="userReqVo.role.roleCode" :disabled="true"></win-input>
                    </win-form-item>
                    <win-form-item label="角色名称">
                        <win-input placeholder="角色名称" v-model="userReqVo.role.role"></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="角色类型">
                        <win-input placeholder="角色名称" v-model="roleType"></win-input>
                    </win-form-item>
                    <win-form-item label="角色状态">
                        <win-input placeholder="角色状态" v-model="userReqVo.role.roleStatus[0]" :disabled="true"></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="互斥角色">
                        <win-select v-model="excludeRole" placeholder="请选择互斥角色">
                            <win-option v-for="item in userReqVo.company.companyRoleArray" :key="item.mutexRoleId" :value="item.roleName"></win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="复制权限">
                        <win-select placeholder="请选择需要复制的角色">
                            <win-option v-for="item in userReqVo.company.companyRoleArray" :key="item.mutexRoleId" :value="item.roleName"></win-option>
                        </win-select>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="角色描述">
                        <win-input placeholder="角色描述" v-model="userReqVo.role.roleInfo" type="textarea" :rows="2"></win-input>
                    </win-form-item>
                </div>
                <!-- <div class="role-jurisdiction">
                    <span class="text">权限分配</span>
                    <i class="el-icon-edit-outline"></i>
                    <span @click="handleAddJurisdiction" class="jurisdiction">功能权限</span>
                </div> -->
            </win-form>
            <div slot="footer" class="dialog-footer">
                <win-button @click="close">取 消</win-button>
                <win-button type="primary" @click="deleteRoleRightoK">确 认</win-button>
            </div>
        </win-fdialog>
        <!-- <RoleRight @closeRole="closeRoleRight" @editRoleRight="editRoleRight" :userReqVo="userReqVo" v-if="isRoleRightOpen" :roleId="userReqVo.role.roleId"></RoleRight> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";

import { WinButton } from "@win-frond-frameworks/biz-common";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinForm, WinFormItem } from "@win-frond-frameworks/biz-common";
import { WinTabs, WinTabpane } from "@win-frond-frameworks/biz-common";
import { WinSelect, WinOption } from "@win-frond-frameworks/biz-common";
import userService from "../service/userService";
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
    roleType: string = "";
    excludeRole: string = "";
    roleRightArrays = [];
    checkedArray = [];
    @Prop()
    userReqVo: UserReqVO;

    @Emit("cliclClose")
    handleClose() {}

    @Emit("setDepartmentId")
    handleDepartmentId(value) {
        return value;
    }
    editRoleRight(res) {
        this.checkedArray = res;
    }

    deleteRoleRightoK() {
        this.$emit("httpDeleteRole", { id: this.userReqVo.role.roleId });
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }

    mounted() {
        this.userReqVo.role.roleType.forEach(item => {
            if (item.id == this.userReqVo.role.roleType1) {
                this.roleType = item.name;
            }
        });

        let mutexRoleInde: number = -1;
        this.userReqVo.company.companyRoleArray.forEach((element, index) => {
            if (element.mutexRoleId === this.userReqVo.role.mutexRoleId) {
                mutexRoleInde = index;
            }
        });
        if (mutexRoleInde < 0) {
            this.excludeRole = "暂无互斥角色";
        } else {
            this.excludeRole = this.userReqVo.company.companyRoleArray[
                mutexRoleInde
            ].roleName;
        }
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