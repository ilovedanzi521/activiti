import { WinResponseData } from "../../common/vo/BaseVO";
import { DicReqVO, DicRepVO } from "../vo/DicVO";
import AxiosFun from "../../../api/AxiosFun";
export default class DicService {
    /**
     * 查询字典项信息
     * @param vo
     */
    diclist(vo: DicReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/dics/list",
            vo
        );
    }

    /**
     * 查询字典子项(分页)
     * @param vo
     */
    dicSubList(vo: DicReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/dics/listSub",
            vo
        );
    }

    /**
     * 查询字典子项(获取所有)
     * @param vo
     */
    dicAllSubList(vo: DicReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/dics/listAllSub",
            vo
        );
    }

    /**
     * 根据多个父类编码查询字典子项(获取所有)
     * @param vo
     */
    dicMultipleAllSubList(vo: DicReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/dics/listMultipleAllSub",
            vo
        );
    }
}
