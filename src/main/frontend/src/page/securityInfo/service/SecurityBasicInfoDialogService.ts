import AxiosFun from "../../../api/AxiosFun";
import { SecurityBasicInfoRepVO } from "../vo/SecurityBasicInfoVO";
export default class SecurityBasicInfoDialogService {
    /**
     * 证券基础信息新增
     */
    public insert(insertVo: SecurityBasicInfoRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/securityBasicInfo",
            insertVo
        );
    }

    /**
     * 证券基础信息修改
     */
    public update(updateVo: SecurityBasicInfoRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/param/securityBasicInfo",
            updateVo
        );
    }

    /**
     * 证券基础信息删除
     */
    public delete(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/param/securityBasicInfo/" +
                id
        );
    }
}
