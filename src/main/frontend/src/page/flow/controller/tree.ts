import Vue from "vue";
import { Component } from "vue-property-decorator";
import ExchangeFlowService from "../service/ExchangeFlowService";
import {
    ParamFlowInstReqVO,
    ParamFlowInstRepVO
} from "../bean/ParamFlowInstVO";
import { ParamFlowGroupVO } from "../bean/ParamFlowGroupVO";
import { UserInfoVO } from "../bean/UserInfoVO";
import TSearch from "@/components/Trade-Search.vue";
import TButton from "@/components/Trade-Button.vue";
import TTable from "@/components/Trade-Table.vue";
import TDialog from "@/components/Trade-Dialog.vue";
import TDown from "@/components/Trade-down.vue";
import TPage from "@/components/Trade-Page.vue";
import TTree from "@/components/Trade-Treelike.vue";
import AxiosFun from "../../../api/AxiosFun";
import BaseController from "../../common/controller/BaseController";
@Component({
    components: { TSearch, TButton, TTable, TDialog, TDown, TPage, TTree }
})
export default class ExchangeFlowController extends Vue {
    $refs;
    $set;
    $el;
    setTree: any = []; // tree数据
    NODE_KEY = "id"; // id对应字段
    MAX_LEVEL = 3; // 设定最大层级
    NODE_ID_START = 0; // 新增节点id，逐次递减
    startId = 0;
    service: ExchangeFlowService = new ExchangeFlowService();
    // defaultProps: {
    //     // 默认设置
    //     children: "children";
    //     label: "name";
    // };
    initParam: {
        // 新增参数
        name: "新增节点";
        pid: 0;
        children: [];
    };
    mounted() {
        this.$nextTick(() => {
            this.queryflowgroup();
        });
    }
    //查询流程组
    queryflowgroup() {
        this.service.listFlowGroup().then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.data);
            }
            // _this.data = JSON.parse(res.data);
            this.setTree = res.data;
            console.info(this.setTree);
        });
    }

    created() {
        // 初始值
        this.startId = this.NODE_ID_START;
    }
    // node;
    // data;
    // handleNodeClick(node, data) {
    //     console.info(node.edit);
    //     console.info(node.edit);
    //     this.node = node;
    //     this.data = data;
    //     // let nodew = node;
    //     // console.log(nodew);
    //     // this.data = data;
    // }
    handleDelete(node,data) {
        // 删除节点

        console.log(node, data);
        // 判断是否存在子节点
        if (data.children && data.children.length !== 0) {
            this.$message.error("此节点有子级，不可删除！");
            return false;
        } else {
            // 删除操作
            let DeletOprate = () => {
                this.$nextTick(() => {
                    if (this.$refs.SlotTree) {
                        this.$refs.SlotTree.remove(data);
                        this.$message.success("删除成功！");
                    }
                });
            };

            // 二次确认
            let ConfirmFun = () => {
                this.$confirm("是否删除此节点？", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        DeletOprate();
                    })
                    .catch(() => {});
            };

            // 判断是否新增： 新增节点直接删除，已存在的节点要二次确认
            data[this.NODE_KEY] < this.NODE_ID_START
                ? DeletOprate()
                : ConfirmFun();
        }
    }
    handleInput(node,data) {

        // 修改节点
        // console.log(node, data);
        // 退出编辑状态
        if (node.edit) {
            this.$set(node, "edit", false);
        }
    }
    handleEdit(node,data) {
        // let node = this.node;
        // let data = this.data;
        console.log(node)
        // 编辑节点
        // 设置编辑状态
        // this.$set(node, "edit", true);
        console.log(this.$refs)
        // 输入框聚焦
        this.$nextTick(() => {
            console.log(this.$refs["slotTreeInput" + data.id]);
            if (this.$refs["slotTreeInput" + data.id]) {
                this.$refs[
                    "slotTreeInput" + data[this.NODE_KEY]
                ].$refs.input.focus();
            }
        });
    }
    handleAdd(node,data) {

        // 新增节点
        console.log(node, data);
        // 判断层级
        if (node.level >= this.MAX_LEVEL) {
            this.$message.warning(
                "当前已达到" + this.MAX_LEVEL + "级，无法新增！"
            );
            return false;
        }

        // 参数修改
        let obj = JSON.parse(JSON.stringify(this.initParam)); // copy参数
        obj.pid = data[this.NODE_KEY]; // 父id
        obj[this.NODE_KEY] = --this.startId; // 节点id：逐次递减id
        // 判断字段是否存在
        if (!data.children) {
            this.$set(data, "children", []);
        }
        // 新增数据
        data.children.push(obj);

        // 展开节点
        if (!node.expanded) {
            node.expanded = true;
        }
    }
}
