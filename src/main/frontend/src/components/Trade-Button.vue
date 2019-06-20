t/* @按钮控件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-30 16:16:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-31 02:42:18
 */
<template>
    <span :class="['button', type]" @click="handleClick">
        <slot></slot>
    </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Button extends Vue {
    @Prop({ default: "the-button" })
    name: string;

    @Prop()
    type: string;

    @Prop()
    activation: boolean;

    handleClick() {
        this.$emit("bClick");
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.button {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    vertical-align: middle;
    color: $color-white;
    font-size: $font-size4;
    border-radius: $radius4px;
    background: $color-orange;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        background: #e57c00;
    }
    &.activation {
    }
    &.medium {
        height: 36px;
        line-height: 36px;
    }
    &.small {
        height: 32px;
        line-height: 32px;
        font-size: $font-size5;
        border-radius: 3px;
    }
}
</style>