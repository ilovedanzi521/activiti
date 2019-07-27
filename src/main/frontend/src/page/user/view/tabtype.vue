<template>
    <dl class="searchList">
        <dt>{{setTitle}}管理</dt>
        <dd>
            <div v-if="userReqVo.changeType==1">
                <span class="cop">公司</span>
                <i class="hr"></i>
                <span class="btngrounp">
                    <button class="but" @click="handleAddCom">
                        <i class="icon el-icon-plus"></i>
                        <span>新增公司</span>
                    </button>
                    <button class="but" @click="handleEditCom">
                        <i class="icon el-icon-edit"></i>
                        <span>编辑公司</span>
                    </button>
                    <button class="but" @click="handleEditdeleteCom">
                        <i class="icon el-icon-delete"></i>
                        <span>删除公司</span>
                    </button>
                </span>
                <span class="cop">部门</span>
                <i class="hr"></i>
                <span class="btngrounp">
                    <button class="but" @click="handleAddDep">
                        <i class="icon el-icon-plus"></i>
                        <span>新增部门</span>
                    </button>
                </span>
                <span class="cop">用户</span>
                <i class="hr"></i>
                <span class="btngrounp">
                    <button class="but" @click="handleAddUser">
                        <i class="icon el-icon-user"></i>
                        <span>新增用户</span>
                    </button>
                    <!-- <button class="but">用户导出</button> -->
                </span>
            </div>

            <div v-if="userReqVo.changeType==2">
                <span class="type-title">{{userReqVo.department.departmentname}}</span>
                <span class="cop">部门</span>

                <i class="hr"></i>

                <span class="btngrounp">
                    <button class="but" @click="handleAddDep">
                        <i class="icon el-icon-plus"></i>
                        <span>新增部门</span>
                    </button>
                    <button class="but" @click="handleEditDep">
                        <i class="icon el-icon-edit"></i>
                        <span>编辑部门</span>
                    </button>-->
                    <button class="but" @click="handleDeleteDep">
                        <i class="icon el-icon-delete"></i>
                        <span>删除部门</span>
                    </button>
                </span>
                <span class="cop">角色</span>
                <i class="hr"></i>
                <span class="btngrounp">
                    <button class="but" @click="handleAddRole">
                        <i class="icon el-icon-plus"></i>
                        <span>新增部门角色</span>
                    </button>
                </span>
                <span class="cop">用户</span>
                <i class="hr"></i>
                <span class="btngrounp">
                    <button class="but" @click="handleAddUser">
                        <i class="icon el-icon-user"></i>
                        <span>新增用户</span>
                    </button>
                    <!-- <button class="but">用户导出</button> -->
                </span>
            </div>

            <div v-if="userReqVo.changeType==3">
                <span class="type-title">{{userReqVo.role.role}}</span>
                <span class="cop">角色</span>

                <i class="hr"></i>
                <span class="btngrounp">
                    <button class="but" @click="handleAddRole">
                        <i class="icon el-icon-plus"></i>
                        <span>新增角色</span>
                    </button>
                    <button class="but" @click="handleEditRole">
                        <i class="icon el-icon-edit"></i>
                        <span>修改角色</span>
                    </button>
                    <button class="but" @click="handledeleteRole">
                        <i class="icon el-icon-edit"></i>
                        <span>删除角色</span>
                    </button>
                    <button class="but" @click="handleAddRoleUser">
                        <i class="icon el-icon-plus"></i>
                        <span>新增用户角色</span>
                    </button>
                </span>
                <span class="cop">用户</span>
                <i class="hr"></i>
                <span class="btngrounp">
                    <button class="but" @click="handleAddUser">
                        <i class="icon el-icon-user"></i>
                        <span>新增用户</span>
                    </button>
                    <button class="but">用户导出</button>
                </span>
            </div>
        </dd>
    </dl>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { UserReqVO } from "../vo/UserVO";
@Component({})
export default class TabType extends Vue {
    @Prop()
    userReqVo: UserReqVO;
    @Emit("handleAddCom")
    /**增加系 */
    handleAddCom() {
        this.userReqVo.stateController.switchFormType = "AddCom";
    }
    @Emit("handleAddDep")
    handleAddDep() {
        this.userReqVo.stateController.switchFormType = "AddDep";
    }
    @Emit("handleAddRole")
    handleAddRole() {
        this.userReqVo.stateController.switchFormType = "AddRole";
    }

    @Emit("handleAddUser")
    handleAddUser() {
        this.userReqVo.stateController.switchFormType = "AddUser";
    }

    @Emit("handleAddRoleUser")
    handleAddRoleUser() {
        this.userReqVo.stateController.switchFormType = "AddRoleUser";
    }

    /**增加系 */

    /**编辑系 */

    @Emit("handleEditCom")
    handleEditCom() {
        this.userReqVo.stateController.switchFormType = "EditCom";
        this.userReqVo.stateController.switchCompany = false;
    }

    @Emit("handleEditDep")
    handleEditDep() {
        this.userReqVo.stateController.switchDepartment = false;
        this.userReqVo.stateController.switchFormType = "EditDep";
    }

    @Emit("handleEditDep")
    handleEditRole() {
        // this.userReqVo.stateController.switchDepartment = false;
        this.userReqVo.stateController.switchFormType = "EditRole";
    }

    /**编辑系 */

    /**删除系 */

    @Emit("handleDeleteCom")
    handleEditdeleteCom() {
        this.userReqVo.stateController.switchFormType = "EditCom";
        this.userReqVo.stateController.switchCompany = true;
    }

    @Emit("handleDeleteDep")
    handleDeleteDep() {
        this.userReqVo.stateController.switchDepartment = true;
        this.userReqVo.stateController.switchFormType = "EditDep";
    }

    handledeleteRole() {
        this.userReqVo.stateController.switchFormType = "DeleteRole";
    }

    /**删除系 */

    get setTitle() {
        if (this.userReqVo.changeType == 1) {
            return `${this.userReqVo.company.companyName} `;
        }
        if (this.userReqVo.changeType == 2) {
            return `${this.userReqVo.company.companyName}部门 `;
        }
        if (this.userReqVo.changeType == 3) {
            return `${this.userReqVo.company.companyName}角色 `;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";

.rl {
    // float: right;
    // width: 88%;
    .serch-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        .input {
            @include sinput();
        }
        .showTypeGroup {
            margin-right: 30px;
            .showType {
                @include showType();
            }
            .showType2 {
                @include showType($bg: #2f4cbd);
            }
        }
    }
    .searchList {
        width: 100%;
        padding: 0 0 10px 0;
        box-sizing: border-box;
        dt {
            float: left;
            font-size: 14px;
            color: #fff;
            width: 252px;
            background: transparent;
            text-align: center;
            height: 41px;
            line-height: 41px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        dd {
            height: 41px;
            line-height: 41px;
            margin-left: 252px;
            background: #2b3451;

            .but {
                display: inline-block;
                border: none;
                padding: 8px 16px;
                background: transparent;
                font-size: 14px;
                color: #adb5bb;

                cursor: pointer;
                &:hover {
                    color: #ff900d;
                }
            }
            .cop {
                display: inline-block;
                vertical-align: middle;
                color: #fff;
                font-size: 16px;
                padding-left: 24px;
                // border-left: 1px solid #fff;
                &:first-of-type {
                    border-left: 1px solid transparent;
                }
            }
        }
    }
    .type1 {
        display: inline-block;
        vertical-align: middle;
        color: #ff900d;
        margin-right: 6px;
    }
    .type2 {
        display: inline-block;
        vertical-align: middle;
        color: #4d65c3;
        margin-right: 6px;
    }
    .type3 {
        display: inline-block;
        vertical-align: middle;
        color: #33cc33;
        margin-right: 6px;
    }

    .type4 {
        display: inline-block;
        vertical-align: middle;

        color: #ff6f6f;
        margin-right: 6px;
    }
    .icon {
        padding-right: 8px;
        color: #f58a0d;
    }
    .hr {
        height: 13px;
        width: 1px;
        background: #707070;
        display: inline-block;
        position: relative;
        top: 4px;
        margin-left: 9px;
    }
    .type-title {
        color: #fff;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        padding: 0 16px;
        position: relative;
        top: 1px;
        color: #999;
    }
}
</style>