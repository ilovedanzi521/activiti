/* @ProductController 产品主页面controller
 * @Author: lixiuquan
 * @Date: 2019-06-23 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-23 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ProductInfo from "@/page/product/view/ProductInfo.vue";
import ProductTabs from "@/page/product/view/ProductTabs.vue";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { ConsignorTypeEnum } from "../enum/ProdFundEnum";
import ProductService from "../service/ProductService";

@Component({ components: { ProductInfo, ProductTabs } })
export default class ProductController extends BaseController {
    // 组件$refs引用声明
    public $refs!: {
        mainHeader: any;
    };
    // 产品主页面service
    private productService = new ProductService();

    // 目录结构数据
    private catalogData: any[] = [];
    private defaultProps = {
        children: "children",
        label: "name"
    };

    // 下方tab标签显示控制
    private isTabsDisabled = true;
    // 关联关系展示控制图标
    private isShowClass: string = "";

    public mounted() {
        // 初始化目录
        this.getCatalogList();
        // 初始化控制图标
        this.isShowClass = "el-icon-caret-bottom";
    }

    /**
     * 获取目录结构方法
     */
    public getCatalogList() {
        this.productService
            .findConsignorCatalog()
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.ERROR) {
                    this.win_message_error(res.msg);
                } else {
                    this.catalogData = res.data;
                }
            });
    }

    /**
     * 点击树结构,将点击目录的状态同步
     */
    public handleNodeClick(data: any) {
        // 当点击的是一级委托人目录时
        if (data.type === ConsignorTypeEnum.CONSIGNORTYPE) {
            // 二级委托人No
            let subConsNo = 0;
            if (data.children.length > 0) {
                subConsNo = data.children[0].no;
            }
            // 同步
            this.$store.commit("setMandator", {
                type: data.type,
                company: data.parentNo,
                firstMandator: data.no,
                secondMandator: subConsNo
            });
        }
        // 当点击的是二级委托人时
        if (data.type === ConsignorTypeEnum.SUBCONSIGNORTYPE) {
            // 同步
            this.$store.commit("setMandator", {
                type: data.type,
                company: 0,
                firstMandator: data.parentNo,
                secondMandator: data.no
            });
        }
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

    /**
     * 复制成json
     */
    public copy(arr: any) {
        return JSON.parse(JSON.stringify(arr));
    }
}
