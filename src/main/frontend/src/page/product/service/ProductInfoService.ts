/* @ProductInfoService 产品管理页面Service
 * @Author: lixiuquan
 * @Date: 2019-06-26 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-26 19:34:05
 */
import Vue from "vue";
import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { ProductInfoReqVO } from "../vo/ProductInfoReqVO";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { ProdDicEntity } from "../vo/ProductEntityVO";
import { ProductInfoConstant } from "../const/ProdFundInfoConst";

export default class ProductInfoService extends Vue {
    /**
     * 数据字典服务
     */
    private dicService: DicService = new DicService();

    /**
     * 查询产品列表
     * @param productInfoReqVO
     */
    public findFundInfoList(productInfoReqVO: ProductInfoReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/list",
            productInfoReqVO
        );
    }

    /**
     * 产品代码查询 公共方法
     * @param query 筛选参数
     * @param cb 回调
     */
    public publicInCodeSelectFun(query: string, cb: any) {
        const codeParam = new ProductInfoReqVO();
        codeParam.reqPageNum = 1;
        codeParam.reqPageSize = 10;
        if (query !== null && query !== "") {
            codeParam.name = query;
        }
        this.findFundInfoList(codeParam).then((res: WinResponseData) => {
            if (res.winRspType === WinRspType.SUCC) {
                this.codeFilter(res.data.list, cb, query);
            }
        });
    }

    /**
     * 数据字典初始化 公共方法
     */
    public publicDicFun(dicName: string, dicCode: string) {
        const dic = new DicReqVO();
        dic.parentDicCode = dicCode;
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            ProdDicEntity[dicName] = res.data;
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
                ProdDicEntity.type =
                    res.data[ProductInfoConstant.PROD_TYPE_DICCODE];
                ProdDicEntity.status =
                    res.data[ProductInfoConstant.PROD_STATUS_DICCODE];
            });
    }

    /**
     * 产品代码查询 过滤方法
     */
    public codeFilter(list: any[], cb: any, queryString: string) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: any) => {
                const ob = { value: "", key: "" };
                ob.key = element.name;
                ob.value = element.name;
                array.push(ob);
            });
        }
        const results = array;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }

    /**
     * 产品代码查询 创建过滤方法
     */
    public createCodeFilter(queryString: string) {
        return (res: any) => {
            return (
                res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
        };
    }
}
