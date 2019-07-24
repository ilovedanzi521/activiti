import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import ParamPublisherRepVO from "../vo/ParamPublisherRepVO";
import ParamPublisherReqVO from "../vo/ParamPublisherReqVO";
/**
 * 类描述：发行人service
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class ParamPublisherService {
    /** 发行人查询*/
    noPageList(queryVO: ParamPublisherReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/publisher/list",
            queryVO
        );
    }

    /** 发行人分页查询*/
    list(queryVO: ParamPublisherReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/publisher/pageList",
            queryVO
        );
    }

    /**新增发行人 */
    add(paramPublisher: ParamPublisherRepVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/publisher",
            paramPublisher
        );
    }

    /**修改发行人 */
    update(paramPublisher: ParamPublisherRepVO): Promise<WinResponseData> {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/param/publisher",
            paramPublisher
        );
    }

    /**删除发行人*/
    delete(id: number): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/param/publisher/" + id,
            null
        );
    }
}
