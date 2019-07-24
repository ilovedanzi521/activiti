/****************************************************
 * 创建人：  @author zhongyuqi
 * 创建时间: 2019-07-10 17:37:52
 * 项目名称：dfbp-repo-manage
 * 文件名称: ParamRivalCashAccountController.ts
 * 文件描述: @Description: 对手方-托管行账户信息表 前端控制器
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamRivalCashAccountService from "../service/ParamRivalCashAccountService";
import PageVO from "../../common/vo/PageVO";
import {
    ParamRivalCashAccountReqVO,
    ParamRivalCashAccountRepVO
} from "../vo/ParamRivalCashAccountVO";
import { mapState } from "vuex";
import DialogVO from "../../common/vo/DialogVO";
import dateUtils from "../../common/util/DateUtils";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import RivalCashAccountDicDataVO from "../vo/RivalCashAccountDicDataVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import { BaseConst } from "../../common/const/BaseConst";
import ParamRivalCashAccountDialog from "../view/ParamRivalCashAccountDialog.vue";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { RivalValidateConst } from "../const/RivalValidateConst";

/**
 * <p>
 * 对手方-托管行账户信息表 前端控制器
 * </p>
 *
 * @author zhongyuqi
 * @since 2019-07-10 17:37:53
 */
@Component({
    components: { ParamRivalCashAccountDialog },
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
export default class ParamRivalCashAccountController extends BaseController {
    /** service */
    public service: ParamRivalCashAccountService = new ParamRivalCashAccountService();
    /** 前端请求VO */
    public reqVO: ParamRivalCashAccountReqVO = new ParamRivalCashAccountReqVO();
    /** 分页对象 */
    public pageVO: PageVO = new PageVO();
    /** 详情 */
    public details: ParamRivalCashAccountRepVO = new ParamRivalCashAccountRepVO();
    /** dialog显示控制 */
    private dialogVisible: boolean = false;
    /** 数据字典 */
    private rivalCashAccountDicDataVO: RivalCashAccountDicDataVO = new RivalCashAccountDicDataVO();
    /** 选中信息 */
    private multipleSelection: any = [];
    // 字典
    private dicService: DicService = new DicService();
    /** 子组件显示的信息 */
    private cardNumber: {
        type: OperationTypeEnum;
        data: ParamRivalCashAccountRepVO;
        rivalCashAccountDicDataVO: RivalCashAccountDicDataVO;
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
     * 对手方-托管行账户信息表  数据准备
     * @Title: mounted
     * @throws
     * @author: zhongyuqi
     * @Date:   2019-07-10 17:37:53
     */
    public mounted() {
        this.reqVO = new ParamRivalCashAccountReqVO();
        this.$nextTick(() => {
            this.query();
        });
        this.cacheDict();
    }

    /**
     * 对手方-托管行账户信息表列表查询
     * @Title: query
     * @throws
     * @author: zhongyuqi
     * @Date:   2019-07-10 17:37:53
     */
    public query(): void {
        this.reqVO.rivalNo = this.rivalInfo.rivalNo;
        this.service.pageList(this.reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                this.win_message_error(res.msg);
            }
            this.pageVO = res.data;
        });
    }

    /**
     * 对手方-托管行账户信息表 分页列表查询
     * @Title: pageQuery
     * @param pageVO
     * @throws
     * @author: zhongyuqi
     * @Date:   2019-07-10 17:37:53
     */
    public pageQuery(pageVO: PageVO) {
        this.reqVO.reqPageNum = pageVO.pageNum;
        this.reqVO.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /**
     * 对手方-托管行账户信息表 分页列表查询
     * @Title: pageQuery
     * @param reqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: zhongyuqi
     * @Date:   2019-07-10 17:37:53
     */
    public reset(): void {
        this.reqVO = new ParamRivalCashAccountReqVO();
    }

    /**
     * 缓存字典
     */
    private cacheDict() {
        const dic = new DicReqVO();
        /**
         * 交易市场,当天是否交易
         */
        dic.parentDicCodeList = [RivalValidateConst.BANK_STOP];

        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                this.rivalCashAccountDicDataVO.stopTypes =
                    res.data[RivalValidateConst.BANK_STOP];
            });
    }

    /** 数据字典映射 */
    private formatDic({ row, column }) {
        if (column.property === "createUserId") {
            return row.updateUserId ? row.updateUserId : row.createUserId;
        }
        if (column.property === "createTime") {
            const date = new Date(
                row.updateTime ? row.updateTime : row.createTime
            );
            return dateUtils.dateFtt("yyyy-MM-dd hh:mm:ss", date);
        }
        // 停用标志
        if (column.property === "stop") {
            return this.getLabelFromDic(
                row.stop,
                this.rivalCashAccountDicDataVO.stopTypes
            );
        }
    }

    /** 字典 */
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

    /**
     * 新增、修改、删除弹框
     * @param row
     * @param type
     */
    private operation(row: ParamRivalCashAccountRepVO, type: string) {
        this.dialogVisible = true;

        if (type === OperationTypeEnum.ADD) {
            row = new ParamRivalCashAccountRepVO();
            this.cardNumber = {
                type: OperationTypeEnum.ADD,
                data: this.setRivalInfo(row),
                rivalCashAccountDicDataVO: this.rivalCashAccountDicDataVO
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                type: OperationTypeEnum.DELETE,
                data: this.setRivalInfo(row),
                rivalCashAccountDicDataVO: this.rivalCashAccountDicDataVO
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                type: OperationTypeEnum.UPDATE,
                data: this.setRivalInfo(row),
                rivalCashAccountDicDataVO: this.rivalCashAccountDicDataVO
            };
        }
    }

    /** 双击查看 */
    private dblclick({ row }, event: Event) {
        this.dialogVisible = true;
        this.cardNumber = {
            type: OperationTypeEnum.VIEW,
            data: this.setRivalInfo(row),
            rivalCashAccountDicDataVO: this.rivalCashAccountDicDataVO
        };
    }

    /** 设置交易对手信息 */
    private setRivalInfo(data: ParamRivalCashAccountRepVO) {
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
                        (element: ParamRivalCashAccountRepVO) => {
                            ids.push(element.id);
                        }
                    );
                    const idsStr: string = ids.join(",");
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
