<template>
    <div class="ifram-content">
         <iframe v-if="item"  width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" :src="item" v-for="(item,index) in iframes" v-show="srcMenuAddress==item" :ref="'iframe'+item"></iframe>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";

@Component({
    computed: {
        ...mapState({
            menuAddress: (state: any) => state.directional.menuAddress,
            refreshAddress:(state:any)=>state.directional.refreshAddress,
            deleteAddress:(state:any)=>state.directional.deleteAddress,
            otherOnlyAddress:(state:any)=>state.directional.otherOnlyAddress
        })
    },
    watch: {
        menuAddress: {
            handler(newValue, oldValue) {
                this.handleMenuAddress(newValue, oldValue);
            }
        },
        refreshAddress:{
            handler(newValue,oldValue){
                if(this.refreshAddress==""){
                    return 
                }
                this.refFrame(newValue)
            }
        },
        deleteAddress:{
               handler(newValue,oldValue){
                this.deleteFrame(newValue)
            }
        },
        otherOnlyAddress:{
            handler(newValue,oldValue){
                this.deleteOtheFrame(newValue)

            }
        }
    
    }
})
export default class Directional extends Vue {
    iframes: [] = [];//页面不刷新，保存iframe里面的页面
    srcMenuAddress: string = "";//页面刷新更新新的页面
    /** 点击面板和tab键展示页面和切换页面*/
    handleMenuAddress(newValue, oldValue) {
        let srcMenuAddressFindIndex=-1
        this.srcMenuAddress = newValue;
          for(let i=0;i<this.iframes.length;i++){
              if(this.iframes[i]==this.srcMenuAddress){
                 srcMenuAddressFindIndex=i
              }
          }
          if(srcMenuAddressFindIndex>-1){
           return 
          }
          this.iframes.push(newValue)
    }
    /** tab删除触发的删除事假*/
    deleteFrame(newValue,oldValue){
       let srcMenuAddressFindIndex;
       for(let i=0;i<this.iframes.length;i++){
              if(this.iframes[i]==newValue){
                //  srcMenuAddressFindIndex=i
                 this.iframes[i]=""
                 return 
              }
          }
    }
    /** 删除其他吧其他的iframe删除*/
    deleteOtheFrame(newValue){
         for(let i=0;i<this.iframes.length;i++){
              if(this.iframes[i]!==newValue){
                this.iframes[i]=""
              }
          }
    }
    /** 双击tab触发的刷新面板*/
    refFrame(newValue){
          let v="iframe"+newValue
          this.$refs[v][0].contentWindow.location.reload(true);
          this.$store.commit("setRefreshAddress", "");
    }
    mounted() {
        this.srcMenuAddress = this.menuAddress;
        let that = this;
        let iframe = this.$refs.ifram;
        
        this.iframes.forEach((item,index)=>{
            let v="iframe"+srcMenuAddressFindIndex
            this.$refs[v][0].onload = function() {
             this.$refs[v][0].contentDocument.onclick = function() {
                 alert(111)
                that.$emit("closeAll");
            };
        }     
        })
    }
}
</script>
<style lang="scss" scoped>

.ifram-content {
    position: absolute;
    top: 0;
    bottom: 22px;
    right: 0;
    left: 0;
    .iframe-contanier{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
    iframe {
        position: absolute;
        // top: 10px;
        left: 0;
        bottom: 0;
        right: 0;
    }
}
</style>