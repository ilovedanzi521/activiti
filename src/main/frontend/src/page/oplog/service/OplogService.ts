import AxiosFun from "../../../api/AxiosFun";
export default class OplogService {
    /**日志新增 */
    add(Oplog) {
        return AxiosFun.post("/sys/oplog", Oplog);
    }

    /**日志查询 */
    queryLog(OplogForm) {
        return AxiosFun.post("/param/sys/oplog/list", OplogForm);
    }
}
