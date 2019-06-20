import Vue from "vue";
import { Component } from "vue-property-decorator";
/**Trade插件开始 */
import TSearch from "@/components/Trade-Search.vue";
import TButton from "@/components/Trade-Button.vue";
import TTable from "@/components/Trade-Table.vue";
import TDown from "@/components/Trade-down.vue";
import Pagination from "@/components/Trade-Pagination.vue";
/**Trade插件结束 */
/**Win插件开始 */
import { win_button } from "../../../components/win-button";
import { win_dialog } from "../../../components/win-dialog";
import { win_form, win_form_item } from "../../../components/win-form";
import { win_input } from "../../../components/win-input";
import { win_menu, win_menu_item, win_sub } from "../../../components/win-menu";
import { win_pagination } from "../../../components/win-pagination";
import { win_select, win_option } from "../../../components/win-select";
import { win_switch } from "../../../components/win-switch";
import { win_table, win_table_column } from "../../../components/win-table";
import { win_tabs, win_tab } from "../../../components/win-tabs";
import { win_date_picker } from "../../../components/win-date-picker";
import { win_tree } from "../../../components/win-tree";
import {
    win_container,
    win_aside,
    win_header,
    win_footer,
    win_main
} from "../../../components/win_container";
import { MessageBox } from "element-ui";
/**Win插件结束 */
import PageVO from "../../common/vo/PageVO";
import { DicRepVO } from "../../dictionary/vo/DicVO";
@Component({
    components: {
        TSearch,
        TButton,
        TTable,
        TDown,
        Pagination,
        win_button,
        win_date_picker,
        win_dialog,
        win_form,
        win_form_item,
        win_input,
        win_menu,
        win_menu_item,
        win_sub,
        win_pagination,
        win_select,
        win_option,
        win_switch,
        win_table,
        win_table_column,
        win_tabs,
        win_tab,
        win_tree,
        win_container,
        win_aside,
        win_header,
        win_footer,
        win_main
    }
})
export default class BaseController extends Vue {
    /**弹出框详情 */
    dialogVisible: boolean = false;

    pageVO: PageVO = new PageVO();

    /**关闭详情框 */
    closeDialog() {
        this.dialogVisible = false;
    }

    /**打开详情框 */
    openDialog() {
        this.dialogVisible = true;
    }

    /**提示信息,success */
    successMessage(info) {
        this.$message({
            type: "success",
            message: info
        });
    }

    /**提示信息,info */
    infoMessage(info) {
        this.$message({
            type: "info",
            message: info
        });
    }

    /**提示信息,error */
    errorMessage(info) {
        this.$message({
            type: "error",
            message: info
        });
    }

    /**提示信息,warning */
    warningMessage(info) {
        this.$message({
            type: "warning",
            message: info
        });
    }

    /**字典值,表格显示 */
    dicFormatter(cellValue: string, dics: DicRepVO[]) {
        for (var i = 0; i < dics.length; i++) {
            if (cellValue === dics[i].dicCode) {
                return dics[i].dicExplain;
            }
        }
        return "";
    }

    /**对象复制 */
    copy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    /**
     * 警告提示框方法提供
     * @param msg 消息内容
     * @param title 标题（可为空）
     * @param htmlAble 是否转义成html（是传true）可不传
     * @param confirmText 确定按钮内容（可为空默认为确定）
     * @param cancelText 取消关闭按钮内容（可为空默认为取消）
     */
    win_message_box_warning(
        msg: any,
        title: string,
        htmlAble: boolean,
        confirmText: string,
        cancelText: string
    ) {
        return MessageBox.confirm(msg, title, {
            confirmButtonText: confirmText === undefined ? "确定" : confirmText,
            cancelButtonText: cancelText === undefined ? "取消" : cancelText,
            dangerouslyUseHTMLString: htmlAble === true ? true : false,
            type: "warning"
        });
    }
}
