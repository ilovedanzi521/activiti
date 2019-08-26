<template>
    <win-fdialog title="冻结用户" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="840px" v-win-dialogDrag>
        <win-form :inline="true" :disabled="true">
            <div>
                <win-form-item label="用户编码">
                    <win-input placeholder="用户编码" v-model="userReqVo.user.userCode" :disabled="true"></win-input>
                </win-form-item>
                <win-form-item label="所属公司">
                    <win-input :placeholder="userReqVo.company.companyName" :disabled="true"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="用户名">
                    <win-input placeholder="用户名" v-model="userReqVo.user.userName"></win-input>
                </win-form-item>
                <win-form-item label="隶属部门">
                    <win-input placeholder="用户名" v-model="userReqVo.user.departmentName"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="邮箱">
                    <win-input placeholder="邮箱" v-model="userReqVo.user.mailAddress"></win-input>
                </win-form-item>
                <win-form-item label="隶属角色">
                    <win-select v-model=" roles " placeholder="隶属角色" multiple>
                        <win-option v-for="item in userReqVo.user.roleNames" :key="item.id" :value="item.roleId" :label="item.roleName"></win-option>
                    </win-select>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="用户类别">

                    <win-input placeholder="正常" :disabled="true" v-model="getUserType"></win-input>
                </win-form-item>
                <win-form-item label="用户状态">
                    <win-input placeholder="正常" :disabled="true" v-model="status"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="联系方式">
                    <win-input placeholder="联系方式" v-model="userReqVo.user.contactWay"></win-input>
                </win-form-item>
                <win-form-item label="手机号码">
                    <win-input placeholder="手机号码" v-model="userReqVo.user.phoneNumber"></win-input>
                </win-form-item>
            </div>
        </win-form>
        <div slot="footer" class="dialog-footer">
            <win-button @click="close">取 消</win-button>
            <win-button type="primary" @click="handleForBidUser" v-if="userReqVo.user.status==1">冻结</win-button>
            <win-button type="primary" @click="handleThawUser" v-else>解冻</win-button>
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