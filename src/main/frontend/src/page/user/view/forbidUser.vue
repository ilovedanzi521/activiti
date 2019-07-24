<template>
    <win_fdialog title="冻结用户" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="840px">
        <win_form :inline="true" :disabled="true">
            <div class="form_content">
                <win_form_item label="用户编码">
                    <win_input placeholder="用户编码" v-model="userReqVo.user.userCode" :disabled="true"></win_input>
                </win_form_item>
                <win_form_item label="所属公司">
                    <win_input :placeholder="userReqVo.company.companyName" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="用户名">
                    <win_input placeholder="用户名" v-model="userReqVo.user.userName"></win_input>
                </win_form_item>
                <win_form_item label="隶属部门">
                    <win_input placeholder="用户名" v-model="userReqVo.user.departmentName"></win_input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="邮箱">
                    <win_input placeholder="邮箱" v-model="userReqVo.user.mailAddress"></win_input>
                </win_form_item>
                <win_form_item label="隶属角色">
                    <win_select v-model=" roles " placeholder="隶属角色" multiple>
                        <win_option v-for="item in userReqVo.user.roleNames" :key="item.id" :value="item.roleId" :label="item.roleName"></win_option>
                    </win_select>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="用户类别">

                    <win_input placeholder="正常" :disabled="true" v-model="getUserType"></win_input>
                </win_form_item>
                <win_form_item label="用户状态">
                    <win_input placeholder="正常" :disabled="true" v-model="status"></win_input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="联系方式">
                    <win_input placeholder="联系方式" v-model="userReqVo.user.contactWay"></win_input>
                </win_form_item>
                <win_form_item label="手机号码">
                    <win_input placeholder="手机号码" v-model="userReqVo.user.phoneNumber"></win_input>
                </win_form_item>
            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <win_button @click="close">取 消</win_button>
            <win_button type="primary" @click="handleForBidUser" v-if="userReqVo.user.status==1">冻结</win_button>
            <win_button type="primary" @click="handleThawUser" v-else>解冻</win_button>
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
    userType: number = 0;
    roleId: string = "";
    status: string = "";
    roles = [];
    // departmentcode: string = "";
    // isDepartment: true;
    dep: number = 0;
    @Prop()
    userReqVo: UserReqVO;
    close() {
        this.userReqVo.stateController.switchFormType = "";
    }

    /** 冻结用户*/
    handleForBidUser() {
        this.$emit("httpForbidUser");
    }
    /** 解冻用户*/
    handleThawUser() {
        this.$emit("httpThawUser");
    }

    mounted() {
        this.userReqVo.user.roleNames.forEach((element, index) => {
            console.log(element.roleName);
            this.roles.push(element.roleName);
            this.status = this.userReqVo.user.status == 2 ? "冻结" : "正常";
        });
    }
    get getUserType(): string {
        if (this.userReqVo.user.userType == 0) {
            return "内部员工";
        }
        if (this.userReqVo.user.userType == 1) {
            return "外部员工";
        }
        if (this.userReqVo.user.userType == 2) {
            return "冻结";
        }
    }
}
</script>
<style lang="scss" scoped>
</style>