/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月10日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ParamRepoController
 * 文件描述: @Description: (回购参数Controller)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { Component } from "vue-property-decorator";
import { ParamRepoReqVO, ParamRepoRepVO } from "../vo/ParamRepoVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import ParamRepoService from "../service/ParamRepoService";
import BaseController from "../../common/controller/BaseController";
import RepoDialog from "../view/RepoDialog.vue";
import { WinRspType } from "../../common/enum/BaseEnum";
import PageVO from "../../common/vo/PageVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { BaseConst } from "../../common/const/BaseConst";
import { MessageConst } from "../const/MessageConst";
@Component({ components: { RepoDialog } })
export default class ParamRepoController extends BaseController {
    private paramRepoService: ParamRepoService = new ParamRepoService();
    private formInline: ParamRepoReqVO = new ParamRepoReqVO();
    private selected: any = {};
    private repoInfo: PageVO = new PageVO();
    private dialogVisible: boolean = false;
    private loading: boolean = false;
    /** 传递给子组件的信息 */
    private cardNumber: {
        dialogTitle: string;
        type: string;
        data: ParamRepoRepVO;
    };
    private mounted() {
        this.list();
    }
    /** 子组件回调函数 */
    private fromDialogMsg(msg: WinRspType) {
        if (msg === WinRspType.SUCC) {
            this.list();
        }
        this.dialogVisible = false;
    }
    /** 批量删除 */
    private delBatch() {
        const selected = this.selected;
        if (selected.length > 1) {
            this.win_message_box_warning(
                "此操作将永久删除" +
                    this.selected.length +
                    " 条信息, 是否继续?",
                BaseConst.WARNING,
                false
            )
                .then(() => {
                    const ids = [];
                    selected.forEach((element: any) => {
                        ids.push(element.id);
                    });
                    const idsStr: string = ids.join("_");
                    this.paramRepoService
                        .delBatch(idsStr)
                        .then((response: WinResponseData) => {
                            this.message(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error(
                                MessageConst.REPO_BATCH_DELETE_FAIL
                            );
                        });
                })
                .catch(() => {});
        } else {
            this.operation(selected[0], OperationTypeEnum.DELETE);
        }
    }

    private message(resoponse: WinResponseData) {
        if (resoponse.winRspType === WinRspType.ERROR) {
            this.win_message_error(resoponse.msg);
        } else {
            this.win_message_success(resoponse.msg);
            this.list();
        }
    }
    /** 获取列表数据 */
    private list() {
        this.paramRepoService
            .list(this.formInline)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.repoInfo = response.data;
                }
            })
            .catch((ex: any) => {
                this.win_message_error(MessageConst.REPO_QUERY_FAIL);
            });
    }
    /** 查询当前回购参数所有的securityCode */
    private listAll(queryString, cb) {
        this.paramRepoService
            .list(new ParamRepoReqVO())
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    const list = response.data.list;
                    this.filter(list, cb, queryString);
                }
            })
            .catch((ex: any) => {
                this.win_message_error(MessageConst.REPO_QUERY_FAIL);
            });
    }

    // 证券内码下拉选择处理
    private handleSelect(item) {
        this.formInline.securityCode = item.key;
    }

    /** 过滤并回显 */
    private filter(list, cb, queryString) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: ParamRepoRepVO) => {
                const ob = { value: "", key: "" };
                ob.key = element.securityCode;
                ob.value =
                    element.securityCode + "(" + element.securityName + ")";
                array.push(ob);
            });
        }
        const results = queryString
            ? array.filter(this.createFilter(queryString))
            : array;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }

    private createFilter(queryString: string) {
        return (res: any) => {
            return (
                res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
        };
    }

    /** 双击查看 */
    private dblclick({ row, rowIndex, column, columnIndex }, event: Event) {
        this.cardNumber = {
            dialogTitle:
                BaseConst.VIEW +
                " " +
                row.securityCode +
                " " +
                row.securityName,
            type: OperationTypeEnum.VIEW,
            data: this.copy(row)
        };
        this.dialogVisible = true;
    }

    /** 新增、修改、删除参数预置 */
    private operation(row: ParamRepoRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: RepoConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: new ParamRepoRepVO()
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                dialogTitle:
                    BaseConst.DELETE +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.DELETE,
                data: this.copy(row)
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                dialogTitle:
                    BaseConst.DELETE +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.UPDATE,
                data: this.copy(row)
            };
        }
        this.dialogVisible = true;
    }
    /** 查询 */
    private query() {
        this.list();
    }
    /** 重置 */
    private reset() {
        this.formInline = new ParamRepoReqVO();
    }
    /** 选择相关 */
    private tableSelectionChange(val: any) {
        this.selected = val.selection;
    }

    /** 带分页参数查询 */
    private pageQuery(pageVO: PageVO) {
        this.formInline.reqPageNum = pageVO.pageNum;
        this.formInline.reqPageSize = pageVO.pageSize;
        this.list();
    }
}

export const RepoConst = {
    CREATETITLE: "新增回购参数属性"
};
