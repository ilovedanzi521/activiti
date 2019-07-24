/* @BondRateService 债券折算率Service
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import AxiosFun from "../../../api/AxiosFun";
import { ParamBondBaseReqVO } from "../vo/ParamBondReqVO";
import BondBaseService from "./BondBaseService";

/**
 * 债券折算率Service
 */
export default class BondRateService extends BondBaseService {
    /**
     * 债券折算率分页查询
     */
    public findBondRateByPage(bondReqVO: ParamBondBaseReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/bond/conversionRate/list",
            bondReqVO
        );
    }

    /**
     * 债券折算率批量删除
     */
    public batchDeleteBondRate(ids: string[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/bond/conversionRate/batch",
            {
                ids: ids.toString()
            }
        );
    }
}
