import AxiosFun from "../../../api/AxiosFun";
export default class ExchangeRateService {
    /**币种列表 */
    listCurrency() {
        return AxiosFun.get("/param/param/currency", undefined);
    }

    /**汇率列表 */
    listExchangeRate(rateVO) {
        return AxiosFun.post("/param/param/exchangeRate/list", rateVO);
    }

    /**汇率新增 */
    addExchangeRate(rateVO) {
        return AxiosFun.post("/param/param/exchangeRate", rateVO);
    }
    /**汇率修改 */
    updateExchangeRate(rateVO) {
        return AxiosFun.put("/param/param/exchangeRate", rateVO);
    }
    /**汇率删除 */
    deleteExchangeRate(rateId) {
        return AxiosFun.delete("/param/param/exchangeRate/" + rateId, undefined);
    }
}
