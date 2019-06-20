/* @搜索控件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-30 16:17:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-31 02:38:32
 */
<template>
    <input
        :type="type"
        :class="['search',{'disabled':disabled}]"
        :placeholder="placeholder"
        :disabled="disabled"
    >
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Button extends Vue {
    @Prop({ default: "the-input" })
    name: string;

    @Prop({ default: "请输入内容" })
    placeholder: string;

    @Prop({ default: false })
    disabled: boolean;

    @Prop({ default: "text" })
    type: string;
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
.search {
    border: 0;
    background: none;
    width: 240px;
    height: 40px;
    line-height: 40px;
    padding: 15px;
    border: 1px solid #dcdfe6;
    border-radius: $radius4px;
    box-sizing: border-box;
    font-size: $font-size4;
    outline: none;
    cursor: pointer;
    &::-webkit-input-placeholder {
        color: $color-font3;
    }
    &:focus {
        border: 1px solid $color-orange;
    }
    &.disabled {
        background: $color-font5;
        color: $color-font3;
    }
}
</style>