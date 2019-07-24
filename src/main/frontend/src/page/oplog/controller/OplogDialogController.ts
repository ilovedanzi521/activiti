import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import DialogVO from "../../common/vo/DialogVO";
import RepVO from "../vo/SysOplogRepVO";
import { CompareVO } from "../vo/CompareVO";
/**
 * 类描述：用户操作日志详情controller
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
@Component
export default class OplogDialogController extends BaseController {
    /** 弹框对象 */
    @Prop()
    public dialogVO: DialogVO;
    /** 日志详情 */
    @Prop()
    public details: RepVO;
    /**数据准备对象 */
    public compareVO: any = CompareVO;

    /** 关闭弹框 */
    public closeFormDialog(formName: string): void {
        let form: any = this.$refs[formName];
        if (form) {
            form.resetFields();
        }
        this.dialogVO.visible = false;
    }

    @Emit("query")
    public query() {}
}
