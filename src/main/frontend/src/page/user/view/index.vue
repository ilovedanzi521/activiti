<template>
    <div>
        <div class="menu-content">
            <win_tabs v-model="activeName">
                <win_tab label="首页" name="home"></win_tab>
                <win_tab label="机构及用户管理" name="organizational"></win_tab>
            </win_tabs>
        </div>
        <div>
            <win_tree :data="companyArray" node-key="id" :default-expanded-keys="[1, 4]"></win_tree>
        </div>
        <div :style="{'position':'absolute','left':'224px','right':0}">
            <div class="content">
                <div class="fl"></div>
                <div class="rl">
                    <dl class="searchList">
                        <dt>赢和基金员工管理</dt>
                        <dd>
                            <span class="cop">公司</span>
                            <span class="btngrounp">
                                <button class="but" @click="handleAddCom">新增公司</button>
                                <button class="but">编辑公司</button>
                                <button class="but">删除公司</button>
                            </span>
                            <span class="cop">部门</span>
                            <span class="btngrounp">
                                <button class="but" @click="handleAddDep">新增部门</button>
                                <button class="but">编辑部门</button>
                                <button class="but">删除部门</button>
                            </span>
                            <span class="cop">用户</span>
                            <span class="btngrounp">
                                <button class="but" @click="handleAddUser">新增用户</button>
                                <button class="but">用户导出</button>
                            </span>
                        </dd>
                    </dl>
                    <div class="serch-container">
                        <input class="input">
                        <!-- <span class="showTypeGroup">
                        <i class="showType"></i>
                        <i class="showType2"></i>
                        </span>-->
                    </div>
                    <div class="test"></div>
                </div>
            </div>

            <div>
                <win_table style="width: 100%">
                    <win_table_column prop="date" label="序号" width="180"></win_table_column>
                    <win_table_column prop="name" label="用户编码" width="180"></win_table_column>
                    <win_table_column prop="address" label="用户名"></win_table_column>
                    <win_table_column prop="address" label="隶属角色"></win_table_column>
                    <win_table_column prop="address" label="联系方式"></win_table_column>
                    <win_table_column prop="address" label="手机号"></win_table_column>
                    <win_table_column prop="address" label="邮箱"></win_table_column>
                    <win_table_column prop="address" label="所属部门"></win_table_column>
                    <win_table_column prop="address" label="状态"></win_table_column>
                    <win_table_column prop="address" label="操作"></win_table_column>
                </win_table>
            </div>
        </div>

        <component :is="userReqVo.formType" @cliclClose="handleFromClose" @addCom="comParams"></component>
    </div>
</template>

<script lang="ts">
import UserController from "../controller/userController";
export default class UserView extends UserController {
    activeName: string = "organizational";
    data: any = "222";
    companyArray: any[] = [
        {
            id: 1,
            label: "默认公司",
            children: [
                {
                    id: 4,
                    label: "默认部门",
                    children: [
                        {
                            id: 9,
                            label: "默认职位"
                        },
                        {
                            id: 10,
                            label: "默认职位"
                        }
                    ]
                }
            ]
        }
    ];
    userList: any = [
        { title: "首页", path: "" },
        { title: "机构及用户管理", path: "panel2" }
    ];
    inputval: string = "";
}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
.menu-content {
    border-bottom: 1px solid #f58a0d;
}
.test {
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
            padding: 0 0 12px 0;
            box-sizing: border-box;
            dt {
                float: left;
                font-size: 16px;
                color: #fff;
                margin-top: 20px;
            }
            dd {
                padding: 10px 30px;
                margin-left: 176px;
                background: #2b3451;
                .but {
                    display: inline-block;
                    border: none;
                    padding: 8px 30px;
                    background: transparent;
                    font-size: 16px;
                    color: #adb5bb;
                    cursor: pointer;
                }
                .cop {
                    display: inline-block;
                    vertical-align: middle;
                    color: #fff;
                    font-size: 16px;
                    margin-right: 6px;
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