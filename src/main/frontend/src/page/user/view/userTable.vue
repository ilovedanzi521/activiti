<template>
    <div class="table-contanier">
        <win_table style="width: 100%" stripe :data="userReqVo.userArray" :showSelection="false" max-height="600">
            <win_table_column prop="userCode" label="用户编码" width="120"></win_table_column>
            <win_table_column prop="userName" label="用户名" width="120"></win_table_column>
            <win_table_column :formatter="formatRoleName" label="隶属角色" width="180"></win_table_column>
            <win_table_column prop="contactWay" label="联系方式" width="140"></win_table_column>
            <win_table_column prop="phoneNumber" label="手机号" width="140"></win_table_column>
            <win_table_column prop="mailAddress" label="邮箱" width="180"></win_table_column>
            <win_table_column prop="departmentName" label="所属部门" width="160"></win_table_column>
            <win_table_column prop="status" label="状态1" width="160">
                <template slot-scope="scope">
                    <span v-if="scope.row.status== 1">正常</span>
                    <span v-if="scope.row.status === 2">冻结</span>
                    <span v-if="scope.row.status === 3">注销</span>
                </template>
            </win_table_column>
            <win_table_column prop="operation" label="操作" width="480">
                <template slot-scope="scope">
                    <span class="operation" @click="handleUserRole(scope.row)" v-if="userReqVo.changeType!=3">
                        <span class="operation" v-if="scope.row.status===3"></span>
                        <span v-else><i class="icon icon1 el-icon-user-solid"></i>权限管理</span>
                    </span>
                    <span v-if="userReqVo.changeType==3">
                        <span class="operation" v-if="scope.row.status===3"></span>
                        <span class="operation" @click="handleCancel(scope.row,1)" v-else-if="scope.row.roleNames && scope.row.roleNames.length > 0">
                            <i class="icon icon1 el-icon-user-solid"></i>剔除该用户
                        </span>
                    </span>
                    <span class="operation" v-if="scope.row.status===3"></span>
                    <span class="operation" @click="handleForbidden(scope.row)" v-else>
                        <i class="icon icon2 el-icon-lock"></i>{{scope.row.status===2?'解冻':'冻结'}}
                    </span>
                    <span class="operation" v-if="scope.row.status===3"></span>
                    <span class="operation" @click="handleReset(scope.row)" v-else>
                        <i class="icon icon3 el-icon-time"></i>重置密码
                    </span>
                    <span class="operation" v-if="scope.row.status===3"></span>
                    <span class="operation" @click="handleCancel(scope.row,2)" v-else> <i class="icon icon4 el-icon-timer"></i>注销</span>

                    <span class="operation" v-if="scope.row.status===3"></span>
                    <span class="operation" @click="handleEditUser(scope.row)" v-else>
                        <i class="icon icon3 el-icon-time"></i>修改用户
                    </span>
                </template>
            </win_table_column>
        </win_table>
        <win_pagination name="user" v-bind:childMsg="userReqVo.userPageVO" @callFather="userPageQuery"></win_pagination>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";

import {
    win_table,
    win_table_column,
    win_pagination
} from "@win-frond-frameworks/biz-common";
import { debuglog } from "util";
import { UserReqVO, UserClass } from "../vo/UserVO";
import PageVO from "../../common/vo/PageVO";
@Component({
    components: {
        win_table,
        win_table_column,
        win_pagination
    }
})
export default class UserTable extends Vue {
    @Prop()
    userReqVo: UserReqVO;

    handleEditUser(row, column) {
        this.userReqVo.user = row;
        this.userReqVo.stateController.switchFormType = "EditUser";
    }
    handleAuth() {}

    /*用户冻结*/

    handleForbidden(row) {
        this.userReqVo.user = row;
        this.userReqVo.stateController.switchFormType = "ForbidUser";
    }

    /*用户密码重置*/
    handleReset(row) {
        this.userReqVo.user = row;
        this.userReqVo.stateController.switchFormType = "ResetPassword";
    }
    /*用户注销*/

    handleCancel(row, type) {
        this.userReqVo.isUserTypeDelete = type; //1代表剔除用户2代表注销用户
        this.userReqVo.user = row;
        this.userReqVo.stateController.switchFormType = "CancelUser";
    }
    /*用户赋权*/
    handleUserRole(row) {
        this.userReqVo.user = row;
        this.userReqVo.stateController.switchFormType = "UserRoleRight";
    }

    @Emit("userPageQuery")
    userPageQuery(vo: PageVO) {
        return vo;
    }

    formatRoleName({ cellValue, row, rowIndex, column, columnIndex }) {
        let roleName = "";
        row.roleNames.forEach(element => {
            roleName += element.roleName + " ";
        });
        return roleName;
    }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
.table-contanier {
    max-height: 700px;
    // background: red;
}
span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    width: 82px;
    cursor: pointer;
}
.operation {
    display: inline-block;
    vertical-align: middle;
    margin-right: 14px;
    &:hover {
        color: #fff;
    }
}
.icon {
    display: inline-block;
    margin-right: 8px;
}
.icon1 {
    color: #f58a0d;
}
.icon2 {
    color: #4d65c3;
}
.icon3 {
    color: #33cc33;
}

.icon4 {
    color: #ff4c4c;
}
</style>