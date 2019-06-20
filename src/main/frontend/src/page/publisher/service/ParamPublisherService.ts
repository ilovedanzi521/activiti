import AxiosFun from "../../../api/AxiosFun";

export default class ParamPublisherService {
    /** 发布人查询*/
    list(queryVO) {
        return AxiosFun.post("/param/param/publisher/list", queryVO);
    }

    /**新增发布人 */
    add(paramPublisher) {
        return AxiosFun.post("/param/param/publisher", paramPublisher);
    }

    /**修改发布人 */
    update(paramPublisher) {
        return AxiosFun.put("/param/param/publisher", paramPublisher);
    }

    /**删除发行人*/
    delete(id) {
        return AxiosFun.delete("/param/param/publisher/" + id, null);
    }
}
