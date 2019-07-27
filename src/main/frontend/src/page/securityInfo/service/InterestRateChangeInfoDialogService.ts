import AxiosFun from "../../../api/AxiosFun";
import { InterestRateChangeInfoRepVO } from "../vo/InterestRateChangeInfoVO";
export default class InterestRateChangeService {
    /**
     * 利率变动信息新增
     */
    public insert(insertVo: InterestRateChangeInfoRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/param/security/interestRateChangeInfo",
            insertVo
        );
    }

    /**
     * 利率变动信息修改
     */
    public update(updateVo: InterestRateChangeInfoRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName +
                "/param/security/interestRateChangeInfo",
            updateVo
        );
    }

    /**
     * 利率变动信息删除
     */
    public delete(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/param/security/interestRateChangeInfo/" +
                id
        );
    }
}
