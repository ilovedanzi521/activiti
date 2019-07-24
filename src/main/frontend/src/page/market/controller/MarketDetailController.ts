import { Component, Prop } from "vue-property-decorator";
import { WinResponseData } from "../../common/vo/BaseVO";
import TradeMarketController from "./TradeMarketController";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import SecurityTypeDic from "../vo/SecurityTypeDic";

import { ExchangeMarketRepVO, ExchangeMarketReqVO } from "../vo/ParamMarketVO";

@Component({ components: {} })
export default class MarketDetailController extends TradeMarketController {
    @Prop({ default: "SZ" })
    public code: any;
    public details: ExchangeMarketRepVO = new ExchangeMarketRepVO();
    public finlMarketRepVO: ExchangeMarketRepVO = new ExchangeMarketRepVO();
    public updateVo: ExchangeMarketReqVO = new ExchangeMarketReqVO();
    public modifyFlag: boolean = true;
    public securityTypeDic: SecurityTypeDic = new SecurityTypeDic();
    beforeCreate() {}
    mounted() {
        this.getCountryDic();
    }
    modify() {
        this.modifyFlag = false;
    }

    cancel() {
        this.modifyFlag = true;
        this.details = this.copy(this.finlMarketRepVO);
    }

    /** 市场交易日 */
    getTradeDayTypeDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000121";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.tradeDayTypeDic = res.data;
            this.query();
        });
    }

    /** 国家地区 */
    getCountryDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000122";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.countryDic = res.data;
            this.getTimeZoneDic();
        });
    }
    /** 时区 */
    getTimeZoneDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000108";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.timeZoneDic = res.data;
            this.getTradeDayTypeDic();
        });
    }

    query() {
        this.service
            .queryMarketDetail(this.code)
            .then((winResponseData: WinResponseData) => {
                this.finlMarketRepVO = this.copy(winResponseData.data);
                this.details = winResponseData.data;
                for (
                    var i = 0;
                    i < this.securityTypeDic.tradeDayTypeDic.length;
                    i++
                ) {
                    if (
                        this.details.tradeDayType ==
                        this.securityTypeDic.tradeDayTypeDic[i].dicCode
                    ) {
                        this.details.tradeDayType = this.securityTypeDic.tradeDayTypeDic[
                            i
                        ].dicExplain;
                        break;
                    }
                }
                for (
                    var i = 0;
                    i < this.securityTypeDic.countryDic.length;
                    i++
                ) {
                    if (
                        this.details.country ==
                        this.securityTypeDic.countryDic[i].dicCode
                    ) {
                        this.details.country = this.securityTypeDic.countryDic[
                            i
                        ].dicExplain;
                        break;
                    }
                }
                for (
                    var i = 0;
                    i < this.securityTypeDic.timeZoneDic.length;
                    i++
                ) {
                    if (
                        this.details.timeZone ==
                        this.securityTypeDic.timeZoneDic[i].dicCode
                    ) {
                        this.details.timeZone = this.securityTypeDic.timeZoneDic[
                            i
                        ].dicExplain;
                        break;
                    }
                }
            });
    }

    update() {
        this.updateVo = this.copy(this.details);
        this.service.update(this.updateVo);
        this.modifyFlag = true;
    }
}
