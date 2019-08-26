<template>
    <win-fdialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisibleSon" :close-on-click-modal="false" :close-on-press-escape="false" width="40%">
        <win-form class="form" :rules="rules" id="#create" :model="prodSubConsignorDetail" :disabled="allDisabled" label-width="130px" ref="rulesForm" size="small">
            <p style="text-align: left; margin: -30px 0 0px">委托人信息</p>
            <el-divider></el-divider>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="所属委托人" prop="consignorNo" class="dialogItem">
                        <win-select v-model="prodSubConsignorDetail.consignorNo" :disabled="editDisabled" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in ProdConsignorVOs" :key="item.no" :label="item.name" :value="item.no">
                                <span style="float: left">{{ item.no }}</span>
                                <span>{{ "&nbsp;"+item.name }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
            </win-row>
            <el-divider></el-divider>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="二级委托人编号" prop="no" class="dialogItem" v-if="showNo">
                        <win-input v-model="prodSubConsignorDetail.no" disabled></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="二级委托人名称" prop="name" class="dialogItem">
                        <win-input v-model="prodSubConsignorDetail.name" maxlength=50></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="二级委托人简称" prop="shortName" class="dialogItem">
                        <win-input v-model="prodSubConsignorDetail.shortName" maxlength=20></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="公司类型" prop="companyType" class="dialogItem">
                        <win-select v-model="prodSubConsignorDetail.companyType" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in subConsignorDicData.type" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                <span style="float: left">{{ item.dicCode }}</span>
                                <span>{{ "&nbsp;"+item.dicExplain }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="备注" prop="summary" class="dialogItem">
                        <win-input type="textarea" v-model="prodSubConsignorDetail.summary" :rows="3" maxlength=100 placeholder="请输入内容">
                        </win-input>
                    </win-form-item>
                </win-col>
            </win-row>

        </win-form>
        <div slot="footer" class="dialog-footer" v-show="buttonShow">
            <win-button @click="dialogCancel">取消</win-button>
            <win-button type="primary" :loading="createLoading" @click="submitDialog('rulesForm')">{{dialogSumbitText}}</win-button>
        </div>
    </win-fdialog>
</template>
<script lang="ts">
import ProdSubConsignorDialogController from "../controller/ProdSubConsignorDialogController";
import Component from "vue-class-component";

@Component
export default class ProdSubConsignorDialog extends ProdSubConsignorDialogController {}
</script>

<style lang="scss" scoped>
.dialogItem /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 224px;
}
.form /deep/ .el-form-item__content {
    text-align: left;
}
.el-divider {
    margin: 0px 0px 20px 0px;
}
</style>