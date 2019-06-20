import Vue from "vue";
import { Component } from "vue-property-decorator";
import MarketService from "../service/MarketService";
import { WinResponseData } from "../../common/vo/BaseVO";
import {
    ExchangeMarketRepVO,
    ExchangeMarketReqVO,
    TransactionDirectionReqVO,
    TransactionDirectionRepVO,
    SecurityTypeReqVO,
    SecurityTypeRepVO
} from "../bean/ExchangeMarketVO";
import TSearch from "@/components/Trade-Search.vue";
import TButton from "@/components/Trade-Button.vue";
import TTable from "@/components/Trade-Table.vue";
import { WinRspType } from "../../common/enum/BaseEnum";
@Component({ components: { TSearch, TButton, TTable } })
export default class MarketController extends Vue {
    service: MarketService = new MarketService();

    details: ExchangeMarketRepVO = new ExchangeMarketRepVO();
    finlMarketRepVO: ExchangeMarketRepVO = new ExchangeMarketRepVO();
    updateVo: ExchangeMarketReqVO = new ExchangeMarketReqVO();

    directionReqVO: TransactionDirectionReqVO = new TransactionDirectionReqVO();
    directionList: Array<TransactionDirectionRepVO> = [];

    typeReqVO: SecurityTypeReqVO = new SecurityTypeReqVO();
    typeReqList: Array<SecurityTypeRepVO> = [];

    modifyFlag: boolean = true;
    mounted() {
        this.$nextTick(() => {
            this.query();
        });
    }
    modify() {
        this.modifyFlag = false;
    }

    cancel() {
        this.modifyFlag = true;
        this.details = this.copy(this.finlMarketRepVO);
    }

    query() {
        let marketCode = "SZ";
        this.service
            .queryMarketDetail(marketCode)
            .then((winResponseData: WinResponseData) => {
                this.finlMarketRepVO = this.copy(winResponseData.data);
                this.details = winResponseData.data;
            });
    }

    update() {
        this.updateVo = this.copy(this.details);
        this.service.update(this.updateVo);
        this.modifyFlag = true;
    }

    queryTransactionDirection() {
        this.service
            .queryTransactionDirection(this.directionReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.directionList = winResponseData.data.list;
                }
            });
    }

    querySecurityType() {
        this.service
            .querySecurityType(this.typeReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.typeReqList = winResponseData.data.list;
                }
            });
    }

    copy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    detail() {}
}
