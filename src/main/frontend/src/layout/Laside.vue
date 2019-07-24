/* @全局左侧边框组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>

  <section class="aside-container">
    <div>
      <p :class="['icon' ,item.menuIcon, {'active':item.id===layoutReqVO.firstMenuIndex}]" v-for="(item,index) in layoutReqVO.firstMents" :key="index" @mouseover="handleSecondMeunOpen(item.id)"></p>
    </div>
  </section>

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { LayoutReqVO } from "./vo/LayoutVO";
import { BaseConst } from "@win-frond-frameworks/trade-biz";
import _ from "lodash";

@Component({})
export default class FristMenus extends Vue {
  s = BaseConst.Add;
  @Prop()
  layoutReqVO: LayoutReqVO;
  handleSecondMeunOpen(id) {
    this.layoutReqVO.firstMenuIndex = id;
    this.layoutReqVO.secondMeunIsOpen = true;
  }
}

// };
</script>

<style lang="scss" scoped>
@import "../assets/style/element.scss";
.aside-container {
  position: absolute;
  left: 0;
  top: 48px;
  bottom: 0;
  width: 70px;
  background: $color-assist;
  text-align: center;
  font-size: 20px;
  .icon {
    height: 52px;
    line-height: 52px;
    cursor: pointer;
    //hover 后加
    // &:hover{
    //   background: #1F2640;
    //   &::before{
    //     color:$color-orange;
    //   }
    // }
    &.active {
      background: #1f2640;
      &::before {
        color: $color-orange;
      }
    }
  }
  .menu-first {
    position: absolute;
    left: 70px;
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
      &.active {
        color: $color-orange;
        background: #1f2640;
        .icon-14::before {
          color: $color-orange;
        }
      }
    }
  }
}
</style>
