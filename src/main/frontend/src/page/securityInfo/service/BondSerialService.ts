/* @BondSerialService 债券分期还本主页面Service
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import AxiosFun from "../../../api/AxiosFun";
import { ParamBondBaseReqVO } from "../vo/ParamBondReqVO";
import BondBaseService from "./BondBaseService";

/**
 * 债券分期还本Service
 */
export default class BondSerialService extends BondBaseService {
    /**
     * 债券分期还本分页查询
     */
    public findBondSerialByPage(bondReqVO: ParamBondBaseReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/bond/serial/list",
            bondReqVO
        );
    }

    /**
     * 债券分期还本批量删除
     */
    public batchDeleteBondSerial(ids: string[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/bond/serial/batch",
            {
                ids: ids.toString()
            }
        );
    }
}
