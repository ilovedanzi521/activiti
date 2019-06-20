/* @全局左侧边框组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>
<div>
  <section class="aside-container" >
    <div>
      <p :class="['icon' ,item.icon, {'active':index===firstMenuIndex}]"   v-for="(item,index) in firstMenuList" :key="item.title"  @click="handleSecondMeunOpen(index)"></p>
    </div>
  </section>
 
      <!--二级菜单--> 
      <SecondMeun v-if="secondMeunIsOpen" :secondMenuIndex="firstMenuIndex" @menuClickChange="handleFristMenuIndex" @meunClickClose="handleMenuClose"></SecondMeun> 
      <!--二级菜单--> 
  
 </div> 
</template>

<script>
import SecondMeun from "./LMenu"
export default {
  name:"l-name",
  components:{ SecondMeun },
  data(){
    return{
      //一级菜单数据列表
      firstMenuList:[
        {id:"1",title:"xxx1",icon:"icon-28"},
        {id:"2",title:"xxx2", icon:"icon-1"},
        {id:"3",title:"xxx3",icon:"icon-35"},
        {id:"4",title:"xxx4",icon:"icon-33"},
        {id:"5",title:"xxx5", icon:"icon-7"},
        {id:"6",title:"xxx6",icon:"icon-9"},
        {id:"7",title:"xxx7",icon:"icon-13"},
        {id:"8",title:"xxx8",icon:"icon-12"},
        {id:"9", title:"xxx0",icon:"icon-6"}],
      //控制二级菜单显示隐藏的数据  
      secondMeunIsOpen:false,
      //选中一级菜单索引
      firstMenuIndex:0,
    }},
  methods:{
    /**打开二级菜单，并且更改选中的二级菜单索引 */
    handleSecondMeunOpen(index){
      this.firstMenuIndex=index
      this.secondMeunIsOpen=true;
    },
    /**选中二级菜单派发事件改变一级菜单方法 */
    handleFristMenuIndex(res){
       this.firstMenuIndex=res
    },
    /**关闭二级菜单 */
    handleMenuClose(){
      this.secondMeunIsOpen=false
    } }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/theme.scss";
  .aside-container{
      position: absolute;
      left: 0;
      top:48px;
      bottom:0;
      width: 70px;
      background: $color-assist;
      text-align: center;
      font-size: 20px;
      .icon{
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
        &.active{
          background: #1F2640;
           &::before{
            color:$color-orange;
          }}}
  .menu-first{
    position: absolute;
    left:70px;
    top:0;
    bottom: 0;
    width: 130px;
    background: #0A0F0E;
    li{
        display: flex;
        height: 52px;
        padding-right: 18px;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        color: #ADB5BB;
        font-size: 14px;
        box-sizing: border-box;
        cursor: pointer;
        &.active{
         color:$color-orange;   
         background: #1F2640;
         .icon-14::before{
           color:$color-orange
         }}}}
       }
    
</style>
