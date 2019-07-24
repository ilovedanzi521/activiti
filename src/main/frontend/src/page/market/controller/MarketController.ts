import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { win_tree } from "@win-frond-frameworks/biz-common";
@Component({ components: { win_tree } })
export default class MarketController extends BaseController {
    mounted() {
        this.activeName = this.$route.name;
    }

    code = "SH";
    type: number = 1;
    activeName: string = "marketDetail";
    tabsFlag: boolean = true;
    path: String;

    data = [
        {
            name: "上交所",
            code: "SH",
            type: 1,
            children: [
                {
                    name: "上交所大宗交易平台",
                    code: 1,
                    type: 2
                },
                {
                    name: "上交所固定收益平台",
                    code: 2,
                    type: 2
                },
                {
                    name: "上交所普通平台",
                    code: 3,
                    type: 2
                }
            ]
        },
        {
            name: "深交所",
            code: "SZ",
            type: 1,
            children: [
                {
                    name: "深交所普通平台",
                    code: 4,
                    type: 2
                },
                {
                    name: "深交所综合协议平台",
                    code: 5,
                    type: 2
                }
            ]
        },
        {
            name: "银行间",
            code: "YH",
            type: 1,
            children: [
                {
                    name: "银行间本币交易平台",
                    code: 6,
                    type: 2
                }
            ]
        },
        {
            name: "场外",
            code: "CW",
            type: 1,
            children: [
                {
                    name: "场外交易平台",
                    code: 7,
                    type: 2
                }
            ]
        },
        {
            name: "沪港通",
            code: "HG",
            type: 1,
            children: [
                {
                    name: "香港普通交易平台",
                    code: 8,
                    type: 2
                }
            ]
        },
        {
            name: "深港通",
            code: "SG",
            type: 1,
            children: [
                {
                    name: "香港普通交易平台",
                    code: 8,
                    type: 2
                }
            ]
        }
    ];
    defaultProps = {
        children: "children",
        label: "name"
    };
    tabClick() {
        this.$router.push({
            path: `/market/${this.activeName}`
        });
    }
    handleNodeClick(data) {
        this.type = data.type;
        this.code = data.code;
        this.tabsFlag = this.type === 1;
        if (!this.tabsFlag) {
            this.activeName = "securityType";
        } else {
            this.activeName = "marketDetail";
        }
        this.$router.push({
            path: `/market/${this.activeName}`
        });
    }
    copy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }
}
