/* @全局头部组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>
    <section class="header-container">
        <div class="logo-container" @click="handleGoLogin">
            <img src="../assets/image/logo.png" width="33" height="35">
            <span class="logo-text">赢时胜</span>
            <!---快速区域---->
            <Fast></Fast>
            <!---快速区域---->
        </div>
        <div class="user-container">
            <span :class="['has', 'icon-22']" @click="handleOpenCard"></span>
            <span class="user-img">
                <img src="../assets/image/user.png" width="28" height="28">
            </span>
            <span class="user">用户_操作员</span>
            <i class="more-userinfo"></i>
        </div>
        <!---消息区域---->
        <div class="card-container" v-if="cavrIsOpen">
            <Cavr></Cavr>
        </div>
        <!---消息区域---->
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Fast from "./LFast.vue";
import Cavr from "@/components/Trade-Card.vue";

@Component({ components: { Fast, Cavr } })
export default class Header extends Vue {
    cavrIsOpen: boolean = false;

    //切换消息框开关
    handleOpenCard() {
        this.cavrIsOpen = !this.cavrIsOpen;
    }
    handleGoLogin() {
        this.$router.push({
            path: "/login"
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.header-container {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    height: 48px;
    padding: 0 26px 0 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: $color-assist;
    padding-left: 16px;
    .logo-container {
        img,
        span {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            &.logo-text {
                margin-left: 24px;
                font-size: 20px;
                font-weight: bold;
                color: $color-white;
            }
        }
    }
    .user-container {
        span {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            &.icon-22 {
                position: relative;
                height: 10px;
                padding-right: 20px;
                font-size: 14px;
                border-right: 1px solid #707070;
                &.has::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 18px;
                    width: 6px;
                    height: 6px;
                    background: $color-red;
                    border-radius: 50%;
                }
            }
            &.user-img {
                width: 28px;
                height: 28px;
                margin: 0 12px;
                border-radius: 50%;
            }
            &.user {
                font-size: 12px;
                color: $color-font6;
            }
            & + .more-userinfo {
                height: 0;
                width: 0;
                border: 6px solid transparent;
                border-top-color: #444e69;
                z-index: 9999;
                position: absolute;
                top: 22px;
                right: 10px;
                cursor: pointer;
            }
        }
    }
    .card-container {
        position: fixed;
        top: 40px;
        right: 106px;
        z-index: 100;
    }
}
</style>
