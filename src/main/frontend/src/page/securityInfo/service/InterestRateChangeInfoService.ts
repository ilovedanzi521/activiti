import AxiosFun from "../../../api/AxiosFun";
import { InterestRateChangeInfoReqVO } from "../vo/InterestRateChangeInfoVO";
export default class InterestRateChangeService {
    /**
     * 利率变动信息查询
     */
    public list(queryVo: InterestRateChangeInfoReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/param/security/interestRateChangeInfo/list",
            queryVo
        );
    }

    /**
     * 利率变动信息批量删除
     */
    public batchDelete(ids: number[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/param/security/interestRateChangeInfo/batch/" +
                ids
        );
    }
}
