/* @BondRateDetailService 债券折算率详情Service
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import AxiosFun from "../../../api/AxiosFun";
import {
    ParamBondBaseReqVO,
    ParamBondConversionRateEntity
} from "../vo/ParamBondReqVO";

export default class BondRateDetailService {
    /**
     * 新增债券折算率提交
     */
    public addBondRate(bondReqVO: ParamBondConversionRateEntity) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/bond/conversionRate",
            bondReqVO
        );
    }

    /**
     * 修改债券折算率提交
     */
    public updateBondRate(bondReqVO: ParamBondConversionRateEntity) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/bond/conversionRate",
            bondReqVO
        );
    }

    /**
     * 删除债券折算率提交
     */
    public deleteBondRate(id: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/bond/conversionRate/" + id,
            {
                id
            }
        );
    }

    /**
     * 新增页面证券内码选择加载
     */
    public findCodeList(bondReqVO: ParamBondBaseReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/bond/conversionRate/codeList",
            bondReqVO
        );
    }
}
