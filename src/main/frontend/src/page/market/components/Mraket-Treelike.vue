/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-06-04 09:55:59 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2019-06-04 09:55:59 
 */

<template>
    <div class="treelike-container">
        <!-- <div class="input-ui">
            <input type="text" placeholder="进行动态模糊搜索">
        </div>-->
        <div class="group">
            <div
                class="treelike-one"
                v-for="(item,index) in menuList"
                :key="item.company"
                @click="handleChange(item,index)"
            >
                <p :class="['treelike-one-title' , {'active':changeIndex===index}]">{{item.company}}</p>
                <div class="treelike-two" v-if="changeIndex===index">
                    <div v-for="department in item.departments" :key="department.title">
                        <span class="treelike-two-title">
                            <span class="department-title">{{department.title}}</span>
                        </span>
                        <div class="treelike-three">
                            <p v-for="position in department.positions" :key="position">{{position}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component({})
export default class Bread extends Vue {
    changeIndex: number = 1;
    @Prop({
        default() {
            return [
                {
                    company: "A-赢和基金管理公司",
                    departments: [
                        {
                            title: "综合部综合部综合部",
                            positions: ["经理", "员工"]
                        },
                        { title: "综合部2", positions: ["经理", "员工"] }
                    ]
                },
                {
                    company: "b-赢和基金管理公司",
                    departments: [
                        { title: "综合部", positions: ["经理", "员工"] },
                        { title: "综合部2", positions: ["经理", "员工"] }
                    ]
                }
            ];
        }
    })
    menuList: [];
    handleChange(item, index) {
        this.changeIndex = index;
        this.$emit("treeLikeClick", item);
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.input-ui {
    width: 188px;
    height: 40px;
    line-height: 40px;
    background: #3f3f3f;
    border-radius: 4px;
    margin: 0 auto 0;
    input {
        border: none;
        background: none;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        font-size: 16px;
        color: #fff;
    }
}
.treelike-container {
    width: 212px;
    height: 966px;
    background: #2a2a2a;
    color: #adb5bb;
    cursor: pointer;
    padding-top: 10px;
    .group {
        .treelike-one {
            .treelike-one-title {
                position: relative;
                padding: 6px 20px 6px 20px;
                font-size: 18px;
                text-align: center;
                border-right: 4px solid transparent;
                box-sizing: border-box;
                &::before {
                    content: "";
                    position: absolute;
                    top: 18px;
                    left: 6px;
                    height: 0;
                    width: 0;
                    border: 4px solid transparent;
                    border-top-color: #adb5bb;
                }
                &.active {
                    border-right: 4px solid $color-orange;
                    &::before {
                        border-left-color: $color-orange;
                        border-top-color: transparent;
                    }
                }
            }

            .treelike-two {
                .treelike-two-title {
                    display: inline-block;
                    position: relative;
                    width: 80%;
                    padding: 5px 0;
                    font-size: 16px;
                    text-align: right;
                    .department-title {
                        position: relative;
                        &::before {
                            content: "";
                            position: absolute;
                            left: 6px;
                            height: 0;
                            width: 0;
                            border: 4px solid transparent;
                            border-top-color: #adb5bb;
                            top: 8px;
                            left: -14px;
                        }
                    }
                }

                .treelike-three {
                    p {
                        width: 80%;
                        padding: 5px 0;
                        font-size: 16px;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>