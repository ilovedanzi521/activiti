/* @二级导航组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>
    <section class="menu-container">
        <ul class="menu-first">
            <li
                :class="{'active':secondMenuIndex===index}"
                v-for="( item,index ) in firstList"
                :key="item.title"
                @click="handleChangeTab(index)"
            >
                <span>{{item.title}}</span>
                <i class="icon-14"></i>
            </li>
        </ul>
        <transition enter-active-class="animated bounceInLeft ">
            <div>
                <div class="menu-panel">
                    <dl class="lately">
                        <dt>最近访问</dt>
                        <dd>产品基本信息</dd>
                        <dd>股票信息管理</dd>
                        <dd>股票信息管理</dd>
                    </dl>

                    <div class="menu-second">
                        <dl
                            class="second-menu-floor"
                            v-for="(item,parentIndex) in secondMeunList"
                            :key="item.title"
                        >
                            <dt>{{item.title}}</dt>
                            <dd v-for="(menuItem,index) in item.list" :key="menuItem.title">
                                <span>{{menuItem.title}}</span>
                                <i
                                    :class="['icon-11' ,{'active':menuItem.type}]"
                                    @click="handleAddFast(parentIndex,index,menuItem)"
                                ></i>
                            </dd>
                        </dl>
                    </div>
                </div>
                <span class="close icon-2" @click="handleCloseMenu"></span>
            </div>
        </transition>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Menu extends Vue {
    @Prop({
        default: [
            { title: "资产配置" },
            { title: "风险管理" },
            { title: "组合管理" },
            { title: "非标投资" },
            { title: "权益投资" },
            { title: "衍生品" },
            { title: "系统运维" },
            { title: "清结算" },
            { title: "其他" }
        ]
    })
    firstList: Array<any>;

    @Prop()
    secondMenuIndex: number;

    /***切换一级菜单选择卡 */
    handleChangeTab(index) {
        this.$emit("menuClickChange", index);
    }
    /***关闭二级菜单选择卡 */
    handleCloseMenu() {
        this.$emit("meunClickClose");
    }
    /***添加菜单去快速导航栏 */
    handleAddFast(parentIndex, index, item) {
        if (item.type == 1) {
            return;
        }
        this.$set(this.secondMeunList[parentIndex]["list"][index], "type", 1);
    }

    secondMeunList: [
        {
            title: "列表一";
            list: [
                {
                    class: "icon-35";
                    title: "资产配置1";
                    type: 1;
                    path: "/home";
                },
                {
                    class: "icon-35";
                    title: "资产配置2";
                    type: 0;
                    path: "/home";
                },
                {
                    class: "icon-35";
                    title: "资产配置3";
                    type: 1;
                    path: "/home";
                },
                {
                    class: "icon-35";
                    title: "资w产配置4";
                    type: 0;
                    path: "/home";
                },
                {
                    class: "icon-35";
                    title: "资产配置5";
                    type: 0;
                    path: "/home";
                }
            ];
        },
        {
            title: "列表二";
            list: [
                {
                    class: "icon-35";
                    title: "资产配置a";
                    type: 0;
                    path: "/home";
                },
                {
                    class: "icon-35";
                    title: "资产配置b";
                    type: 0;
                    path: "/home";
                },
                {
                    class: "icon-35";
                    title: "资产配置c";
                    type: 1;
                    path: "/home";
                },
                {
                    class: "icon-35";
                    title: "资w产配置d";
                    type: 0;
                    path: "/home";
                },
                {
                    class: "icon-35";
                    title: "资产配置e";
                    type: 0;
                    path: "/home";
                }
            ];
        }
    ];
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.menu-container {
    position: absolute;
    left: 70px;
    top: 48px;
    bottom: 22px;
    width: 918px;
    z-index: 4;
    .menu-first {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 130px;
        background: #0a0f0e;
        li {
            display: flex;
            height: 52px;
            padding-right: 18px;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            color: #adb5bb;
            font-size: 14px;
            box-sizing: border-box;
            cursor: pointer;
            .icon-14::before {
                color: transparent;
            }
            &.active {
                background: #1f2640;
                color: $color-orange;
                .icon-14::before {
                    color: $color-orange;
                }
            }
        }
    }

    .menu-panel {
        position: absolute;
        width: 788px;
        left: 130px;
        top: 0;
        bottom: 0;
        padding: 85px 51px;
        background: #1f2640;
        box-sizing: border-box;
        .lately {
            dt {
                margin-bottom: 16px;
                font-size: 16px;
                color: $color-orange;
            }
            dd {
                display: inline-block;
                margin: 0 130px 10px 0;
                vertical-align: middle;
                font-size: 14px;
                color: $color-white;
                cursor: pointer;
                &:hover {
                    color: $color-orange;
                }
                &:last-of-type {
                    margin-right: 0;
                }
            }
        }
        .menu-second {
            margin-top: 48px;
            overflow: hidden;
            .second-menu-floor {
                float: left;
                margin-right: 130px;
                &:last-of-type {
                    margin-right: 0;
                }
                dt {
                    margin-bottom: 16px;
                    font-size: 16px;
                    color: $color-orange;
                }
                dd {
                    margin-bottom: 24px;
                    font-size: $font-size4;
                    color: $color-white;
                    cursor: pointer;
                    span,
                    i {
                        display: inline-block;
                        vertical-align: middle;
                        &.icon-11 {
                            &::before {
                                opacity: 0;
                            }
                        }
                        &.icon-11.active {
                            + span {
                                color: $color-orange;
                            }
                            &::before {
                                opacity: 1;
                                color: $color-orange;
                            }
                        }
                    }
                    &:hover {
                        span {
                            color: $color-orange;
                        }
                        .icon-11 {
                            &::before {
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }
    }

    .close {
        position: absolute;
        top: 24px;
        right: 18px;
        color: #1f2640;
        cursor: pointer;
        &:hover {
            color: $color-orange;
        }
    }
}
</style>
