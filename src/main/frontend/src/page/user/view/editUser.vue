<template>
    <win_fdialog title="修改用户" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="840px" v-win_dialogDrag>
        <win_form :inline="true">
            <div>
                <win_form_item label="用户编码">
                    <win_input placeholder="用户编码" v-model="userReqVo.user.userCode" :disabled="true"></win_input>
                    <win_input placeholder="用户Id" v-model="userReqVo.user.id" :disabled="true" v-if="false"></win_input>
                </win_form_item>
                <win_form_item label="所属公司">
                    <win_input :placeholder="userReqVo.company.companyName" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="用户名">
                    <win_input placeholder="用户名" v-model="user.userName"></win_input>
                </win_form_item>
                <win_form_item label="隶属部门">
                    <win_select v-model="depName" placeholder="请选择">
                        <win_option v-for="(item) in userReqVo.department.departmentArray" :key="item.id" :value="item.id" :label="item.label" @click.native="changeDep(item)"></win_option>
                    </win_select>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="邮箱">
                    <win_input placeholder="邮箱" v-model="user.mailAddress"></win_input>
                </win_form_item>
                <win_form_item label="隶属角色">
                    <win_select v-model="roleIds" multiple placeholder="隶属角色">
                        <win_option v-for="item in userReqVo.role.rolesArray" :key="item.id" :value="item.id" :label="item.label"></win_option>
                    </win_select>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="用户类别">
                    <win_select v-model="userType" placeholder="请选择用户类别">
                        <win_option v-for="item in userReqVo.userTypeArray" :key="item.userType" :value="item.userType" :label="item.userTypeName" @click.native="changeUserType(item)"></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="用户状态">
                    <win_input placeholder="正常" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="联系方式">
                    <win_input placeholder="联系方式" v-model="user.contactWay"></win_input>
                </win_form_item>
                <win_form_item label="手机号码">
                    <win_input placeholder="手机号码" v-model="user.phoneNumber"></win_input>
                </win_form_item>

            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <win_button @click="close">取 消</win_button>
            <win_button type="primary" @click="handleEditUser">确 认</win_button>
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