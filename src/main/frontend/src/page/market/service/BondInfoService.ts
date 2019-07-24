/* @BondInfoService 债券基本信息Service
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import AxiosFun from "../../../api/AxiosFun";
import { ParamBondReqVO } from "../vo/ParamBondReqVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import BondBaseService from "./BondBaseService";

export default class BondInfoService extends BondBaseService {
    /**
     * 债券基本信息分页查询
     */
    public findBondInfoByPage(bondReqVO: ParamBondReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/bond/info/list",
            bondReqVO
        );
    }

    /**
     * 债券基本信息批量删除
     */
    public batchDeleteBondInfo(ids: string[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/bond/info/batch",
            {
                ids: ids.toString()
            }
        );
    }

    /**
     * 内部证券代码查询 公共方法
     */
    public publicInCodeSelectFun(query: string, cb: any) {
        const codeParam = new ParamBondReqVO();
        codeParam.reqPageNum = 1;
        codeParam.reqPageSize = 10;
        if (query !== null && query !== "") {
            codeParam.securityCode = query;
        }
        this.findBondInfoByPage(codeParam).then((res: WinResponseData) => {
            if (res.winRspType === WinRspType.SUCC) {
                this.codeFilter(res.data.list, cb, query);
            }
        });
    }
}
