import Vue from "vue";
import Component from "vue-class-component";
import SwitchTable from "@/page/switch/view/SwitchTable.vue";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import {
    SwitchReqVO,
    SwitchRepVO,
    SwitchOpLogReqVO,
    SwitchOpLogRepVO
} from "../vo/SwitchVO";
import SwtichService from "../service/SwtichService";
import BaseController from "../../common/controller/BaseController";
import PageVO from "../../common/vo/PageVO";
import dateUtils from "../../common/util/DateUtils";

@Component({ components: { SwitchTable } })
export default class SwitchController extends BaseController {
    activeName: string = "SYSTEM_OPERATION";

    swtichService: SwtichService = new SwtichService();

    swtichList: Array<SwitchRepVO> = [];

    switchOpLogList: Array<SwitchOpLogRepVO> = [];

    switchRepVO: SwitchReqVO = new SwitchReqVO();

    switchOpLogReqVO: SwitchOpLogReqVO = new SwitchOpLogReqVO();

    opLogPageVO: PageVO = new PageVO();

    /**
     * 标签页点击事件
     *
     * @param tab
     * @param event
     */
    handleTabClick(tab: any, event: any) {
        this.switchRepVO.switchType = this.activeName;

        this.switchlist(this.switchRepVO);
    }

    /**
     * 开关列表行单击事件
     *
     * @param row
     */
    swtichTableRowClick(row: SwitchRepVO) {
        this.switchOpLogReqVO.switchId = row.id;
        this.switchlogList(this.switchOpLogReqVO);
    }

    /**
     * 查询开关列表
     *
     * @param vo
     */
    switchlist(vo: SwitchReqVO) {
        this.swtichService
            .switchlist(vo)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.swtichList = winResponseData.data;

                    this.switchOpLogReqVO = new SwitchOpLogReqVO();
                    this.switchOpLogReqVO.switchType = vo.switchType;
                    this.switchlogList(this.switchOpLogReqVO);
                }
            });
    }

    /**
     * 查询操作日志列表
     *
     * @param vo
     */
    switchlogList(vo: SwitchOpLogReqVO) {
        this.swtichService
            .switchlogList(vo)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.switchOpLogList = winResponseData.data.list;
                    this.opLogPageVO = winResponseData.data;
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /**
     * 分页查询操作日志信息
     * @param vo
     */
    opLogPageQuery(vo: PageVO) {
        this.switchOpLogReqVO.reqPageNum = vo.pageNum;
        this.switchOpLogReqVO.reqPageSize = vo.pageSize;

        this.switchlogList(this.switchOpLogReqVO);
    }

    /**
     * 修改开关
     *
     * @param index
     * @param reqVo
     */
    switchChange(index: number, reqVo: SwitchReqVO) {
        const messageArray: Array<string> = [
            (reqVo.switchStatus == 0 ? "开启" : "关闭") +
                ": " +
                reqVo.switchName,
            "该项操作上次为: " + (reqVo.switchStatus == 0 ? "关闭" : "开启"),
            "操作时间: " + dateUtils.nowTime(),
            " 请确认是否继续?"
        ];
        const messageHData = [];
        const h = this.$createElement;
        for (const i in messageArray) {
            messageHData.push(h("p", null, messageArray[i]));
        }

        this.win_message_box_warning(
            h("div", null, messageHData),
            "修改业务开关提示"
        )
            .then(() => {
                this.swtichService
                    .switchUpdate(reqVo)
                    .then((winResponseData: WinResponseData) => {
                        if (WinRspType.SUCC == winResponseData.winRspType) {
                            this.win_message_success(winResponseData.msg);
                            var switchRepVO: SwitchReqVO = new SwitchReqVO();
                            switchRepVO.switchType = reqVo.switchType;
                            this.switchlist(switchRepVO);
                        } else {
                            this.win_message_error(winResponseData.msg);
                            reqVo.switchStatus =
                                reqVo.switchStatus == 0 ? 1 : 0;
                        }
                    })
                    .catch(error => {
                        reqVo.switchStatus = reqVo.switchStatus == 0 ? 1 : 0;
                    });
            })
            .catch(() => {
                reqVo.switchStatus = reqVo.switchStatus == 0 ? 1 : 0;
                this.win_message_warning("已取消操作");
            });
    }

    mounted() {
        let switchRepVO: SwitchReqVO = new SwitchReqVO();

        switchRepVO.switchType = "SYSTEM_OPERATION";

        this.switchlist(switchRepVO);
    }
}
