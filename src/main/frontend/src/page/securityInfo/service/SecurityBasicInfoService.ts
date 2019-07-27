import AxiosFun from "../../../api/AxiosFun";
import { SecurityBasicInfoReqVO } from "../vo/SecurityBasicInfoVO";
export default class SecurityBasicInfoService {
    /**
     * 证券基础信息查询
     */
    public list(queryVo: SecurityBasicInfoReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/param/securityBasicInfo/list",
            queryVo
        );
    }

    /**
     * 证券基础信息批量删除
     */
    public batchDelete(ids: number[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/param/securityBasicInfo/batch/" +
                ids
        );
    }
}
