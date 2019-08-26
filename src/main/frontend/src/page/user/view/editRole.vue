<template>
    <div>
        <win-fdialog title="修改部门角色" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="840px" v-win-dialogDrag>
            <win-form :inline="true" :model="role" :rules="rules" ref="role">
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
                    <win-form-item label="角色名称" prop="role">
                        <win-input placeholder="角色名称" v-model="role.role"></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="角色类型">
                        <win-select v-model="roleType" placeholder="请选择角色类型">
                            <win-option v-for="(item,index) in userReqVo.role.roleType" :key="item.id" :value="item.id" :label="item.name" @click.native="changeRoleType(item,index)"></win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="角色状态">
                        <win-input placeholder="角色状态" v-model="userReqVo.role.roleStatus[0]" :disabled="true"></win-input>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="互斥角色">
                        <win-select v-model="excludeRole" clearable placeholder="请选择互斥角色">
                            <win-option v-for="item in userReqVo.company.companyRoleArray" :key="item.mutexRoleId" :value="item.mutexRoleId" :label="item.roleName" @click.native="changeMuteRole(item,index)"></win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="复制权限">
                        <win-select v-model="copyRole" clearable placeholder="请选择需要复制的角色">
                            <win-option v-for="item in userReqVo.company.companyRoleArray" :key="item.mutexRoleId" :value="item.roleName"></win-option>
                        </win-select>
                    </win-form-item>
                </div>
                <div>
                    <win-form-item label="角色描述">
                        <win-input placeholder="角色描述" v-model="userReqVo.role.roleInfo" type="textarea" :rows="2"></win-input>
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
                <win-button type="primary" @click="editRoleRightoK('role')">确 认</win-button>
            </div>
        </win-fdialog>
        <RoleRight @closeRole="closeRoleRight" @editRoleRight="editRoleRight" :userReqVo="userReqVo" v-if="isRoleRightOpen" :roleId="userReqVo.role.roleId"></RoleRight>
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
import RoleRight from "../view/eRoleRight.vue";
import BaseController from "../../common/controller/BaseController";
import {
    WinCheckbox,
    WinCheckboxButton,
    WinCheckboxGroup
} from "@win-frond-frameworks/biz-common";
import { UserReqVO, RoleClass } from "../vo/UserVO";
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
export default class FromDialog extends BaseController {
    dialogFormVisible: boolean = true;
    isRoleRightOpen: boolean = false;
    roleRightArrays = [];
    checkedArray = [];
    roleTypeId: string = "";
    roleType: string = "";
    excludeRole: string = "";
    excludeRoleId: string = "";
    copyRole: string = "";
    role = { role: "" };
    roles = {
        role: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
    };
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

    editRoleRightoK(formName) {
        let form: any = this.$refs[formName];
        form.validate(valid => {
            if (valid) {
                let roleParams = {
                    mutexRoleId: this.excludeRoleId, //互斥角色Id
                    companyId: this.userReqVo.company.companyId, //公司Id
                    departmentId: this.userReqVo.department.departmentId, //部门ID
                    roleCode: this.userReqVo.role.roleCode, //角色编码
                    roleName: this.role.role, //角色名称
                    id: this.userReqVo.role.roleId,
                    roleState: 1, //角色状态
                    roleType: this.roleTypeId,
                    roleDescription: this.userReqVo.role.roleInfo //角色描述
                };

                let options = {
                    ...roleParams,
                    menuList: this.checkedArray
                };
                this.$emit("httpEditRole", options);
            } else {
                this.errorMessage("请添写角色名称");
                return false;
            }
        });
    }

    /**打开权限面板 */

    handleAddJurisdiction() {
        this.isRoleRightOpen = true;
    }

    changeRoleType(item) {
        this.roleTypeId = item.id;
    }
    changeMuteRole(item) {
        this.excludeRoleId = item.mutexRoleId;
    }
    /**关闭权限面板 */

    closeRoleRight() {
        this.isRoleRightOpen = false;
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }

    mounted() {
        if (!this.userReqVo.role.mutexRoleId) {
            this.excludeRole = "暂无互斥角色";
        } else {
            this.userReqVo.company.companyRoleArray.forEach(item => {
                if (item.mutexRoleId == this.userReqVo.role.mutexRoleId) {
                    this.excludeRole = item.roleName;
                    this.excludeRoleId = item.mutexRoleId;
                }
            });
        }

        this.role.role = this.userReqVo.role.role; //获取角色名称
        this.userReqVo.role.roleType.forEach(item => {
            if (item.id == this.userReqVo.role.roleType1) {
                this.roleType = item.name;
                this.roleTypeId = item.id;
            }
        });
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