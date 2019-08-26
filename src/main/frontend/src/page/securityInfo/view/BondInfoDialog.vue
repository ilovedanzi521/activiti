<template>
    <div class="BondInfoDialog">
        <!--债券基本信息详情对话框:Begin -->
        <win-fdialog :title="BondInfoDialogControl.myTitle" :visible.sync="BondInfoDialogControl.dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false" width="62%" top="0" :before-close="handleClose">
            <!--债券基本信息详情表单:Begin -->
            <win-form :model="form" ref="ruleForm" :rules="infoDetailRules" :disabled="BondInfoDialogControl.allDisabled" label-width="110px" :inline="true">
                <win-form-item label="证券代码" prop="securityCode">
                    <win-select v-model="form.securityCode" filterable clearable :filter-method="outCodeSelectFun" @change="selectCodeTrigger(form.securityCode)" @visible-change="visibleChangeTrigger"
                        :disabled="BondInfoDialogControl.codeDisabled" placeholder="请选择">
                        <win-option v-for="item in securityCodeSelect" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                            <span style="float: left">{{ item.securityCode }}</span>
                            <span>{{ "&nbsp;"+item.securityName }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="证券类别" prop="securityType">
                    <win-select v-model="form.securityType" disabled placeholder="证券类别">
                        <win-option v-for="item in securitySelect.securityTypeSelect" :key="item.securityType" :label="item.securityTypeName" :value="item.securityType"></win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="付息类型" prop="payInterestType">
                    <win-select v-model="form.payInterestType" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['payInterestType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="起息日" prop="valueDate">
                    <el-date-picker v-model="form.valueDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </win-form-item>
                <win-form-item label="止息日" prop="stopDate">
                    <el-date-picker v-model="form.stopDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </win-form-item>
                <win-form-item label="到期日" prop="dueDate">
                    <el-date-picker v-model="form.dueDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </win-form-item>
                <win-form-item label="利率类型" prop="rateType">
                    <win-select v-model="form.rateType" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['rateType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="基准类型" prop="baseType">
                    <win-select v-model="form.baseType" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['baseType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="计息基准" prop="interestStandard">
                    <win-select v-model="form.interestStandard" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['interestStandard']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="票面利率" prop="couponRate">
                    <win-input v-model="couponRate" :num="[5,3]" :ratio="0.01" :real.sync="form.couponRate" :negative="false" unit="%" style="width:224px;"></win-input>
                </win-form-item>
                <win-form-item label="当前面额" prop="currentAmount">
                    <win-input v-model="form.currentAmount" :num="[10,2]" :negative="false"></win-input>
                </win-form-item>
                <win-form-item label="发行价" prop="issuePrice">
                    <win-input v-model="form.issuePrice" :num="[10,2]" :negative="false"></win-input>
                </win-form-item>
                <win-form-item label="年付息次数" prop="yearPaymentCount">
                    <win-input v-model="form.yearPaymentCount" :num="[10]" :negative="false"></win-input>
                </win-form-item>
                <win-form-item label="报价方式" prop="priceType">
                    <win-select v-model="form.priceType" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['priceType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="债券期次" prop="bondIssue">
                    <win-input v-model="form.bondIssue" :num="[10]" :negative="false"></win-input>
                </win-form-item>
                <win-form-item label="期限" prop="deadline">
                    <win-input v-model="form.deadline" :num="[10]" :negative="false" unit="年" style="width:224px;"></win-input>
                </win-form-item>
                <win-form-item label="内部评级" prop="internalRating">
                    <win-select v-model="form.internalRating" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['internalRating']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="外部评级" prop="externalRating">
                    <win-select v-model="form.externalRating" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['externalRating']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="本金偿还类型" prop="capitalPayType">
                    <win-select v-model="form.capitalPayType" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['capitalPayType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="保底利率" prop="minRate">
                    <win-input v-model="minRate" :num="[5,3]" :ratio="0.01" :real.sync="form.minRate" :negative="false" unit="%" style="width:224px;"></win-input>
                </win-form-item>
                <win-form-item label="机构托管" prop="trusteeAgency">
                    <win-select v-model="form.trusteeAgency" clearable placeholder="请选择">
                        <win-option v-for="item in bondDicData['trusteeAgency']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="是否可赎回" prop="isRedeemable">
                    <win-select v-model="form.isRedeemable" @change="selectRedeemTrigger(form.isRedeemable)" placeholder="请选择">
                        <win-option v-for="item in bondDicData['isRedeemable']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="赎回日期" prop="redeemDate">
                    <el-date-picker v-model="form.redeemDate" value-format="yyyy-MM-dd" :disabled="BondInfoDialogControl.isRedeemableDisabled" type="date" placeholder="选择日期"></el-date-picker>
                </win-form-item>
                <win-form-item label="赎回价格" prop="redeemPrice">
                    <win-input v-model="form.redeemPrice" :num="[10,2]" :negative="false" :disabled="BondInfoDialogControl.isRedeemableDisabled"></win-input>
                </win-form-item>
                <win-form-item label="是否可回售" prop="isPutBack">
                    <win-select v-model="form.isPutBack" @change="selectPutBackTrigger(form.isPutBack)" placeholder="请选择">
                        <win-option v-for="item in bondDicData['isPutBack']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="回售日期" prop="putDate">
                    <el-date-picker v-model="form.putDate" value-format="yyyy-MM-dd" type="date" :disabled="BondInfoDialogControl.isPutBackDisabled" placeholder="选择日期"></el-date-picker>
                </win-form-item>
                <win-form-item label="回售价格" prop="putPrice">
                    <win-input v-model="form.putPrice" :num="[10,2]" :negative="false" :disabled="BondInfoDialogControl.isPutBackDisabled"></win-input>
                </win-form-item>
                <div class="content">
                    <win-form-item label="回售登记开始日" prop="putRegisterStart">
                        <el-date-picker v-model="form.putRegisterStart" value-format="yyyy-MM-dd" type="date" :disabled="BondInfoDialogControl.isPutBackDisabled" placeholder="选择日期"></el-date-picker>
                    </win-form-item>
                    <win-form-item label="回售登记截止日" prop="putRegisterEnd">
                        <el-date-picker v-model="form.putRegisterEnd" value-format="yyyy-MM-dd" type="date" :disabled="BondInfoDialogControl.isPutBackDisabled" placeholder="选择日期"></el-date-picker>
                    </win-form-item>
                    <win-form-item style="width:334px;">

                    </win-form-item>
                </div>
                <!--支持转股债券信息表单:Begin -->
                <div class="shareTransfer" v-show="BondInfoDialogControl.isShareTransferAble">
                    <win-form-item label="转股开始日" prop="shareTransferStart">
                        <el-date-picker v-model="form.shareTransferStart" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                    </win-form-item>
                    <win-form-item label="转股结束日" prop="shareTransferEnd">
                        <el-date-picker v-model="form.shareTransferEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                    </win-form-item>
                    <win-form-item label="转股价" prop="conversionPrice">
                        <win-input v-model="form.conversionPrice" :num="[10,2]" :negative="false"></win-input>
                    </win-form-item>
                </div>
                <!--支持转股债券信息表单:End -->
            </win-form>
            <!--债券基本信息详情表单:End -->
            <!--末尾提交框:Begin -->
            <div slot="footer" class="dialog-footer" v-show="BondInfoDialogControl.isSubmitDisabled">
                <win-button @click="undoForm('ruleForm')">取 消</win-button>
                <win-button type="primary" @click="dialogFormSubmit('ruleForm')">{{BondInfoDialogControl.dialogSumbitText}}</win-button>
            </div>
            <!--末尾提交框:End -->
        </win-fdialog>
        <!--债券基本信息详情对话框:End -->
    </div>
</template>
<script lang="ts">
import BondInfoDialogController from "../controller/BondInfoDialogController";
import Component from "vue-class-component";

@Component
export default class BondInfoDialog extends BondInfoDialogController {}
</script>
<style lang="scss" scoped>
.BondInfoDialog /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 224px;
}
.BondInfoDialog /deep/ .el-dialog .el-dialog__body {
    padding: 30px 20px;
    font-size: 14px;
    word-break: break-all;
    text-align: center;
    height: 660px;
    box-sizing: border-box;
    overflow: auto;
}
</style>