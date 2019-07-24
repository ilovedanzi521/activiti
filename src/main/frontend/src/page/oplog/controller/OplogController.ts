import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import DicService from "../../dictionary/service/DicService";
import OplogService from "../service/OplogService";
import PageVO from "../../common/vo/PageVO";
import ReqVO from "../vo/SysOplogReqVO";
import RepVO from "../vo/SysOplogRepVO";
import DialogVO from "../../common/vo/DialogVO";
import dateUtils from "../../common/util/DateUtils";
import OplogDialog from "../view/OplogDialogView.vue";
import { CompareVO } from "../vo/CompareVO";
/**
 * 类描述：用户操作日志controller
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
@Component({ components: { OplogDialog } })
export default class OplogController extends BaseController {
    /** 日志service */
    public service: OplogService = new OplogService();
    /** 字典service */
    public dicService: DicService = new DicService();
    /** 查询表单数据 */
    public form: ReqVO = new ReqVO();
    /** 日志列表 */
    public logs: RepVO[] = [];
    /** 分页对象 */
    public pageVO: PageVO = new PageVO();
    /** 打开、编辑、删除弹出框VO */
    public dialogVO: DialogVO = new DialogVO();
    /** 日志详情 */
    public details: RepVO = new RepVO();

    /**开始、结束时间数组 */
    timeArray: Date[] = [
        dateUtils.defaultStartTime(),
        dateUtils.defaultEndtTime()
    ];
    /**数据准备对象 */
    public compareVO: any = CompareVO;

    /** 数据准备 */
    public mounted() {
        this.form = new ReqVO();
        // 初始化日志类型
        this.service.initDicType();
        // 初始化操作用户
        this.service.initUser();
        // 查询用户日志
        this.$nextTick(() => {
            this.query();
        });
    }

    /**
     * 用户查询
     */
    remoteUserList(query) {
        if (query !== "") {
            setTimeout(() => {
                CompareVO.userSelect = CompareVO.userList.filter(item => {
                    return (
                        item.userId.toLowerCase().indexOf(query.toLowerCase()) >
                        -1
                    );
                });
            }, 200);
        } else {
            this.compareVO.userSelect = CompareVO.userList;
        }
    }
    /** 日志查询 */
    public query(): void {
        let _this = this;
        this.setFormTime(this.timeArray);
        this.service.queryLog(this.form).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            }
            _this.pageVO = res.data;
        });
    }
    /** 日志分页查询 */
    public pageQuery(pageVO: PageVO) {
        this.form.reqPageNum = pageVO.pageNum;
        this.form.reqPageSize = pageVO.pageSize;
        this.query();
    }
    /** 重置 */
    public reset(): void {
        this.form = new ReqVO();
        this.timeArray = [
            dateUtils.defaultStartTime(),
            dateUtils.defaultEndtTime()
        ];
        this.query();
    }
    /** 打开详情框 */
    public detail(oplog): void {
        this.dialogVO = this.dialogVO.getSeeDialog("日志详情");
        this.details = oplog;
    }
    /** 选中时间 */
    private setFormTime(times: Date[]): void {
        if (!times) {
            this.form.timeStart = null;
            this.form.timeEnd = null;
            return;
        }
        this.form.timeStart = dateUtils.dateFtt(
            "yyyy-MM-dd hh:mm:ss",
            times[0]
        );
        this.form.timeEnd = dateUtils.dateFtt("yyyy-MM-dd hh:mm:ss", times[1]);
    }
    /** 日志类型,表格显示 */
    public logTypeFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        const logTypes = CompareVO.logTypeSelect;
        for (let i = 0; i < logTypes.length; i++) {
            if (cellValue === logTypes[i].dicCode) {
                return logTypes[i].dicExplain;
            }
        }
        return "";
    }
}
