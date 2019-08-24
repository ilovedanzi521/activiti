<template>
    <win-fdialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisibleSon" :close-on-click-modal="false" :close-on-press-escape="false" width="40%">
        <win-form class="form" :rules="rules" id="#create" :model="prodPortfolioDetail" label-width="120px" ref="rulesForm" size="small">
            <p style="text-align: left; margin: -30px 0 0px">产品信息</p>
            <el-divider></el-divider>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="产品代码" prop="fundCode" class="dialogItem">
                        <win-input v-model="prodPortfolioDetail.fundCode" disabled></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="产品名称" prop="fundName" class="dialogItem">
                        <win-input v-model="prodPortfolioDetail.fundName" disabled></win-input>
                    </win-form-item>
                </win-col>
            </win-row>
            <p style="text-align: left; margin: 0 0 0px">资产单元信息</p>
            <el-divider></el-divider>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="所属资产单元" prop="assetUnitNo" class="dialogItem">
                        <win-select v-model="prodPortfolioDetail.assetUnitNo" @change="setCashAccountNumber" :disabled="editDisabled" filterable placeholder="请选择" clearable>
                            <win-option v-for="item in prodAssetUnitRepVOs" :key="item.no" :label="item.assetUnitName" :value="item.no">
                                <span style="float: left">{{ item.no }}</span>
                                <span>{{ "&nbsp;"+item.assetUnitName }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
            </win-row>
            <p style="text-align: left; margin: 0 0 0px">组合信息</p>
            <el-divider></el-divider>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="组合编号" prop="no" class="dialogItem" v-if="showNo">
                        <win-input v-model="prodPortfolioDetail.no" disabled></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="组合名称" prop="portfolioName" class="dialogItem">
                        <win-input v-model="prodPortfolioDetail.portfolioName" clearable maxlength=100 :disabled="allDisabled"></win-input>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="资金账号" prop="cashAccountNumber" class="dialogItem">
                        <win-select v-model="prodPortfolioDetail.cashAccountNumber" filterable placeholder="请选择" clearable :disabled="allDisabled">
                            <win-option v-for="item in cashAccountNumber['capitalAccount']" :key="item.accountCode" :label="item.accountName" :value="item.accountCode">
                                <span style="float: left">{{ item.accountCode }}</span>
                                <span>{{ "&nbsp;"+item.accountName }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="组合类型" prop="portfolioType" class="dialogItem">
                        <win-select v-model="prodPortfolioDetail.portfolioType" filterable placeholder="请选择" clearable :disabled="allDisabled">
                            <win-option v-for="item in portfolioDicData['portfolioType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                <span style="float: left">{{ item.dicCode }}</span>
                                <span>{{ "&nbsp;"+item.dicExplain }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="交易市场权限" prop="permitMarketCodes" class="dialogItem">
                        <win-select v-model="prodPortfolioDetail.permitMarketCodeArray" filterable multiple @visible-change="setPermitSecurityTypes" placeholder="请选择" clearable>
                            <win-option :disabled="allDisabled" v-for="item in portfolioDicData['marketCode']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                <span style="float: left">{{ item.dicCode }}</span>
                                <span>{{ "&nbsp;"+item.dicExplain }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="证券类别权限" prop="permitSecurityTypes" class="dialogItem">
                        <win-input v-model="prodPortfolioDetail.permitSecurityTypes" class="input-edit" disabled style="width:176px;" clearable></win-input>
                        <win-button type="primary" @click="createTransfer('permitSecurityTypes')" icon="el-icon-edit"></win-button>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="交易方向权限" prop="permitTransactionDirections" class="dialogItem">
                        <win-input v-model="prodPortfolioDetail.permitTransactionDirections" class="input-edit" disabled style="width:176px;" clearable></win-input>
                        <win-button type="primary" @click="createTransfer('permitTransactionDirections')" icon="el-icon-edit"></win-button>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="状态" prop="status" class="dialogItem">
                        <win-select v-model="prodPortfolioDetail.status" filterable placeholder="请选择" clearable :disabled="allDisabled">
                            <win-option v-for="item in statuss" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
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
                        <win-input type="textarea" v-model="prodPortfolioDetail.summary" :rows="3" maxlength=255 placeholder="请输入内容" :disabled="allDisabled">
                        </win-input>
                    </win-form-item>
                </win-col>
            </win-row>

        </win-form>
        <div slot="footer" class="dialog-footer" v-show="buttonShow">
            <win-button @click="dialogCancel">取消</win-button>
            <win-button type="primary" :loading="createLoading" @click="submitDialog('rulesForm')">{{dialogSumbitText}}</win-button>
        </div>
        <!-- Transfer begin-->
        <ProdPortfolioTransfer :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="transferVisible"></ProdPortfolioTransfer>
        <!-- Transfer end-->
    </win-fdialog>
</template>
<script lang="ts">
import ProdPortfolioDialogController from "../controller/ProdPortfolioDialogController";
import Component from "vue-class-component";

@Component
export default class ProdPortfolioDialog extends ProdPortfolioDialogController {}
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