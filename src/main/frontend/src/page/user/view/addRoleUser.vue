<template>

    <win-fdialog title="新增角色用户" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="460px" v-win-dialogDrag>
        <win-form :inline="true">
            <div>
                <win-form-item label="所属公司" prop="companyName">
                    <win-input v-model="this.userReqVo.company.companyName" :disabled="true"></win-input>
                </win-form-item>
            </div>

            <div>
                <win-form-item label="当前角色" prop="companyCode">
                    <win-input v-model="this.userReqVo.role.role" :disabled="true"></win-input>
                </win-form-item>
            </div>
            <div>
                <win-form-item label="添加用户">
                    <win-select v-model="userIds" multiple placeholder="请选择用户">
                        <win-option v-for="item in   userReqVo.company.companyUserArray" :key="item.id" :value="item.userId" :label="item.userName"></win-option>
                    </win-select>
                </win-form-item>
            </div>
        </win-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="handleAddRoleUser">确 认</el-button>

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
// import { Company } from "../vo/UserVO";
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
    userIds: [] = "";
    @Prop()
    userReqVo: UserReqVO;

    handleAddRoleUser() {
        let params = {
            roleId: this.userReqVo.role.roleId,
            userIds: this.userIds
        };
        this.$emit("addRoleUserss", params);
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }
}
</script>
<style lang="scss" scoped>
</style>