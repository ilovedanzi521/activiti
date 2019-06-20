/* @ dialog 提示弹出框
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-29 10:30:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-29 19:14:17
 */

<template>
    <section class="mask">
        <div class="dialog">
            <header class="dialog-header">{{content}}</header>
            <section class="btn-group">
                <span
                    :class="['btn',item.className ]"
                    v-for="(item, index) in getButtons"
                    :key="item.title"
                    @click="handleClick(index)"
                >{{item.title}}</span>
            </section>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Dialog extends Vue {
    @Prop({ default: "the-dialog" })
    name: string;

    @Prop({ default: "the-content" })
    content: string;

    @Prop({
        default() {
            return [
                { title: "取消", className: "cancel" },
                { title: "确定", className: "submit" }
            ];
        }
    })
    buttons: any;

    @Prop({ default: 2 })
    num: number;

    get getButtons() {
        let buttonsList = this.buttons;
        let num = this.num;
        console.log(buttonsList);
        if (num == 2) {
            return buttonsList;
        } else if (num === 1) {
            buttonsList.splice(0, 1);
            return buttonsList;
        }
    }

    handleClick(index) {
        if (this.num === 1) {
            this.$emit("dSubmitClick");
        } else {
            if (index === 0) {
                this.$emit("dCancelClick");
            } else {
                this.$emit("dSubmitClick");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.mask {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    .dialog {
        position: relative;
        top: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 360px;
        height: 132px;
        padding: 32px 0 15px;
        border: 1px solid $color-orange;
        border-radius: $radius4px;
        background: #323952;
        text-align: center;
        box-sizing: border-box;
        .dialog-header {
            font-size: 14px;
            font-weight: 400;
            color: $color-white;
        }
        .btn-group {
            font-size: 0;
            .btn {
                display: inline-block;
                width: 74px;
                height: 32px;
                line-height: 32px;
                vertical-align: middle;
                border-radius: $radius4px;
                font-size: $font-size5;
                cursor: pointer;
                &.submit {
                    margin-left: 14px;
                    color: $color-white;
                    border: 1px solid $color-orange;
                    background: $color-orange;
                }
                &.cancel {
                    color: #999999;
                    border: 1px solid #999999;
                    background: transparent;
                }
            }
        }
    }
}
</style>