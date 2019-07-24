<template>
    <div class="rightRole-contanier">
        <div class="text-contanier">
            <div class="rightRole-title">
                <span>修改角色权限</span>
                <span @click="closeRole" class="close">✖</span>
            </div>
            <div class="rightRole-tabs">
                <el-tabs v-model="activeName">
                    <win_tab label="菜单功能" name="menu"></win_tab>
                </el-tabs>
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
                                    <input type="checkbox" :checked="three.checked" :id="three.menuName" @change="changeFloorSecond(firstItem,second,three)">
                                    <label :for="three.menuName">{{three.menuName}}</label>
                                    <div class='four-Catalog'>
                                        <span class="four-Catalog-item" v-for="four in three.children" :key="four.id">
                                            <input type="checkbox" :checked="four.checked" :id="four.menuName" @change="changeFloorTree(firstItem,second,three,four)">
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

                <win_button @click="closeRole">取消</win_button>
                <win_button @click="editRoleRight" type="primary">确定</win_button>
            </div>
        </div>

    </div>
</template>
   
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { win_button } from "@win-frond-frameworks/biz-common";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import { UserReqVO } from "../vo/UserVO";
import RoleController from "../controller/roleContorller";
import userService from "../service/userService";

@Component({
    components: { win_button }
})
export default class RoleRight extends RoleController {
    @Prop()
    userReqVo: UserReqVO;
    @Prop()
    roleId: string;

    checkRoleRightArray = [];

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
        this.checkArray.push(s);
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

    closeRole() {
        this.$emit("closeRole");
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
        this.closeRole();
    }

    /**发送请求获取已经选择的角色*/
    getRoleRight(roleId) {
        userService
            .getRoleRight(roleId)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.userReqVo.roleRightArray = winResponseData.data;
                    this.getCheckRoleItem(this.userReqVo.roleRightArray);
                    console.log(this.checkArray);
                } else {
                    // this.errorMessage(winResponseData.msg);
                }
            });
    }

    mounted() {
        this.getRoleRight(this.roleId);
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
    input {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        &:checked + label {
            color: #ff900d;
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
}
</style>