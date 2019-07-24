/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月10日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: TradeMarketController
 * 文件描述: @Description: (证券tab)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { Component, Prop } from "vue-property-decorator";
import TradeMarketController from "../controller/TradeMarketController";
@Component({ components: {} })
export default class SecurityInfoController extends TradeMarketController {
    public radioSecurity: any = "securityBasicInfo";
    public classifications: any[] = [
        { label: "证券基础信息", name: "securityBasicInfo" },
        { label: "债券属性", name: "bond" },
        { label: "投资基金属性", name: "paramFund" },
        { label: "回购参数", name: "paramRepo" }
    ];
    public changeItem(tab, event) {
        this.$router.push({ path: tab.name });
    }
}
