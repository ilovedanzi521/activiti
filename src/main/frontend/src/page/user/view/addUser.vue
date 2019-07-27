<template>
    <win_fdialog title="新增用户" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="800px" v-win_dialogDrag>
        <win_form :inline="true" :model="user" :rules="rules" ref="user">
            <div>
                <win_form_item label="用户编码" prop="userCode">
                    <win_input placeholder="用户编码" v-model="user.userCode" :maxlength="50"></win_input>
                </win_form_item>
                <win_form_item label="所属公司">
                    <win_input :placeholder="userReqVo.company.companyName" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="用户名" prop="username">
                    <win_input placeholder="用户名" v-model="user.username" :maxlength="50"></win_input>
                </win_form_item>
                <win_form_item label="隶属部门" v-if="userReqVo.department.departmentname">
                    <win_input placeholder="隶属部门" v-model="userReqVo.department.departmentname" :disabled="true"></win_input>
                </win_form_item>
                <win_form_item label="隶属部门" v-else prop="departmentId">
                    <win_select v-model="user.departmentId" placeholder="请选择">
                        <win_option v-for="item in userReqVo.department.departmentArray" :key="item.id" :value="item.id" :label="item.label" @click.native="changeDep(item)"></win_option>
                    </win_select>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="邮箱" prop="email">
                    <win_input placeholder="邮箱" v-model="user.email"></win_input>
                </win_form_item>
                <win_form_item label="隶属角色" prop="roleIds" v-if="!this.userReqVo.role.roleId">
                    <win_select v-model="user.roleIds" multiple placeholder="隶属角色">
                        <win_option v-for="item in userReqVo.role.rolesArray" :key="item.id" :label="item.label" :value="item.id"></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="隶属角色" v-else>
                    <win_input placeholder="隶属角色" v-model="this.userReqVo.role.role" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="用户类别" prop="userType">
                    <win_select v-model="user.userType">
                        <win_option v-for="item in userReqVo.userTypeArray" :key="item.userType" :value="item.userType" :label="item.userTypeName"></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="用户状态" v-model="user.userState">
                    <win_input placeholder="正常" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="联系方式" prop="tel">
                    <win_input placeholder="联系方式" v-model="user.tel"></win_input>
                </win_form_item>
                <win_form_item label="手机号码">
                    <win_input placeholder="手机号码" v-model="user.pho"></win_input>
                </win_form_item>
            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <win_button @click="close">取 消</win_button>
            <win_button type="primary" @click="handleAdduser('user')">确 认</win_button>
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
import BaseController from "../../common/controller/BaseController";
import {
    win_checkbox,
    win_checkboxButton,
    win_checkboxGroup
} from "@win-frond-frameworks/biz-common";
import { UserReqVO, UserClass } from "../vo/UserVO";
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