<template>

    <win_fdialog title="新增角色用户" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="460px">
        <win_form :inline="true">
            <div class="form_content">
                <win_form_item label="所属公司" prop="companyName">
                    <win_input v-model="this.userReqVo.company.companyName" :disabled="true"></win_input>
                </win_form_item>
            </div>

            <div class="form_content">
                <win_form_item label="当前角色" prop="companyCode">
                    <win_input v-model="this.userReqVo.role.role" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="添加用户">
                    <win_select v-model="userIds" multiple  placeholder="请选择用户">
                        <win_option v-for="item in   userReqVo.company.companyUserArray" :key="item.id" :value="item.userId" :label="item.userName"></win_option>
                    </win_select>
                </win_form_item>
            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="handleAddRoleUser">确 认</el-button>

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
// import { Company } from "../vo/UserVO";
import { UserReqVO } from "../vo/UserVO";
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
export default class FromDialog extends Vue {
    dialogFormVisible: boolean = true;
    userIds: [] = "";
    @Prop()
    userReqVo: UserReqVO;

    handleAddRoleUser() {
        let params={
          "roleId": this.userReqVo.role.roleId,
          "userIds":this.userIds

        }
        this.$emit("addRoleUserss",params)
    }

    close() {
        this.userReqVo.stateController.switchFormType = "";
    }
}
</script>
<style lang="scss" scoped>
</style>