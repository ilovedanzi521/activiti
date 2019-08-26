<template>
    <win-fdialog title="新增用户" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="800px" v-win-dialogDrag>
        <win-form :inline="true" :model="user" :rules="rules" ref="user">
            <div>
                <win-form-item label="用户编码" prop="userCode">
                    <win-input placeholder="用户编码" v-model="user.userCode" :maxlength="50"></win-input>
                </win-form-item>
                <win-form-item label="所属公司">
                    <win-input :placeholder="userReqVo.company.companyName" :disabled="true"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="用户名" prop="username">
                    <win-input placeholder="用户名" v-model="user.username" :maxlength="50"></win-input>
                </win-form-item>
                <win-form-item label="隶属部门" v-if="userReqVo.department.departmentname">
                    <win-input placeholder="隶属部门" v-model="userReqVo.department.departmentname" :disabled="true"></win-input>
                </win-form-item>
                <win-form-item label="隶属部门" v-else prop="departmentId">
                    <win-select v-model="user.departmentId" placeholder="请选择">
                        <win-option v-for="item in userReqVo.department.departmentArray" :key="item.id" :value="item.id" :label="item.label" @click.native="changeDep(item)"></win-option>
                    </win-select>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="邮箱" prop="email">
                    <win-input placeholder="邮箱" v-model="user.email"></win-input>
                </win-form-item>
                <win-form-item label="隶属角色" prop="roleIds" v-if="!this.userReqVo.role.roleId">
                    <win-select v-model="user.roleIds" multiple placeholder="隶属角色">
                        <win-option v-for="item in userReqVo.role.rolesArray" :key="item.id" :label="item.label" :value="item.id"></win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="隶属角色" v-else>
                    <win-input placeholder="隶属角色" v-model="this.userReqVo.role.role" :disabled="true"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="用户类别" prop="userType">
                    <win-select v-model="user.userType">
                        <win-option v-for="item in userReqVo.userTypeArray" :key="item.userType" :value="item.userType" :label="item.userTypeName"></win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="用户状态" v-model="user.userState">
                    <win-input placeholder="正常" :disabled="true"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="联系方式" prop="tel">
                    <win-input placeholder="联系方式" v-model="user.tel"></win-input>
                </win-form-item>
                <win-form-item label="手机号码">
                    <win-input placeholder="手机号码" v-model="user.pho"></win-input>
                </win-form-item>
            </div>
        </win-form>
        <div slot="footer" class="dialog-footer">
            <win-button @click="close">取 消</win-button>
            <win-button type="primary" @click="handleAdduser('user')">确 认</win-button>
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
import BaseController from "../../common/controller/BaseController";
import {
    WinCheckbox,
    WinCheckboxButton,
    WinCheckboxGroup
} from "@win-frond-frameworks/biz-common";
import { UserReqVO, UserClass } from "../vo/UserVO";
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
export default class AddUser extends BaseController {
    dialogFormVisible: boolean = true;
    user: UserClass = new UserClass();

    /**
     * 用户编码唯一性校验
     */
    validateUserCode(rule, value, callback) {
        this.$emit("validateUserCode", value, callback);
    }

    /**
     * 校验规则
     */
    rules = {
        userCode: [
            { required: true, message: "请输入用户编码", trigger: "blur" },
            { validator: this.validateUserCode, trigger: "blur" }
        ],
        username: [
            { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        departmentId: [
            { required: true, message: "请选择部门", trigger: "blur" }
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
        userType: [
            { required: true, message: "请选择用户类别", trigger: "blur" }
        ],
        email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            {
                type: "email",
                message: "请输入正确的邮箱地址",
                trigger: "blur"
            }
        ],
        tel: [
            { required: true, message: "请输入联系方式", trigger: "blur" },
            {
                pattern: /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[358]\d{9})$)/,
                message: "请输入正确的联系方式",
                trigger: "blur"
            }
        ]
    };

    @Prop()
    userReqVo: UserReqVO;

    @Emit("cliclClose")
    handleClose() {}

    handleAdduser(formName) {
        let form: any = this.$refs[formName];
        form.validate(valid => {
            if (valid) {
                const userParams = {
                    userId: this.user.userCode, //用户编吗
                    userName: this.user.username, //用户名称
                    mailAddress: this.user.email, //邮箱地址
                    userType: this.user.userType, //角色类型 1代表后台2代表普通3临时
                    phoneNumber: this.user.pho, //角色电话
                    contactWay: this.user.tel, //角色联系方式
                    userState: 1, // 角色状态：1-代表正常
                    roleIds: this.userReqVo.role.roleId
                        ? [this.userReqVo.role.roleId]
                        : this.user.roleIds, //角色userId
                    departmentId: this.userReqVo.department.departmentId
                };
                this.$emit("adduser", userParams);
            } else {
                this.errorMessage("请填写完整信息");
            }
        });
    }

    @Emit("changeDep")
    changeDep(res) {
        this.user.roleIds = [];
        return res;
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }

    mounted() {}
}
</script>
<style lang="scss" scoped>
</style>