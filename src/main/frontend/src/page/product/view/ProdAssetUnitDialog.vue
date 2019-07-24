<template>
    <win_dialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisibleSon" :close-on-click-modal="false" :close-on-press-escape="false" width="40%">
        <win_form class="form" :rules="rules" id="#create" :model="prodAssetUnitDetail" :disabled="allDisabled" label-width="120px" ref="rulesForm" size="small">
            <p style="text-align: left; margin: -30px 0 0px">产品信息</p>
            <el-divider></el-divider>
            <win_row>
                <win_col :span="spanWidth">
                    <win_form_item label="产品代码" prop="fundCode" class="dialogItem">
                        <win_input v-model="prodAssetUnitDetail.fundCode" disabled></win_input>
                    </win_form_item>
                </win_col>
                <win_col :span="spanWidth">
                    <win_form_item label="产品名称" prop="fundName" class="dialogItem">
                        <win_input v-model="prodAssetUnitDetail.fundName" disabled></win_input>
                    </win_form_item>
                </win_col>
            </win_row>
            <p style="text-align: left; margin: 0 0 0px">资产单元信息</p>
            <el-divider></el-divider>
            <win_row>
                <win_col :span="spanWidth">
                    <win_form_item label="资产单元编号" prop="no" class="dialogItem" v-if="showNo">
                        <win_input v-model="prodAssetUnitDetail.no" disabled></win_input>
                    </win_form_item>
                </win_col>
                <win_col :span="spanWidth">
                    <win_form_item label="资产单元名称" prop="assetUnitName" class="dialogItem">
                        <win_input v-model="prodAssetUnitDetail.assetUnitName" maxlength=100 clearable></win_input>
                    </win_form_item>
                </win_col>
                <win_col :span="spanWidth">
                    <win_form_item label="状态" prop="status" class="dialogItem">
                        <win_select v-model="prodAssetUnitDetail.status" filterable placeholder="请选择" clearable>
                            <win_option v-for="item in statuss" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                <span style="float: left">{{ item.dicCode }}</span>
                                <span>{{ "&nbsp;"+item.dicExplain }}</span>
                            </win_option>
                        </win_select>
                    </win_form_item>
                </win_col>
            </win_row>
            <win_row>
                <win_col :span="spanWidth">
                    <win_form_item label="备注" prop="summary" class="dialogItem">
                        <win_input type="textarea" v-model="prodAssetUnitDetail.summary" :rows="3" maxlength=255 placeholder="请输入内容">
                        </win_input>
                    </win_form_item>
                </win_col>
            </win_row>

        </win_form>
        <div slot="footer" class="dialog-footer" v-show="buttonShow">
            <win_button @click="dialogCancel">取消</win_button>
            <win_button type="primary" :loading="createLoading" @click="submitDialog('rulesForm')">{{dialogSumbitText}}</win_button>
        </div>
    </win_dialog>
</template>
<script lang="ts">
import ProdAssetUnitDialogController from "../controller/ProdAssetUnitDialogController";
import Component from "vue-class-component";

@Component
export default class ProdAssetUnitDialog extends ProdAssetUnitDialogController {}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
.dialogItem /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 224px;
}
.form /deep/ .el-form-item__content {
    text-align: left;
}
.el-button--warning {
    background-color: #ff900d;
}
.el-divider {
    margin: 0px 0px 20px 0px;
}
</style>