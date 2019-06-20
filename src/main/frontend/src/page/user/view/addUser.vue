<template>
    <div class="mask">
        <div class="dialogFrom-contaier">
            <div class="header">
                <span class="header-title">新增用户</span>
                <span class="header-close" @click="handleClose">✕</span>
            </div>
            <div class="content">
                <p>
                    <span>
                        <label for="usercode" class="label">用户编码</label>
                        <input type="text" class="input" id="usercode">
                    </span>
                    <span>
                        <label for="cop" class="label required">所属公司</label>
                        <input type="text" class="input" id="cop">
                    </span>
                </p>
                <p>
                    <span>
                        <label for="user" class="label required">用户名</label>
                        <input type="text" class="input" id="user">
                    </span>
                    <span>
                        <label for="dep" class="label required">隶属部门</label>
                        <input type="text" class="input" id="dep">
                    </span>
                </p>
                <p>
                    <span>
                        <label for="email" class="label required">邮箱</label>
                        <input type="text" class="input" id="email">
                    </span>
                    <span>
                        <label for="role" class="label required">隶属角色</label>
                        <input type="text" class="input" id="role">
                    </span>
                </p>
                <p>
                    <span>
                        <label for="uesrtype" class="label required">用户类别</label>
                        <input type="text" class="input" id="uesrtype">
                    </span>
                    <span>
                        <label for="uesrstatus" class="label required">用户状态</label>
                        <input type="text" class="input" id="uesrstatus">
                    </span>
                </p>
                <p>
                    <span>
                        <label for="tel" class="label required">联系方式</label>
                        <input type="text" class="input" id="tel">
                    </span>
                    <span>
                        <label for="ipoh" class="label required">手机号码</label>
                        <input type="text" class="input" id="ipoh">
                    </span>
                </p>
            </div>
            <div class="footer">
                <button @click="handleClose">取消</button>
                <button class="submit">确认</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component({})
export default class FromDialog extends Vue {
    handleClose() {
        this.$emit("cliclClose");
    }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/theme.scss";
@import "../../../assets/style/element.scss";
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    .dialogFrom-contaier {
        padding: 20px 32px 26px;
        border: 1px solid $color-orange;
        border-radius: 4px;
        background: #494949;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            padding-bottom: 8px;
            font-size: 18px;
            color: #fff;
            font-weight: bold;
            font-weight: bolder;
            border-bottom: 2px solid #707070;
            .header-close {
                cursor: pointer;
            }
        }
        .footer {
            padding: 28px 0 0;
            margin-top: 16px;
            text-align: center;
            border-top: 2px solid #707070;
            button {
                @include button();
                &:last-of-type {
                    margin-left: 16px;
                }
                &.submit {
                    @include button($bg: #ff900d, $color: #fff);
                }
            }
        }
        .content {
            p {
                display: flex;
                margin-bottom: 16px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                span {
                    display: inline-block;
                    label,
                    input {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 4px;
                        &.input {
                            width: 220px;
                            height: 40px;
                            padding-left: 6px;
                            line-height: 40px;
                            background: #494949;
                            border: none;
                            color: #fff;
                            border: 1px solid #adb5bb;
                            border-radius: 4px;
                            box-sizing: border-box;
                        }
                        &.label {
                            color: #adb5bb;
                            font-weight: bolder;
                            margin-right: 6px;
                            position: relative;
                            width: 60px;
                            text-align: right;
                            &.required {
                                &::after {
                                    content: "*";
                                    position: absolute;
                                    color: red;
                                    right: -6px;
                                    top: -4px;
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