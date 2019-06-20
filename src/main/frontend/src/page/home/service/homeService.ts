import { WinResponseData } from "../../common/vo/BaseVO";
import { HomeVO } from "../vo/homeVo";
import AxiosFun from "../../../api/AxiosFun";

export default class HomeService {
    
/**
 * 获取一级目录get方法,params:userName,tonk
 */
    static getFirstMenu(vo): Promise<WinResponseData> {
        return AxiosFun.get("/param/dfas-auth-center/api/web/home/firstMenu", vo);
    }
/**
 * 获取快速目录get方法,params:userName,tonk
 */
    static getFasttMenu(vo): Promise<WinResponseData> {
        return AxiosFun.get("/param/dfas-auth-center/api/web/home/fastMenu", vo);
    }
}

