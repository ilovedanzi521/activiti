/****************************************************
 * 创建人：  @author zoujian
 * 创建时间: 2019-07-11 16:46:44
 * 项目名称：dfbp-common-basicparameter
 * 文件名称: ParamRivalTraderController.ts
 * 文件描述: @Description: 对手交易员信息表 前端控制器
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamRivalTraderService from "../service/ParamRivalTraderService";
import PageVO from "../../common/vo/PageVO";
import {
    ParamRivalTraderRepVO,
    ParamRivalTraderReqVO
} from "../vo/ParamRivalTraderVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import dateUtils from "../../common/util/DateUtils";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import RivalTraderDicDataVO from "../vo/RivalTraderDicDataVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { BaseConst } from "../../common/const/BaseConst";
import ParamRivalTraderDialog from "../view/ParamRivalTraderDialog.vue";
import { mapState } from "vuex";
import DicService from "../../dictionary/service/DicService";

/**
 * 类名称：ParamRivalTraderController
 * 类描述：对手交易员信息表 前端控制器
 * 创建人：@author zoujian
 * 创建时间：2019-07-11 16:46:44
 */
@Component({
    components: { ParamRivalTraderDialog },
    computed: {
        ...mapState({
            rivalInfo: (state: any) => state.rival.rivalInfo
        })
    },
    watch: {
        rivalInfo: {
            handler(newValue, oldValue) {
                this.query();
            }
        }
    }
})
export default class ParamRivalTraderController extends BaseController {
    // 子组件$refs引用声明
    public $refs!: {
        fundInfoTable: any;
    };
    /** service */
    public service: ParamRivalTraderService = new ParamRivalTraderService();
    /** 数据字典service */
    private dicService: DicService = new DicService();
    /** 前端请求VO */
    private reqVO: ParamRivalTraderReqVO = new ParamRivalTraderReqVO();
    /** 分页对象 */
    private pageVO: PageVO = new PageVO();
    /** 选中信息 */
    private multipleSelection: any = [];
    /** 数据字典 */
    private rivalTraderDicDataVO: RivalTraderDicDataVO = new RivalTraderDicDataVO();
    /** dialog显示控制 */
    private dialogVisible: boolean = false;
    /** 子组件显示的信息 */
    private cardNumber: {
        type: OperationTypeEnum;
        data: ParamRivalTraderRepVO;
        rivalTraderDicDataVO: RivalTraderDicDataVO;
    };

    /**
     * 子组件回调函数
     * @param msg
     */
    private toFatherMsg(msg: string) {
        if (msg === WinRspType.SUCC) {
            this.query();
        }
        this.dialogVisible = false;
    }
    /**
     * 对手交易员信息表  数据准备
     * @Title: mounted
     * @throws
     * @author: zoujian
     * @Date:   2019-07-11 16:46:44
     */
    private mounted() {
        const dic = new DicReqVO();
        dic.parentDicCode = "1000267";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.rivalTraderDicDataVO.stopDic = res.data;
        });
        this.$nextTick(() => {
            this.query();
        });
    }

    /**
     * 对手交易员信息表列表查询
     * @Title: query
     * @author: zoujian
     * @Date:   2019-07-11 16:46:44
     */
    private query(): void {
        this.reqVO.rivalNo = this.rivalInfo.rivalNo;
        this.service.list(this.reqVO).then((res: WinResponseData) => {
            if (res.winRspType === "ERROR") {
                this.win_message_error(res.msg);
            }
            this.pageVO = res.data;
        });
    }

    /**
     * 对手交易员信息表 分页列表查询
     * @Title: pageQuery
     * @param pageVO
     * @author: zoujian
     * @Date:   2019-07-11 16:46:44
     */
    private pageQuery(pageVO: PageVO) {
        this.reqVO.reqPageNum = pageVO.pageNum;
        this.reqVO.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /**
     * 对手交易员信息表 分页列表查询
     * @Title: pageQuery
     * @param reqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @author: zoujian
     * @Date:   2019-07-11 16:46:44
     */
    private reset(): void {
        this.reqVO = new ParamRivalTraderReqVO();
    }

    /** 数据字典映射 */
    private formatDic({ row, column }) {
        if (column.property === "stop") {
            return this.getLabelFromDic(
                row.stop,
                this.rivalTraderDicDataVO.stopDic
            );
        }
        if (column.property === "createUserId") {
            return row.updateUserId ? row.updateUserId : row.createUserId;
        }
        if (column.property === "createTime") {
            const date = new Date(
                row.updateTime ? row.updateTime : row.createTime
            );
            return dateUtils.dateFtt("yyyy-MM-dd hh:mm:ss", date);
        }
    }

    /**
     * checkbox选中
     * @param val
     */
    private tableSelectionChange(val: any) {
        this.multipleSelection = val.selection;
    }

    private getLabelFromDic(str: string, dicArray: DicRepVO[]) {
        let value = "";
        for (const dic of dicArray) {
            if (dic.dicCode === str) {
                value = dic.dicExplain;
                break;
            }
        }
        return value;
    }

    /** 双击查看 */
    private dblclick({ row }, event: Event) {
        this.dialogVisible = true;
        this.cardNumber = {
            type: OperationTypeEnum.VIEW,
            data: this.setRivalInfo(row),
            rivalTraderDicDataVO: this.rivalTraderDicDataVO
        };
    }

    /**
     * 新增、修改、删除弹框
     * @param row
     * @param type
     */
    private operation(row: ParamRivalTraderRepVO, type: string) {
        this.dialogVisible = true;
        if (type === OperationTypeEnum.ADD) {
            row = new ParamRivalTraderRepVO();
            this.cardNumber = {
                type: OperationTypeEnum.ADD,
                data: this.setRivalInfo(row),
                rivalTraderDicDataVO: this.rivalTraderDicDataVO
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                type: OperationTypeEnum.DELETE,
                data: this.setRivalInfo(row),
                rivalTraderDicDataVO: this.rivalTraderDicDataVO
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                type: OperationTypeEnum.UPDATE,
                data: this.setRivalInfo(row),
                rivalTraderDicDataVO: this.rivalTraderDicDataVO
            };
        }
    }

    /** 设置交易对手信息 */
    private setRivalInfo(data: ParamRivalTraderRepVO) {
        data.rivalNo = this.rivalInfo.rivalNo;
        data.rivalName = this.rivalInfo.rivalName;
        return this.copy(data);
    }

    /**
     * 批量删除
     */
    private delBatch() {
        const multipleSelection = this.multipleSelection;
        if (multipleSelection.length > 1) {
            this.win_message_box_warning(
                "此操作将永久删除" +
                    multipleSelection.length +
                    " 条信息, 是否继续?",
                BaseConst.WARNING,
                false
            )
                .then((res: any) => {
                    const ids = [];
                    multipleSelection.forEach(
                        (element: ParamRivalTraderRepVO) => {
                            ids.push(element.id);
                        }
                    );
                    const idsStr: string = ids.join("_");
                    this.service
                        .delBatch(idsStr)
                        .then((response: WinResponseData) => {
                            this.message(response);
                        });
                })
                // tslint:disable-next-line: no-empty
                .catch(() => {});
        } else {
            const row = multipleSelection[0];
            this.$nextTick(() => {
                this.operation(row, OperationTypeEnum.DELETE);
            });
        }
    }

    private message(resoponse: WinResponseData) {
        if (resoponse.winRspType === WinRspType.ERROR) {
            this.win_message_error(resoponse.msg);
        } else {
            this.win_message_success(resoponse.msg);
            this.query();
        }
    }
}
