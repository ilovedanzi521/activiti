import { WinResponseData } from "../../common/vo/BaseVO";
import { SwitchReqVO, SwitchRepVO, SwitchOpLogReqVO } from "../vo/SwitchVO";
import AxiosFun from "../../../api/AxiosFun";

export default class DicService {
    /**
     *  查询开关列表
     * @param vo
     */
    switchlist(vo: SwitchReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/switchs/list",
            vo
        );
    }

    /**
     * 更新开关信息
     * @param vo
     */
    switchUpdate(vo: SwitchReqVO): Promise<WinResponseData> {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/switchs",
            vo
        );
    }

    /**
     *  查询开关操作日志信息
     * @param vo
     */
    switchlogList(vo: SwitchOpLogReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/switchlogs/list",
            vo
        );
    }
}
