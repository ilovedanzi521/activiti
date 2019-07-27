import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import SysOplogReqVO from "../vo/SysOplogReqVO";
import { CompareVO } from "../vo/CompareVO";
import DicService from "../../dictionary/service/DicService";
import { DicReqVO } from "../../dictionary/vo/DicVO";
/**
 * 类描述：用户操作日志service
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class OplogService {
    /** 字典service */
    public dicService: DicService = new DicService();

    /** 日志查询 */
    public queryLog(OplogForm: SysOplogReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/sys/oplog/list",
            OplogForm
        );
    }

    /** 初始化操作用户列表 */
    public initUser(): void {
        AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/feign/user/userList",
            null
        ).then((res) => {
            CompareVO.userList = res.data;
            CompareVO.userSelect = CompareVO.userList;
        });
    }

    /** 初始化日志类型 */
    public initDicType(): void {
        const logDic = new DicReqVO();
        logDic.parentDicCode = "1000104";
        this.dicService.dicAllSubList(logDic).then((res) => {
            CompareVO.logTypeSelect = res.data;
        });
    }
}
