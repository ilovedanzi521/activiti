/****************************************************
 * 创建人：  @author zoujian
 * 创建时间: 2019-07-03 17:27:28
 * 项目名称：dfbp-common-basicparameter
 * 文件名称: ProdSettlementAccountController.ts
 * 文件描述: @Description: 结算账户表 前端控制器
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ProdSettlementAccountService from "../service/ProdSettlementAccountService";
import PageVO from "../../common/vo/PageVO";
import {
    ProdSettlementAccountReqVO,
    ProdSettlementAccountRepVO
} from "../vo/ProdSettlementAccountVO";
import { mapState } from "vuex";
import ProdSettlementAccountDialog from "../view/ProdSettlementAccountDialog.vue";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { WinRspType } from "../../common/enum/BaseEnum";
import DicService from "../../dictionary/service/DicService";
import { WinResponseData } from "../../common/vo/BaseVO";
import dateUtils from "../../common/util/DateUtils";

@Component({
    components: { ProdSettlementAccountDialog },
    computed: {
        ...mapState({
            prodInfo: state => state.product.prodInfo
        })
    },
    watch: {
        prodInfo: {
            handler(newValue, oldValue) {
                this.query();
            }
        }
    }
})
export default class ProdSettlementAccountController extends BaseController {
    /** service */
    public service: ProdSettlementAccountService = new ProdSettlementAccountService();
    /** 前端请求VO */
    public reqVO: ProdSettlementAccountReqVO = new ProdSettlementAccountReqVO();
    /** 分页对象 */
    public pageVO: PageVO = new PageVO();
    /** 详情 */
    public details: ProdSettlementAccountRepVO = new ProdSettlementAccountRepVO();
    /** 数据字典service */
    private dicService: DicService = new DicService();
    /** 弹框页面是否可见 */
    private dialogVisible: boolean = false;
    /** 托管机构数据字典 */
    private escrowAgencyDic: DicRepVO[] = [];
    /** 子组件显示的信息 */
    private cardNumber: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ProdSettlementAccountRepVO;
        escrowAgencyDic: DicRepVO[];
    };
    /**
     * 结算账户表  数据准备
     * @Title: mounted
     * @author: zoujian
     * @Date:   2019-07-03 17:27:28
     */
    public mounted() {
        /** 托管账户 */
        const dic: DicReqVO = new DicReqVO();
        dic.parentDicCode = "1000268";
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            this.escrowAgencyDic = res.data;
        });
        this.query();
    }

    /**
     * 结算账户表列表查询
     * @Title: query
     * @throws
     * @author: zoujian
     * @Date:   2019-07-03 17:27:28
     */
    public query(): void {
        this.reqVO.fundNo = this.prodInfo.fundNo;
        this.service.list(this.reqVO).then((res: WinResponseData) => {
            if (res.winRspType === WinRspType.ERROR) {
                this.win_message_error(res.msg);
            }
            this.pageVO = res.data;
        });
    }

    /**
     * 结算账户表 分页列表查询
     * @Title: pageQuery
     * @param pageVO
     * @throws
     * @author: zoujian
     * @Date:   2019-07-03 17:27:28
     */
    public pageQuery(pageVO: PageVO) {
        this.reqVO.reqPageNum = pageVO.pageNum;
        this.reqVO.reqPageSize = pageVO.pageSize;
        this.query();
    }
    /** 子组件回调函数 */
    private toFatherMsg(msg: string) {
        if (msg === WinRspType.SUCC) {
            this.query();
        }
        this.dialogVisible = false;
    }

    /** 双击查看 */
    private dblclick({ row, rowIndex, column, columnIndex }, event: Event) {
        this.cardNumber = {
            dialogTitle: SettlementAccountConst.CREATETITLE,
            type: OperationTypeEnum.VIEW,
            data: this.setFundInfo(row),
            escrowAgencyDic: this.escrowAgencyDic
        };
        this.dialogVisible = true;
    }

    /**
     * 新增、修改、删除弹框
     * @param row
     * @param type
     */
    private operation(row: ProdSettlementAccountRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            row = new ProdSettlementAccountRepVO();
            this.cardNumber = {
                dialogTitle: SettlementAccountConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: this.setFundInfo(row),
                escrowAgencyDic: this.escrowAgencyDic
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                dialogTitle: SettlementAccountConst.DELETETITLE,
                type: OperationTypeEnum.DELETE,
                data: this.setFundInfo(row),
                escrowAgencyDic: this.escrowAgencyDic
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                dialogTitle: SettlementAccountConst.MODIFYTITLE,
                type: OperationTypeEnum.UPDATE,
                data: this.setFundInfo(row),
                escrowAgencyDic: this.escrowAgencyDic
            };
        }
        this.dialogVisible = true;
    }

    /**
     * 设置产品信息
     * @param data
     */
    private setFundInfo(data: ProdSettlementAccountRepVO) {
        data.fundNo = this.prodInfo.fundNo;
        data.fundCode = this.prodInfo.fundCode;
        data.fundName = this.prodInfo.fundName;
        return data;
    }

    /** 数据字典映射 */
    private formatDic({ cellValue, row, rowIndex, column, columnIndex }) {
        if (column.property === "escrowAgency") {
            return this.getLabelFromDic(row.escrowAgency, this.escrowAgencyDic);
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
}

export const SettlementAccountConst = {
    /** 新增结算账户 */
    CREATETITLE: "新增结算账户",
    /** 查看结算账户 */
    VIEWTITLE: "查看结算账户",
    /** 修改结算账户 */
    MODIFYTITLE: "修改结算账户",
    /** 删除结算账户 */
    DELETETITLE: "删除结算账户"
};
