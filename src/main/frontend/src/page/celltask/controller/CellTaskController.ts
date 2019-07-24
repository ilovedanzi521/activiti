/****************************************************
 * 创建人：  @author wanglei
 * 创建时间: 2019-07-11 13:55:33
 * 项目名称：dfas-common-schedule
 * 文件名称: ScheCellTaskController.ts
 * 文件描述: @Description: 基础任务表 前端控制器
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import CellTaskService from "../service/CellTaskService";
import PageVO from "../../common/vo/PageVO";
import CellTaskReqVO from "../vo/CellTaskReqVO";
import CellTaskRepVO from "../vo/CellTaskRepVO";

import DialogVO from "../../common/vo/DialogVO";
/**
 * <p>
 * 基础任务表 前端控制器
 * </p>
 *
 * @author wanglei
 * @since 2019-07-11 13:55:33
 */
@Component({ components: {} })
export default class CellTaskController extends BaseController {
    /** service */
    public service: CellTaskService = new CellTaskService();
    /** 前端请求VO */
    public reqVO: CellTaskReqVO = new CellTaskReqVO();
    /** 分页对象 */
    public pageVO: PageVO = new PageVO();
    /** 详情 */
    public details: CellTaskRepVO = new CellTaskRepVO();
    /**弹框是否显示 */
    public dialogVisible: boolean = false;
    /** 弹框title*/
    public dialogTitle: string = "";
    dialogVO: DialogVO = new DialogVO();
    /**
     * 基础任务表  数据准备
     * @Title: mounted
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public mounted() {
        this.reqVO = new CellTaskReqVO();
        this.$nextTick(() => {
            this.query();
        });
    }

    /**
     * 基础任务表列表查询
     * @Title: query
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public query(): void {
        let _this = this;
        this.service.list(this.reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                this.win_message_error(res.msg);
            }
            _this.pageVO = res.data;
        });
    }

    /**
     * 基础任务表 分页列表查询
     * @Title: pageQuery
     * @param pageVO
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public pageQuery(pageVO: PageVO) {
        this.reqVO.reqPageNum = pageVO.pageNum;
        this.reqVO.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /**
     * 基础任务表 分页列表查询
     * @Title: pageQuery
     * @param reqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public reset(): void {
        this.reqVO = new CellTaskReqVO();
        // this.query();
    }

    /**
     * 基础任务表 删除
     * @Title: pageQuery
     * @param reqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public deleteTask(reqVO: CellTaskReqVO): void {
        debugger;
        this.service.delete(reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            }
            this.query();
        });
    }

    /**
     * 基础任务表 立即执行
     * @Title: pageQuery
     * @param reqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public exec(reqVO: CellTaskReqVO): void {
        debugger;
        this.service.exec(reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            }
        });
    }
    /**
     * 基础任务表 新增打开弹框
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    openAddDialog() {
        this.dialogVisible = true;
        this.dialogTitle = "TASK-新增";
        this.reqVO = new CellTaskReqVO();
    }
    /**
     * 关闭弹框
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    closeDialog() {
        this.dialogVisible = false;
    }

    /**
     * 基础任务表 新增
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    addCellTask() {
        let _this = this;
        this.service.add(this.reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            } else {
                this.dialogVisible = false;
            }
            _this.query();
        });
    }

    /**
     * 基础任务表 打开修改弹框
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    openUpdateDialog(reqVO: CellTaskReqVO) {
        this.dialogVisible = true;
        this.dialogTitle = "TASK-修改";
        this.reqVO = reqVO;
    }

    /**
     * 基础任务表 UPDATE TASK
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    updateCellTask() {
        let _this = this;
        this.service.update(this.reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            } else {
                this.dialogVisible = false;
            }
            _this.query();
        });
    }

    /**
     * 调转到/task
     * @return
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    redirectTask() {
        this.$router.push({
            path: "/task"
        });
    }
    /**
     * 调转到/definition
     * @return
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    redirectDefinition() {
        this.$router.push({
            path: "/definition"
        });
    }
    /**
     * 调转到/instance
     * @return
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    redirectInstance() {
        this.$router.push({
            path: "/instance"
        });
    }
    /**
     * 调转到/log
     * @return
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    redirectLog() {
        this.$router.push({
            path: "/log"
        });
    }

    /**新增、修改，表单验证规则 */
    rules = {
        taskName: [
            {
                required: true,
                message: "TASK名称不能为空",
                trigger: "blur"
            }
        ],
        taskType: [
            {
                required: true,
                message: "TASK类型不能为空",
                trigger: "blur"
            }
        ],
        path: [
            {
                required: true,
                message: "TASK路径不能为空",
                trigger: "blur"
            }
        ]
    };
}
