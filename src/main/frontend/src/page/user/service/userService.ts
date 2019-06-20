import { WinResponseData } from "../../common/vo/BaseVO";
import { UserReqVO } from "../vo/UserVO";
import AxiosFun from "../../../api/AxiosFun";

/**
 * user页面获取数据
 */
export default class userService {
    static addCompany(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post("/param/dfas-auth-center/api/company/add", vo);
    }
}
