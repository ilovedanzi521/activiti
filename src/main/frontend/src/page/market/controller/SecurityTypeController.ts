import { Component } from "vue-property-decorator";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import PageVO from "../../common/vo/PageVO";
import { SecurityTypeReqVO, SecurityCodeRepVO } from "../vo/ParamMarketVO";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import SecurityTypeDic from "../vo/SecurityTypeDic";
import TradeMarketController from "./TradeMarketController";

@Component({ components: {} })
export default class SecurityTypeController extends TradeMarketController {
    public typeReqVO: SecurityTypeReqVO = new SecurityTypeReqVO();
    public pageVO: PageVO = new PageVO();
    public securityTypeDic: SecurityTypeDic = new SecurityTypeDic();
    public SecurityCodeArray: Array<SecurityCodeRepVO> = [];

    mounted() {
        this.querySecurityType();
        this.getMarketDic();
        this.getPlatformDic();
        this.getMarketTypeDic();
        this.getAssetTypeDicDic();
        this.getSecurityTypeUnitDic();
        this.getDeclarationUnitDic();
        this.getBlockFundsTypeDic();
        this.getMinControlTypeDic();
        this.querySecurityCode();
    }

    /** 交易市场 */
    getMarketDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000102";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.marketDic = res.data;
        });
    }
    /** 交易平台 */
    getPlatformDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000103";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.platformDic = res.data;
        });
    }

    /** 市场类型 */
    getMarketTypeDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000115";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.marketTypeDic = res.data;
        });
    }

    /** 资产类型 */
    getAssetTypeDicDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000116";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.assetTypeDic = res.data;
        });
    }
    /** 证券类别单位 */
    getSecurityTypeUnitDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000117";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.securityTypeUnitDic = res.data;
        });
    }
    /** 申报单位 */
    getDeclarationUnitDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000118";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.declarationUnitDic = res.data;
        });
    }

    /** 资产冻结方式 */
    getBlockFundsTypeDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000119";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.blockFundsTypeDic = res.data;
        });
    }

    /** 买卖最小数量控制方式 */
    getMinControlTypeDic() {
        let dic = new DicReqVO();
        dic.parentDicCode = "1000120";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.securityTypeDic.minControlTypeDic = res.data;
        });
    }

    /**交易市场，表格显示 */
    marketFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(cellValue, this.securityTypeDic.marketDic);
    }

    /**交易平台，表格显示 */
    platformFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(cellValue, this.securityTypeDic.platformDic);
    }

    /**市场类型，表格显示 */
    marketTypeFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(cellValue, this.securityTypeDic.marketTypeDic);
    }

    /**证券类别，表格显示 */
    securityTypeUnitFormatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
    }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.securityTypeUnitDic
        );
    }

    /**资产类别，表格显示 */
    assetTypeFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(cellValue, this.securityTypeDic.assetTypeDic);
    }

    /**申报单位，表格显示 */
    declarationUnitFormatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
    }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.declarationUnitDic
        );
    }

    /**资产冻结方式，表格显示 */
    blockFundsTypeFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.blockFundsTypeDic
        );
    }

    /**买卖最小数量控制方式，表格显示 */
    minControlTypeFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(
            cellValue,
            this.securityTypeDic.minControlTypeDic
        );
    }
    public pageQuery(pageVO: PageVO) {
        this.typeReqVO.reqPageNum = pageVO.pageNum;
        this.typeReqVO.reqPageSize = pageVO.pageSize;
        this.querySecurityType();
    }

    querySecurityType() {
        if ("number" == typeof this.code) {
            this.typeReqVO.platformCode = this.code + "";
        } else {
            this.typeReqVO.marketCode = this.code;
        }
        this.service
            .querySecurityType(this.typeReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.pageVO = winResponseData.data;
                }
            });
    }

    querySecurityCode() {
        this.service
            .querySecurityCode()
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.SecurityCodeArray = winResponseData.data;
                }
            });
    }

    public reset() {
        this.typeReqVO = new SecurityTypeReqVO();
    }
}
