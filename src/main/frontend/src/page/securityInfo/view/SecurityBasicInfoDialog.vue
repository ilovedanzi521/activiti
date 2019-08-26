<template>
    <win-fdialog top="0" :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisibleSon" :close-on-click-modal="false" :close-on-press-escape="false" width="60%">
        <win-form class="form" id="#create" :rules="rules" :model="createSecurity" ref="rulesForm" :disabled="allDisabled" label-width="120px" size="small">
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="申报代码" prop="reportCode" class="dialogItem">
                        <win-input :disabled="editDisabled" v-model="createSecurity.reportCode" @input="setSecurityCode" maxlength=17></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="证券代码" prop="securityCode" class="dialogItem">
                        <win-input disabled v-model="createSecurity.securityCode" maxlength=20></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="证券名称" prop="securityName" class="dialogItem">
                        <win-input v-model="createSecurity.securityName" maxlength=100></win-input>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="证券全称" prop="securityFullName" class="dialogItem">
                        <win-input v-model="createSecurity.securityFullName" maxlength=255></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="证券类别" prop="securityType" class="dialogItem">
                        <win-select v-model="createSecurity.securityType" filterable placeholder="请选择" :disabled="editDisabled" @change="changeSecurityType" clearable>
                            <win-option v-for="item in securityBasicInfoDicData['securityType']" :key="item.securityType" :label="item.securityTypeName" :value="item.securityType">
                                <span style="float: left">{{ item.securityType }}</span>
                                <span>{{ "&nbsp;"+item.securityTypeName }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="资产类别" prop="assetType" class="dialogItem">
                        <win-select v-model="createSecurity.assetType" filterable placeholder="请选择" disabled clearable>
                            <win-option v-for="item in securityBasicInfoDicData['assetType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                <span style="float: left">{{ item.dicCode }}</span>
                                <span>{{ "&nbsp;"+item.dicExplain }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="资产证券" prop="assetSecurity" class="dialogItem">
                        <win-input v-model="createSecurity.assetSecurity" maxlength=20></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="关联证券" prop="relatedSecurity" class="dialogItem">
                        <win-input v-model="createSecurity.relatedSecurity" maxlength=20></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="产品代码" prop="productCode" class="dialogItem">
                        <win-input v-model="createSecurity.productCode" maxlength=20></win-input>
                    </win-form-item>
                </win-col>
            </win-row>
            <el-divider></el-divider>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="发行人" prop="issuer" class="dialogItem">
                        <win-select v-model="createSecurity.issuer" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in securityBasicInfoDicData['issuer']" :key="item.publisherCode" :label="item.publisherName" :value="item.publisherCode">
                                <span style="float: left">{{ item.publisherCode }}</span>
                                <span>{{ "&nbsp;"+item.publisherName }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="发行日期" prop="issueDate" class="dialogItem">
                        <el-date-picker v-model="createSecurity.issueDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="上市日期" prop="listDate" class="dialogItem">
                        <el-date-picker v-model="createSecurity.listDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="发行方式" prop="issueType" class="dialogItem">
                        <win-select v-model="createSecurity.issueType" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in securityBasicInfoDicData['issueType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                <span style="float: left">{{ item.dicCode }}</span>
                                <span>{{ "&nbsp;"+item.dicExplain }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="总股本" prop="sharesOutstanding" class="dialogItem">
                        <win-input v-model="createSecurity.sharesOutstanding" :num="[15,2]"></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="流通股本" prop="negotiableCapital" class="dialogItem">
                        <win-input v-model="createSecurity.negotiableCapital" :num="[15,2]"></win-input>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="发行总金额" prop="totalIssueAmount" class="dialogItem">
                        <win-input v-model="createSecurity.totalIssueAmount" :num="[15,2]"></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="交易币种" prop="transCurrency" class="dialogItem">
                        <win-select v-model="createSecurity.transCurrency" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in securityBasicInfoDicData['transCurrency']" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode">
                                <span style="float: left">{{ item.currencyCode }}</span>
                                <span>{{ "&nbsp;"+item.currencyName }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="面值" prop="faceValue" class="dialogItem">
                        <win-input v-model="createSecurity.faceValue" :num="[7,2]"></win-input>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="买入最小数量" prop="minBuyVolume" class="dialogItem">
                        <win-input v-model="createSecurity.minBuyVolume" :num="[15,2]"></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="卖出最小数量" prop="minSellVolume" class="dialogItem">
                        <win-input v-model="createSecurity.minSellVolume" :num="[15,2]"></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="证券状态" prop="longDelist" class="dialogItem">
                        <win-select v-model="createSecurity.longDelist" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in securityBasicInfoDicData['longDelist']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                <span style="float: left">{{ item.dicCode }}</span>
                                <span>{{ "&nbsp;"+item.dicExplain }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="涨停比例" prop="upLimitRatio" class="dialogItem">
                        <win-input v-model="upLimitRatio" :num="[8,6]" :ratio="0.01" :real.sync="createSecurity.upLimitRatio" unit="%" style="width:240px;"></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="跌停比例" prop="downLimitRatio" class="dialogItem">
                        <win-input v-model="downLimitRatio" :num="[8,6]" :ratio="0.01" :real.sync="createSecurity.downLimitRatio" unit="%" style="width:240px;"></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="交易日类型" prop="tradeDayCode" class="dialogItem">
                        <win-select v-model="createSecurity.tradeDayCode" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in securityBasicInfoDicData['tradeDayCode']" :key="item.tradeDayCode" :label="item.tradeDayName" :value="item.tradeDayCode">
                                <span style="float: left">{{ item.tradeDayCode }}</span>
                                <span>{{ "&nbsp;"+item.tradeDayName }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
            </win-row>
            <el-divider></el-divider>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="杂项分类" prop="otherClassification" class="dialogItem">
                        <win-select v-model="createSecurity.otherClassification" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in securityBasicInfoDicData['otherClassification']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                <span style="float: left">{{ item.dicCode }}</span>
                                <span>{{ "&nbsp;"+item.dicExplain }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="标准券" prop="standardSecurity" class="dialogItem">
                        <win-select v-model="createSecurity.standardSecurity" filterable :filter-method="getStandardSecurity" @visible-change="visibleChangeTrigger" placeholder="请选择" clearable>
                            <win-option v-for="item in standardSecuritys" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                                <span style="float: left">{{ item.securityCode }}</span>
                                <span>{{ "&nbsp;"+item.securityName }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="原始权益人" prop="originalRightsHolder" class="dialogItem">
                        <win-input v-model="createSecurity.originalRightsHolder" maxlength=255></win-input>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="网上预估中签率" prop="onlineEstimatedWinningRate" class="dialogItem">
                        <win-input v-model="onlineEstimatedWinningRate" :num="[8,6]" :ratio="0.01" :real.sync="createSecurity.onlineEstimatedWinningRate" unit="%" style="width:240px;"></win-input>
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
import SecurityBasicInfoDialogController from "../controller/SecurityBasicInfoDialogController";
import Component from "vue-class-component";

@Component
export default class SecurityBasicInfoDialog extends SecurityBasicInfoDialogController {}
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

