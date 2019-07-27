<template>
    <div class="rightRole-contanier">
        <div class="text-contanier">
            <div class="rightRole-title">
                <span>权限管理</span>
                <span @click="closeUserRole" class="close">✖</span>
            </div>
            <div class="userContent">
                <div class="userTitle">
                    <span>当前功能</span>
                    <span>当前用户</span>
                    <span>所属公司</span>
                    <span>所属部门</span>
                    <span>隶属角色</span>
                </div>
                <div class="userIfon">
                    <span>菜单功能</span>
                    <span>{{userReqVo.user.userName}}</span>
                    <span>{{userReqVo.company.companyName}}</span>
                    <span>{{userReqVo.user.departmentName}}</span>
                    <span>{{getRole}}</span>
                </div>
            </div>

            <div class="rightRole-tabs">
                <el-tabs v-model="activeName">
                    <win_tab label="菜单功能" name="menu"></win_tab>
                </el-tabs>
            </div>

            <div class="changeMuen">

                <i>角色权限</i>

                <i>单个用户权限</i>

            </div>

            <div class="rightRole-content">
                <div class="rightRole-wrap" v-for="firstItem in userReqVo.roleRightArray" :key="firstItem.id">
                    <div class="rightRole-left">
                        <input type="checkbox" :checked="firstItem.checked" :id="firstItem.menuName" @change="changeFloorOne(firstItem)">
                        <label :for="firstItem.menuName">{{firstItem.menuName}}</label>
                    </div>

                    <div class="rightRole-right">
                        <div v-for="second in firstItem.children" :Key="second.id">
                            <div class="second-Catalog" v-for="three in second.children" :key="three.id">
                                <div class="three-Catalog">
                                    <input type="checkbox" :checked="three.checked" :id="three.menuName" @change="changeFloorSecond(firstItem,second,three)" :disabled="three.checked? true:false">
                                    <label :for="three.menuName">{{three.menuName}}</label>
                                    <div class='four-Catalog'>
                                        <span class="four-Catalog-item" v-for="four in three.children" :key="four.id">
                                            <input type="checkbox" :checked="four.checked" :id="four.menuName" @change="changeFloorTree(firstItem,second,three,four)" :disabled="four.checked? true:false">
                                            <label :for="four.menuName">{{four.menuName}}</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="roleRole-buttonGrounp">
                <win_button @click="closeUserRole">取消</win_button>
                <win_button @click="editRoleRight" type="primary">确定</win_button>
            </div>
        </div>
    </div>
</template>
   
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { win_button, win_tab } from "@win-frond-frameworks/biz-common";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import { UserReqVO } from "../vo/UserVO";
import RoleController from "../controller/roleContorller";
import userService from "../service/userService";

@Component({
    components: { win_button, win_tab }
})
export default class RoleRight extends Vue {
    dialogFormVisible: boolean = true;
    activeName: string = "menu";
    checkArray: any = [];
    checkedArray = [];
    @Prop()
    userReqVo: UserReqVO;
    @Prop()
    roleId: string;

    checkRoleRightArray = [];
    userList = [];
    /*** 添加选中的权限保存在checkRoleRightArray数组中*/
    checked(first, second, three, four) {
        let s = [];
        s.push(
            {
                id: first.id,
                menuType: second.menuType
            },
            {
                id: second.id,
                menuType: second.menuType
            },
            {
                id: three.id,
                menuType: second.menuType
            },
            {
                id: four.id,
                menuType: four.menuType
            }
        );
        // this.checkArray.push(s);
    }

    /*** 获取选中的roleRight*/
    getCheckRoleItem(array) {
        array.forEach(first => {
            if (first.checked) {
                first.children.forEach(second => {
                    second.children.forEach(three => {
                        three.children.forEach(four => {
                            this.checked(first, second, three, four);
                        });
                    });
                });
            } else {
                first.children.forEach(second => {
                    second.children.forEach(three => {
                        if (three.checked) {
                            three.children.forEach(four => {
                                this.checked(first, second, three, four);
                            });
                        } else {
                            three.children.forEach(four => {
                                if (four.checked) {
                                    this.checked(first, second, three, four);
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    closeUserRole() {
        this.userReqVo.stateController.switchFormType = "";
    }

    /** 点击确定按钮将角色权限复制给添加用户层*/
    editRoleRight() {
        this.checkArray.forEach((element, index) => {
            if (index == 0) {
                this.checkArray = [...element];
            } else {
                this.checkArray = [...this.checkArray, ...element];
            }
        });
        console.log(this.checkArray);
        this.$emit("editRoleRight", this.checkArray);
        this.closeUserRole();
    }

    /**发送请求获取已经选择的角色*/
    getRoleRight(roleId) {
        userService
            .getRoleRight(roleId)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.userReqVo.roleRightArray = winResponseData.data;
                    this.getCheckRoleItem(this.userReqVo.roleRightArray);
                    // console.log(this.checkArray);
                } else {
                    // this.errorMessage(winResponseData.msg);
                }
            });
    }

    /**获取角色名称*/
    get getRole(): string {
        let roles = "";
        this.userReqVo.user.roleNames.forEach(element => {
            roles += element.roleName + " ";
        });
        // roles = roles.substring(0, roles.length - 1);
        return roles;
    }

    mounted() {
        // this.getRoleRight(this.roleId);
        // this.getRoleRight(this.userReqVo.user.roleNames[0].roleId);
        console.log(this.userReqVo.user);
    }
}
</script>
<style lang="scss" scoped>
.rightRole-contanier {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    height: 100%;
    z-index: 99999;
    .close {
        cursor: pointer;
    }
    .userContent {
        width: 99%;
        margin: 10px auto;
        .userTitle {
            width: 100%;
            background: #68718e;
            span {
                display: inline-block;
                width: 200px;
                text-align: center;
                vertical-align: middle;
                line-height: 40px;
                color: #fff;
            }
        }
        .userIfon {
            width: 100%;
            background: #1b2441;
            span {
                display: inline-block;
                width: 200px;
                text-align: center;
                vertical-align: middle;
                line-height: 40px;
                color: #adb5bb;
            }
        }
    }

    .text-contanier {
        position: absolute;
        top: 14px;
        bottom: 14px;
        left: 20px;
        right: 20px;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #0b1431;
        border: 1px solid #ff900d;
        overflow: hidden;
    }
    input[disabled] {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        &:checked + label {
            color: #546fd8;
        }
    }
    input {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        &:checked + label {
            color: #ff4d4d;
        }
    }
    label {
        font-size: 14px;
        vertical-align: 0px;
        display: inline-block;
    }
    .close {
        cursor: pointer;
    }
    .rightRole-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #606266;
    }
    .rightRole-tabs {
        margin-top: 16px;
    }
    .roleRole-buttonGrounp {
        margin-top: 30px;
        text-align: center;
    }
    .rightRole-content {
        max-height: 600px;
        border-top: 1px solid #606266;
        border-bottom: 1px solid #606266;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #0b1431;

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

        .rightRole-wrap {
            display: table;
            background: #273049;
            border-bottom: 1px solid #606266;
            border-top: 1px solid #606266;
            cursor: pointer;
            &:hover {
                border-top: 1px solid #ff900d;
                border-bottom: 1px solid #ff900d;
            }
            &:nth-of-type(odd) {
                background: transparent;
            }
            .rightRole-left {
                display: table-cell;
                width: 300px;
                color: #fff;
                border-right: 1px solid #606266;
                height: 180px;
                vertical-align: middle;
                text-align: center;
            }
            .rightRole-right {
                display: table-cell;
                width: 90%;
                padding: 0 20px;
                vertical-align: middle;
                text-align: left;
                .second-Catalog {
                    font-size: 16px;
                    margin-bottom: 10px;
                    font-weight: bolder;
                    .three-Catalog {
                        font-size: 16px;
                        margin-bottom: 10px;
                        color: #fff;
                        font-weight: bolder;
                        .four-Catalog {
                            margin: 10px 0 10px 16px;
                            .four-Catalog-item {
                                display: inline-block;
                                vertical-align: middle;
                                margin-right: 8px;
                                label {
                                    font-weight: normal;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .close {
        cursor: pointer;
    }
    .changeMuen {
        position: absolute;
        right: 14px;
        top: 140px;
        i {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            color: #8d959a;
            font-style: normal;
            padding-left: 20px;
            font-size: 14px;
            &:nth-of-type(1) {
                margin-right: 30px;
                &::before {
                    background: #546fd8;
                }
            }
            &::before {
                content: "";
                position: absolute;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #ff4d4d;
                left: 0;
                top: 3px;
            }
        }
    }
}
</style>