import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import DicService from "../../dictionary/service/DicService";
import OplogService from "../service/OplogService";
import PageVO from "../../common/vo/PageVO";
import ReqVO from "../vo/SysOplogReqVO";
import RepVO from "../vo/SysOplogRepVO";
import DownVO from "../vo/DownVO";

import { DicReqVO } from "../../dictionary/vo/DicVO";
import { DateRangeType } from "../../common/enum/DateRangeType";
import dateUtils from "../../common/vo/DateUtils";
@Component({ components: {} })
export default class OplogController extends BaseController {
    /**日志service */
    service: OplogService = new OplogService();
    /**字典service */
    dicService: DicService = new DicService();
    /** 查询表单数据 */
    form: ReqVO = new ReqVO();
    /** 日志列表 */
    logs: Array<RepVO> = [];
    /**分页对象 */
    pageVO: PageVO = new PageVO();
    /** 日志详情 */
    details: RepVO = new RepVO();
    /**下拉框数据 */
    downVO: DownVO = DownVO.init();
    /**操作时间，快捷选项 */
    pickerOptions = {
        shortcuts: [
            {
                text: DateRangeType.TD,
                onClick: dateUtils.setTDTime
            },
            {
                text: DateRangeType.YD,
                onClick: dateUtils.setYDTime
            },
            {
                text: DateRangeType.NW,
                onClick: dateUtils.setNWTime
            },
            {
                text: DateRangeType.NM,
                onClick: dateUtils.setNMTime
            },
            {
                text: DateRangeType.NY,
                onClick: dateUtils.setNYTime
            }
        ]
    };

    /**数据准备 */
    mounted() {
        let _this = this;
        this.form = new ReqVO();
        /**初始化日志类型 */
        let logDic = new DicReqVO();
        logDic.parentDicCode = "1000104";
        this.dicService.dicAllSubList(logDic).then(res => {
            this.downVO.logTypeSelect = res.data;
        });
        this.$nextTick(() => {
            _this.query();
        });
    }
    /**日志查询 */
    query(): void {
        let _this = this;
        this.service.queryLog(this.form).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            }
            _this.pageVO = res.data;
        });
    }
    /**日志分页查询 */
    pageQuery(pageVO: PageVO) {
        this.form.pageNum = pageVO.pageNum;
        this.form.pageSize = pageVO.pageSize;
        this.query();
    }
    /**重置 */
    reset() {
        this.form = new ReqVO();
    }
    /**打开详情框 */
    detail(oplog) {
        this.openDialog();
        this.details = oplog;
    }
    /**选中时间 */
    setFormTime(times) {
        this.form.timeStart = times[0];
        this.form.timeEnd = times[1];
    }
    /**日志类型,表格显示 */
    logTypeFormatter(row, column, cellValue, index) {
        let logTypes = this.downVO.logTypeSelect;
        for (var i = 0; i < logTypes.length; i++) {
            if (cellValue === logTypes[i].dicCode) {
                return logTypes[i].dicExplain;
            }
        }
        return "";
    }
}
