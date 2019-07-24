/* @二级导航组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>
    <section class="menu-container">
        <div>
            <div class="menu-panel">
                <div class="menu-second">
                    <dl class="second-menu-floor" v-for="(item) in layoutReqVO.secondMenus[layoutReqVO.firstMenuIndex]" :key="item.id" v-show="item.children && item.children.length > 0">
                        <div>{{layoutReqVO.firstIndex}}</div>
                        <dt>{{item.menuName}}</dt>
                        <dd v-for="(menuItem) in item.children" :key="menuItem.menuName">
                            <span @click="gotoMenuPath(menuItem,item)" :class="{'noAddress':!menuItem.menuAddress}">{{menuItem.menuName}}</span>
                            <i :class="['icon-11' ,{'active':menuItem.collect}]" @click="handleToggleFast(menuItem)"></i>
                        </dd>
                    </dl>
                </div>
                <span class="close icon-2" @click="closeSecondMenus"></span>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { LayoutReqVO } from "./vo/LayoutVO";

@Component({})
export default class SecondMenus extends Vue {
    @Prop()
    layoutReqVO: LayoutReqVO;

    /**
     *添加菜单到快速导航栏
     * */
    @Emit("toggleFastItem")
    handleToggleFast(item) {
        return item;
    }

    /**
     *
     *跳转点击菜单
     *
     * */
    @Emit("gotoPath")
    gotoMenuPath(item) {
        return item;
    }
    close() {
        this.closeSecondMenus();
    }

    /**
     *关闭当前菜单
     *
     * */

    closeSecondMenus() {
        this.layoutReqVO.stwichController.switchsScondMeunIsDetailed = false;
        this.layoutReqVO.secondMeunIsOpen = false;
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/element.scss";
.menu-container {
    overflow-y: auto;
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

    .menu-panel {
        position: relative;
        max-width: 800px;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 12px 50px;
        background: #1f2640;
        box-sizing: border-box;
        .lately {
            dt {
                margin-bottom: 16px;
                font-size: 12px;
                font-weight: bolder;
                color: $color-orange;
            }
            dd {
                display: inline-block;
                margin: 0 130px 10px 0;
                vertical-align: middle;
                font-size: 12px;
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
                width: 175px;
                &:last-of-type {
                    margin-right: 0;
                }
                dt {
                    margin-bottom: 16px;
                    font-size: 14px;
                    color: $color-orange;
                    cursor: pointer;
                }
                dd {
                    margin-bottom: 24px;
                    font-size: 14px;
                    cursor: pointer;
                    color: $color-white;
                    position: relative;
                    cursor: pointer;
                    & span.noAddress {
                        color: #999;
                        &:hover {
                            color: #999;
                            & + .icon-11 {
                                &::before {
                                    opacity: 0;
                                }
                            }
                        }
                    }
                    span,
                    i {
                        display: inline-block;
                        vertical-align: middle;

                        &.icon-11 {
                            position: absolute;
                            right: 44px;
                            top: 4px;

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
        right: 30px;
        color: #1f2640;
        cursor: pointer;
        &:hover {
            color: $color-orange;
        }
    }
}
</style>
