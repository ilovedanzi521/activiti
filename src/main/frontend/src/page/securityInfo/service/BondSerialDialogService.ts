/* @BondSerialDetailService 债券分期还本详情框服务提供Service
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import AxiosFun from "../../../api/AxiosFun";
import {
    ParamBondBaseReqVO,
    ParamBondSerialEntity
} from "../vo/ParamBondReqVO";

/**
 * 债券分期还本详情框服务提供Service
 */
export default class BondSerialDetailService {
    /**
     * 新增债券分期还本信息提交
     */
    public addBondSerial(bondReqVO: ParamBondSerialEntity) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/bond/serial",
            bondReqVO
        );
    }

    /**
     * 修改债券分期还本信息提交
     */
    public updateBondSerial(bondReqVO: ParamBondSerialEntity) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/bond/serial",
            bondReqVO
        );
    }

    /**
     * 删除债券分期还本信息提交
     */
    public deleteBondSerial(id: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/bond/serial/" + id,
            { id }
        );
    }

    /**
     * 新增页面证券代码选择加载
     */
    public findCodeList(bondReqVO: ParamBondBaseReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/bond/serial/codeList",
            bondReqVO
        );
    }
}
