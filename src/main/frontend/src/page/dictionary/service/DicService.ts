import { WinResponseData } from "../../common/vo/BaseVO";
import { DicReqVO, DicRepVO } from "../vo/DicVO";
import AxiosFun from "../../../api/AxiosFun";

export default class DicService {
    /**
     * 查询字典项信息
     * @param vo
     */
    diclist(vo: DicReqVO): Promise<WinResponseData> {
        return AxiosFun.post("/param/dics/list", vo);
    }

    /**
     * 查询字典子项
     * @param vo
     */
    dicSubList(vo: DicReqVO): Promise<WinResponseData> {
        return AxiosFun.post("/param/dics/listSub", vo);
    }

    /**
     * 查询字典子项(获取所有)
     * @param vo
     */
    dicAllSubList(vo: DicReqVO): Promise<WinResponseData> {
        return AxiosFun.post("/param/dics/listAllSub", vo);
    }
}
