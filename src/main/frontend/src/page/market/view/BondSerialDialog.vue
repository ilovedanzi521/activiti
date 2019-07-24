<template>
    <div class="BondSerialDialog">
        <!--债券分期还本详情对话框:Begin -->
        <win_dialog :title="myTitle" :visible.sync="dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false" width="42%" :before-close="handleClose">
            <!--债券分期还本详情表单:Begin -->
            <win_form :model="form" ref="ruleForm" :rules="serialDetailRules" :disabled="allDisabled" label-width="110px" :inline="true">
                <div class="form_content">
                    <win_form_item label="证券内码" prop="securityCode">
                        <win_select v-model="form.securityCode" filterable clearable :filter-method="outCodeSelectFun" @visible-change="visibleChangeTrigger" :disabled="isCodeDisabled" placeholder="请选择">
                            <win_option v-for="item in securitySelect" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                                <span style="float: left">{{ item.securityCode }}</span>
                                <span>{{ "&nbsp;"+item.securityName }}</span>
                            </win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="偿还日期" prop="repayDate">
                        <el-date-picker v-model="form.repayDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="分期偿还类型" prop="amortizeType">
                        <win_select v-model="form.amortizeType" placeholder="请选择">
                            <win_option v-for="item in bondSerialDicEntity.amortizeType" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="偿还比例" prop="repayRate">
                        <win_input v-model="repayRate" :num="[5,3]" :ratio="0.01" :real.sync="form.repayRate" :negative="false" unit="%" style="width:224px;"></win_input>
                    </win_form_item>
                </div>
            </win_form>
            <!--债券分期还本详情表单:End -->
            <div slot="footer" class="dialog-footer" v-show="isSubmitDisabled">
                <el-button @click="undoForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="dialogFormSubmit('ruleForm')">{{dialogSumbitText}}</el-button>
            </div>
        </win_dialog>
        <!--债券分期还本详情对话框:End -->
    </div>
</template>
<script lang="ts">
import BondSerialDialogController from "../controller/BondSerialDialogController";
import Component from "vue-class-component";

@Component
export default class BondSerialDialog extends BondSerialDialogController {}
</script>
<style lang="scss" scoped>
.form_content /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 224px;
}
</style>