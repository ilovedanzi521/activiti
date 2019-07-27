import { Component } from "vue-property-decorator";
import TradeMarketController from "./TradeMarketController";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import SecurityTypeDic from "../vo/SecurityTypeDic";
import PageVO from "../../common/vo/PageVO";
import {
    TransactionDirectionReqVO,
    TransactionDirectionRepVO
} from "../vo/ParamMarketVO";

@Component({ components: {} })
export default class TransactionDirectionController extends TradeMarketController {
    public directionReqVO: TransactionDirectionReqVO = new TransactionDirectionReqVO();
    public directionList: TransactionDirectionRepVO[] = [];
    private dic: DicReqVO = new DicReqVO();
    public securityTypeDic: SecurityTypeDic = new SecurityTypeDic();
    public directionCodes: Array<TransactionDirectionRepVO> = [];
    public pageVO: PageVO = new PageVO();

    public mounted() {
        this.getMarketDic();
        this.queryTransactionDirection();
        this.getDeclarePathDic();
        this.getFundsPathDic();
        this.getSecurityPathDic();
        this.getEffectSecurityDic();
        this.getRelationChangePathDic();
        this.getRelationEffectSecurityDic();
        this.queryDirectionCode();
    }

    /** 交易市场 */
    getMarketDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000102";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.marketDic = res.data;
        });
    }

    /** 申报方向 */
    getDeclarePathDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000109";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.declarePathDic = res.data;
        });
    }

    /** 资金方向 */
    getFundsPathDic() {
        this.dic.parentDicCode = "1000110";
        this.dicService.dicAllSubList(this.dic).then((res: WinResponseData) => {
            this.securityTypeDic.fundsPathDic = res.data;
        });
    }
    /** 证券方向 */
    getSecurityPathDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000111";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.securityPathDic = res.data;
        });
    }

    /** 影响证券 */
    getEffectSecurityDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000112";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.effectSecurityDic = res.data;
        });
    }

    /** 关联变动方向 */
    getRelationChangePathDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000113";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.relationChangePathDic = res.data;
        });
    }
    /** 关联影响证券 */
    getRelationEffectSecurityDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000114";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.relationEffectSecurityDic = res.data;
        });
    }

    /**交易市场，表格显示 */
    marketFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(cellValue, this.securityTypeDic.marketDic);
    }

    /**申报方向，表格显示 */
    declarePatFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.declarePathDic
        );
    }

    /**资金方向，表格显示 */
    fundsPathFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(cellValue, this.securityTypeDic.fundsPathDic);
    }

    /**证券方向，表格显示 */
    securityPathFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.securityPathDic
        );
    }

    /**影响证券，表格显示 */
    effectSecurityFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.effectSecurityDic
        );
    }

    /**关联变动方向，表格显示 */
    relationChangePathFormatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
    }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.relationChangePathDic
        );
    }

    /**关联影响证券，表格显示 */
    relationEffectSecurityFormatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
    }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.relationEffectSecurityDic
        );
    }
    public pageQuery(pageVO: PageVO) {
        this.directionReqVO.reqPageNum = pageVO.pageNum;
        this.directionReqVO.reqPageSize = pageVO.pageSize;
        this.queryTransactionDirection();
    }

    public queryTransactionDirection() {
        this.directionReqVO.marketCode = this.code;
        this.service
            .queryTransactionDirection(this.directionReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.pageVO = winResponseData.data;
                }
            });
    }

    public queryDirectionCode() {
        this.service
            .queryDirectionCode(this.directionReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.directionCodes = winResponseData.data;
                }
            });
    }
    public reset() {
        this.directionReqVO = new TransactionDirectionReqVO();
        this.queryTransactionDirection();
    }
}
