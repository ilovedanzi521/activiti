import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamPublisherService from "../service/ParamPublisherService";
import ParamPublisherRepVO from "../vo/ParamPublisherRepVO";
import DialogUtil from "../../common/vo/DialogVO";
import CompareData from "../vo/CompareData";
/**
 * 类描述：发行人新增、修改、删除弹框controller
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
@Component
export default class PublisherDialogController extends BaseController {
    /** 发行人service */
    public service: ParamPublisherService = new ParamPublisherService();
    /** 新增、保存对象 */
    @Prop()
    public publisherVO: ParamPublisherRepVO;
    /** 打开、编辑、删除弹出框VO */
    @Prop()
    public dialogVO: DialogUtil;
    /** 加载前，数据准备 */
    @Prop()
    public compareData: CompareData;

    /** 新增、修改，表单验证规则 */
    public rules = {
        publisherCode: [
            {
                required: true,
                message: "发行人编号不能为空",
                trigger: "blur"
            },
            {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "发行人编号只能是英文或数字",
                trigger: "blur"
            }
        ],
        publisherName: [
            {
                required: true,
                message: "发行人名称不能为空",
                trigger: "blur"
            }
        ],
        date: [
            {
                required: true,
                message: "日期不能为空",
                trigger: "blur"
            }
        ],
        registerCapital: [
            {
                pattern: /^[0-9]+(.[0-9]{1,2})?$/,
                message: "注册资产必须为数字,且最多2位小数",
                trigger: "blur"
            }
        ]
    };

    /** 发行人新增 */
    public addPublisher(formName) {
        const form: any = this.$refs[formName];
        form.validate((valid) => {
            if (valid) {
                this.service.add(this.publisherVO).then((res) => {
                    if (res.winRspType === "ERROR") {
                        this.win_message_error(res.msg);
                    } else {
                        this.closeFormDialog();
                        this.query();
                    }
                });
            }
        });
    }

    /** 发行人修改 */
    public updatePublisher(formName) {
        const form: any = this.$refs[formName];
        form.validate((valid) => {
            if (valid) {
                this.service.update(this.publisherVO).then((res) => {
                    if (res.winRspType === "ERROR") {
                        this.win_message_error(res.msg);
                    } else {
                        this.closeFormDialog();
                        this.query();
                    }
                });
            }
        });
    }

    /** 发行人删除 */
    public deletePublisher() {
        this.service.delete(this.publisherVO.id).then((res) => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.closeFormDialog();
                this.query();
            }
        });
    }

    /** 关闭弹框 */
    public closeFormDialog() {
        const form: any = this.$refs.publisherForm;
        if (form) {
            form.resetFields();
        }
        this.dialogVO.visible = false;
    }

    @Emit("query")
    // tslint:disable-next-line: no-empty
    public query() {}
}
