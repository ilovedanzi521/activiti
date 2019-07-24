<template>
    <div>
        <div class="tree-content">
            <div class="text-content">
                <input type="text" placeholder="输入进行模糊搜索" v-model="filterText" disabled="true" />
            </div>
            <div class="tree-wrapp">
                <win_tree :data="userReqVo.companArray" node-key="id" :accordion="true" :default-expanded-keys="compayArray" :highlight-current="true" ref="tree" @node-click="handleNodeClick">
                </win_tree>
            </div>
        </div>
        <div class="table-content">
            <div class="content">
                <div class="fl"></div>
                <div class="rl">
                    <TabType :userReqVo="userReqVo" @handleAddDep="handleAddDep" @handleAddRole="handleAddRole" @handleAddRoleUser="handleAddRoleUser"></TabType>
                    <div class="serch-container">
                        <input class="input" placeholder="请动态进行模糊搜索" disabled="true">
                        <span class="showTypeGroup">
                            <span @click="getUserTable(item.userStateType)" v-for="(item,index) in userReqVo.userStateArray" :key="item.userStateText">
                                <i :class="[`showType${index}`,{'active':userReqVo.stateController.switchingUserState==item.userStateType}]"></i>
                                <em class="marginRight16">{{item.userStateText}}</em>
                            </span>
                        </span>
                    </div>
                    <div class="test"></div>
                </div>
            </div>

            <div>
                <UserTable :userReqVo="userReqVo" @forbidUser="httpForbidUser" @resetUser="httpResetUser" @cancelUser="httpCancelUser"></UserTable>
            </div>
        </div>
        <component :is="userReqVo.stateController.switchFormType" @addCom="httpAddCompany" @editCom="httpEditCompany" @addDep="httpAdddepartment" @editDep="httpEditdepartment" @adduser="httpAddUser" @edituser="httpEditUser"
            @changeDep="changeDep" @deletetCom="httpDeletetCom" @deleteDep="httpDeleteDepartment" @setDepartmentId="setDepartmentId" @handleShowRole="handleShowRole" @addRoleUserss="adduserRole" :userReqVo="userReqVo"
            @addRoleRight="addRoleRight" @httpEditRole="httpEditRole" @httpDeleteRole="httpDeleteRole" @httpForbidUser="httpForbidUser" @httpThawUser="httpThawUser" @httpCancelUser="httpCancelUser" @httpResetUserPassword="httpResetUser"
            @validateUserCode="httpValidateUserCode">
        </component>

    </div>
</template>

<script lang="ts">
import UserController from "../controller/userController";
import "../style/user.scss";
import { symlink } from "fs";
export default class UserView extends UserController {
    activeName: string = "organizational";
    switchingUserState;
    filterText = "";
    inputval: string = "";
}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
@import "../style/user.scss";
.tree-content {
    position: absolute;
    width: 212px;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 10px 0;
    background: #273049;
}
.text-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 52px;
    left: 0;
    color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    background: #273049;
    z-index: 3;

    input {
        display: block;
        width: 90%;
        padding-left: 6px;
        margin: 6px auto;
        height: 36px;
        border-radius: 4px;
        border: 1px solid #848993;
        background: transparent;
        color: #fff;
        box-sizing: border-box;
    }
}
.tree-wrapp {
    position: absolute;
    left: 0;
    top: 40px;
    bottom: 22px;
    overflow-y: auto;
    background: #273049;
    color: #adb5bb;
    width: 212px;
    z-index: 2;

    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }
    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
    }
}

.table-content {
    position: absolute;
    left: 224px;
    right: 0;
    top: 10px;
}
.content {
    .fl {
        float: left;
    }
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
                background: #495473;
                font-size: 16px;
            }
            .showTypeGroup {
                margin-right: 30px;
                .showType0 {
                    @include showType();
                    &.active + em {
                        color: #ff900d;
                    }
                }
                .showType1 {
                    @include showType($bg: #2f4cbd);
                    &.active + em {
                        color: #ff900d;
                    }
                }
                .showType2 {
                    @include showType($bg: #ffd3a0);
                    &.active + em {
                        color: #ff900d;
                    }
                }
                em,
                i {
                    display: inline-block;
                    vertical-align: middle;
                    color: #8d959a;
                    cursor: pointer;
                    &.marginRight16 {
                        margin-right: 46px;
                    }
                }

                i {
                    margin-right: 12px;
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
    }
}
</style>