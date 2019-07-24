/*
 * @Descripttion: 交易对手主页面controller
 * @Author: zoujian
 * @Date: 2019-07-10 14:30:05
 * @LastEditors: zoujian
 * @LastEditTime: 2019-07-10 17:22:43
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamRivalInfo from "@/page/rival/view/ParamRivalInfo.vue";
import ParamRivalTabs from "@/page/rival/view/ParamRivalTabs.vue";

@Component({ components: { ParamRivalInfo, ParamRivalTabs } })
export default class ParamRivalController extends BaseController {
    // 组件$refs引用声明
    public $refs!: {
        mainHeader: any;
    };

    // 下方tab标签显示控制
    private isTabsDisabled = true;
    // 关联关系展示控制图标
    private isShowClass: string = "";

    public mounted() {
        // 初始化控制图标
        this.isShowClass = "el-icon-caret-bottom";
    }

    /**
     * 是否展示关联信息控制事件
     */
    public showMore() {
        // 展示tab
        if (this.isTabsDisabled) {
            this.isShowClass = "el-icon-caret-top";
        } else {
            this.isShowClass = "el-icon-caret-bottom";
        }
        this.isTabsDisabled = !this.isTabsDisabled;
        this.$nextTick(() => {
            // 同步
            this.$store.commit("setShowMore", {
                flag: true,
                offsetTop: this.$refs.mainHeader.offsetTop
            });
        });
    }
}
