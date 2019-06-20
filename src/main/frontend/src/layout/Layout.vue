<template>
    <div :class="$style.container">
        <!--头部--->
        <Header></Header>
        <!--头部--->
        <!--侧边栏--->
        <Aside></Aside>
        <!--侧边栏--->
        <!--右侧主边内容--->
        <Main>
            <!--路由页面切换--->
            <router-view></router-view>
            <!--路由页面切换--->
            <!--底部--->
            <Footer></Footer>
            <!--底部--->
        </Main>
        <!--右侧主边内容--->
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "./Lheader.vue";
import Aside from "./Laside.vue";
import Main from "./Lmain.vue";
import Footer from "./Lfooter.vue";

@Component({
    components: {
        Header,
        Aside,
        Main,
        Footer
    }
})
export default class App extends Vue {}
</script>
<style lang="scss" module>
@import "../assets/style/theme.scss";
.container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #0a0f0e;
    font-family: Microsoft YaHei;
    overflow: hidden;
}
</style>