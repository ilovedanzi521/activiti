import AxiosFun from "../../../api/AxiosFun";
import { ProdSeatReqVO, ProdSeatRepVO } from "../vo/ProdSeatVO";

export default class ProdSeatService {
    /** 获取席位列表 */
    public list(SeatVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/seat/list",
            SeatVO
        );
    }
    /** 新增席位 */
    public insert(SeatEntity: ProdSeatRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/seat",
            SeatEntity
        );
    }
    /** 删除席位 */
    public delete(fundNo, code) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/prod/seat",
            { fundNo: fundNo, code: code }
        );
    }
    /** 修改席位 */
    public update(seat: ProdSeatRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/prod/seat",
            seat
        );
    }
    /** 查询主席位 */
    public selectMainSeat() {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/seat/selectMainSeat",
            {}
        );
    }
    /** 查询所有席位，除去该产品下已存在的席位 */
    public selectAllSeat(prodSeatReqVO: ProdSeatReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/seat/selectAllSeat",
            prodSeatReqVO
        );
    }
    /** 查询所有席位 */
    public selectSeat() {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/seat/selectAllSeat",
            {}
        );
    }
    /** 查询席位关联表xx产品下有效席位数量 */
    public prodSeatCount(fundNo: number) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/prod/seat/prodSeatCount/" +
                fundNo,
            {}
        );
    }
    /** 查询席位详情，选择后带出 */
    public seatMessage(seatCode: string) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/prod/seat/seatMessage/" +
                seatCode,
            {}
        );
    }
}
