<template>
    <win-fdialog title="修改用户" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="840px" v-win-dialogDrag>
        <win-form :inline="true">
            <div>
                <win-form-item label="用户编码">
                    <win-input placeholder="用户编码" v-model="userReqVo.user.userCode" :disabled="true"></win-input>
                    <win-input placeholder="用户Id" v-model="userReqVo.user.id" :disabled="true" v-if="false"></win-input>
                </win-form-item>
                <win-form-item label="所属公司">
                    <win-input :placeholder="userReqVo.company.companyName" :disabled="true"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="用户名">
                    <win-input placeholder="用户名" v-model="user.userName"></win-input>
                </win-form-item>
                <win-form-item label="隶属部门">
                    <win-select v-model="depName" placeholder="请选择">
                        <win-option v-for="(item) in userReqVo.department.departmentArray" :key="item.id" :value="item.id" :label="item.label" @click.native="changeDep(item)"></win-option>
                    </win-select>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="邮箱">
                    <win-input placeholder="邮箱" v-model="user.mailAddress"></win-input>
                </win-form-item>
                <win-form-item label="隶属角色">
                    <win-select v-model="roleIds" multiple placeholder="隶属角色">
                        <win-option v-for="item in userReqVo.role.rolesArray" :key="item.id" :value="item.id" :label="item.label"></win-option>
                    </win-select>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="用户类别">
                    <win-select v-model="userType" placeholder="请选择用户类别">
                        <win-option v-for="item in userReqVo.userTypeArray" :key="item.userType" :value="item.userType" :label="item.userTypeName" @click.native="changeUserType(item)"></win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="用户状态">
                    <win-input placeholder="正常" :disabled="true"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="联系方式">
                    <win-input placeholder="联系方式" v-model="user.contactWay"></win-input>
                </win-form-item>
                <win-form-item label="手机号码">
                    <win-input placeholder="手机号码" v-model="user.phoneNumber"></win-input>
                </win-form-item>

            </div>
        </win-form>
        <div slot="footer" class="dialog-footer">
            <win-button @click="close">取 消</win-button>
            <win-button type="primary" @click="handleEditUser">确 认</win-button>
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
export default class AddUser extends Vue {
    dialogFormVisible: boolean = true;
    user: UserClass = new UserClass();
    userType: string = "";
    userTypeId: string = "";
    roleIds: any[] = [];
    roleName: any[] = [];
    depName: string = "";
    depId: string = "";
    @Prop()
    userReqVo: UserReqVO;

    @Emit("edituser")
    handleEditUser() {
        let userParams = {
            id: this.user.id, //用户ID
            userId: this.user.userCode, //用户编吗
            userName: this.user.userName, //用户名称
            mailAddress: this.user.mailAddress, //邮箱地址
            phoneNumber: this.user.phoneNumber, //角色电话
            contactWay: this.user.contactWay, //角色联系方式
            userType: this.userTypeId, //角色类型 1代表后台2代表普通3临时
            departmentId: this.depId,
            userState: 1, // 角色状态：1-代表正常
            roleIds: this.roleIds
        };
        return userParams;
    }

    @Emit("changeDep")
    /**改变部门 */
    changeDep(res) {
        console.log(res);
        this.roleIds = [];
        this.depId = res.id;
        return res;
    }

    /**改变角色状态 */

    /**改变用户状态 */
    changeUserType(res) {
        this.userType = res.userTypeName;
        this.userTypeId = res.userType;
    }
    close() {
        this.userReqVo.stateController.switchFormType = "";
    }

    mounted() {
        console.log(this.userReqVo.user);
        this.user = Object.assign({}, this.userReqVo.user);
        this.depName = this.userReqVo.user.departmentName;
        this.depId = this.userReqVo.user.departmentId;
        //加载角色
        this.userReqVo.user.roleNames.forEach(element => {
            this.roleIds.push(element.roleId);
            this.roleName.push(element.roleName);
        });
        this.userReqVo.userTypeArray.forEach(element => {
            if (element.userType == this.userReqVo.user.userType) {
                this.userType = element.userTypeName;
                this.userTypeId = element.userType;
            }
        });
        //初始化部门下的角色
        let depInit = this.userReqVo.department.departmentArray.filter(
            element => element.id == this.depId
        );
        this.$emit("changeDep", depInit[0]);
    }
}
</script>
<style lang="scss" scoped>
</style>