import AxiosFun from "../../../api/AxiosFun";
import { ParamBondInfoRepVO } from "../vo/ParamBondRepVO";
import { ParamBondBaseReqVO } from "../vo/ParamBondReqVO";
import BondBaseService from "./BondBaseService";
import { ParamBondDicEntity } from "../vo/ParamBondInfoEntity";

export default class BondInfoDialogService extends BondBaseService {
    /**
     * 新增债券基本信息提交
     */
    public addBondInfo(bondReqVO: ParamBondInfoRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/bond/info",
            bondReqVO
        );
    }

    /**
     * 修改债券基本信息提交
     */
    public updateBondInfo(bondReqVO: ParamBondInfoRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/bond/info",
            bondReqVO
        );
    }

    /**
     * 删除债券基本信息提交
     */
    public deleteBondInfo(id: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/bond/info/" + id,
            { id }
        );
    }

    /**
     * 新增页面证券代码选择加载
     */
    public findCodeList(bondReqVO: ParamBondBaseReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/bond/info/codeList",
            bondReqVO
        );
    }

    /**
     * 判断证券类别是否属于可转股
     * @param type
     */
    public judgeTransSecurityType(type: string): boolean {
        let flag = false;
        if (ParamBondDicEntity.transSecurityType.length > 0) {
            ParamBondDicEntity.transSecurityType.forEach((element: any) => {
                if (element.dicCode === type) {
                    flag = true;
                }
            });
        }
        return flag;
    }
}
