/* @BondInfoService 债券基本信息baseService
 * @Author: lixiuquan
 * @Date: 2019-06-17 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-17 19:34:05
 */

import { WinResponseData } from "../../common/vo/BaseVO";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { ParamBondDicEntity, SecuritySelect } from "../vo/ParamBondInfoEntity";
import { WinRspType } from "../../common/enum/BaseEnum";
import MarketService from "../service/MarketService";
import { BondConstant } from "../const/BondConstant";

export default class BondBaseService {
    /**
     * 数据字典服务
     */
    private dicService: DicService = new DicService();
    /**
     * 证券类别查询服务
     */
    private marketService: MarketService = new MarketService();

    /**
     * 数据字典初始化 公共方法
     */
    public publicDicFun(dicName: string, dicCode: string) {
        const dic = new DicReqVO();
        dic.parentDicCode = dicCode;
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            ParamBondDicEntity[dicName] = res.data;
        });
    }

    /**
     * 数据字典初始化 公共方法(数组请求)
     */
    public publicDicListFun(dicCodeList: any[]) {
        const dic = new DicReqVO();
        dic.parentDicCodeList = dicCodeList;
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                ParamBondDicEntity.payInterestType =
                    res.data[BondConstant.PAY_INTERREST_TYPE_DICCODE];
                ParamBondDicEntity.rateType =
                    res.data[BondConstant.RRATE_TYPE_DICCODE];
                ParamBondDicEntity.baseType =
                    res.data[BondConstant.BASE_TYPE_DICCODE];
                ParamBondDicEntity.interestStandard =
                    res.data[BondConstant.INTERREST_STANDARD_DICCODE];
                ParamBondDicEntity.isRedeemable =
                    res.data[BondConstant.IS_REDEEMABLE_DICCODE];
                ParamBondDicEntity.internalRating =
                    res.data[BondConstant.INTERNAL_RATING_DICCODE];
                ParamBondDicEntity.externalRating =
                    res.data[BondConstant.EXTERNAL_RATING_DICCODE];
                ParamBondDicEntity.priceType =
                    res.data[BondConstant.PRICE_TYPE_DICCODE];
                ParamBondDicEntity.capitalPayType =
                    res.data[BondConstant.CAPITAL_PAY_TYPE_DICCODE];
                ParamBondDicEntity.trusteeAgency =
                    res.data[BondConstant.TRUSTEE_AGENCY_DICCODE];
                ParamBondDicEntity.isPutBack =
                    res.data[BondConstant.IS_PUT_BACK_DICCODE];
                ParamBondDicEntity.transSecurityType =
                    res.data[BondConstant.TRANS_SECURITY_TYPE_DICCODE];
            });
    }

    /**
     * 证券类别信息查询 公共方法
     */
    public publicTypeFun() {
        this.marketService
            .querySecurityCode()
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC === winResponseData.winRspType) {
                    // 债券类数组
                    const zqSelectList = [];
                    // 去重参数
                    const Obj = {};
                    if (winResponseData.data.length > 0) {
                        winResponseData.data.forEach((element: any) => {
                            // 证券大类是债券
                            if (
                                element.assetType ===
                                BondConstant.BOND_ASSET_TYPE
                            ) {
                                if (!Obj[element.securityType]) {
                                    Obj[element.securityType] =
                                        element.securityType;
                                    zqSelectList.push(element);
                                }
                            }
                        });
                    }
                    SecuritySelect.securityTypeSelect = zqSelectList;
                }
            });
    }

    /**
     * 内部证券代码查询 过滤方法
     */
    public codeFilter(list: any[], cb: any, queryString: string) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: any) => {
                const ob = { value: "", key: "" };
                ob.key = element.securityCode;
                ob.value =
                    element.securityCode + "(" + element.securityName + ")";
                array.push(ob);
            });
        }
        const results = queryString
            ? array.filter(this.createCodeFilter(queryString))
            : array;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }

    /**
     * 内部证券代码查询 创建过滤方法
     */
    public createCodeFilter(queryString: string) {
        return (res: any) => {
            return (
                res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
        };
    }
}
