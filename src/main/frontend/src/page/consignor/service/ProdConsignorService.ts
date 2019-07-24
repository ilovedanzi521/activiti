/* @ProdConsignorService 委托人主页面Service
 * @Author: lixiuquan
 * @Date: 2019-06-26 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-26 19:34:05
 */
import Vue from "vue";
import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { ConsignorDicEntity } from "../vo/ProdConsignorEntityVO";
import { ConsignorReqVO } from "../vo/ConsignorReqVO";

export default class ProdConsignorService extends Vue {
    /**
     * 数据字典服务
     */
    private dicService: DicService = new DicService();

    /**
     * 查询一级委托人列表
     */
    public findConsignorList(reqVO: ConsignorReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/consignor/list",
            reqVO
        );
    }

    /**
     * 一级委托人批量删除
     */
    public batchDeleteBondInfo(ids: string[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/consignor/info/batch",
            {
                ids: ids.toString()
            }
        );
    }

    /**
     * 数据字典初始化 公共方法
     */
    public publicDicFun(dicName: string, dicCode: string) {
        const dic = new DicReqVO();
        dic.parentDicCode = dicCode;
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            ConsignorDicEntity[dicName] = res.data;
        });
    }
}
