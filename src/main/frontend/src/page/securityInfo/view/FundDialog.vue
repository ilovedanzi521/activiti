<template>
  <win-fdialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="690px">
    <win-form id="#create" :model="createFund" :rules="rules" ref="create" label-width="100px" :disabled="formDisabled">
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="证券代码" prop="securityCode" class="dialogItem">
            <win-select v-model="createFund.securityCode" filterable :filter-method="getSecurityCode" placeholder="请选择" :disabled="securityCodeDisabaled" clearable>
              <win-option v-for="item in securityCodes" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                <span style="float: left">{{ item.securityCode }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.securityName }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="成日日期" prop="establishmentDate">
            <el-date-picker name="" v-model="createFund.establishmentDate" type="date" placeholder="选择日期" clearable>
            </el-date-picker>
          </win-form-item>
        </win-col>
      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="基金类型" prop="fundType">
            <win-select v-model="createFund.fundType" filterable placeholder="请选择" clearable>
              <win-option v-for="item in fundDicVO.fundTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="收费方式" prop="chargingMethod">
            <win-select v-model="createFund.chargingMethod" filterable placeholder="请选择" clearable>
              <win-option v-for="item in fundDicVO.chargingMethods" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="投资分类" prop="investmentClassification">
            <win-select v-model="createFund.investmentClassification" filterable placeholder="请选择" clearable>
              <win-option v-for="item in fundDicVO.investmentClassifications" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="申赎状态" prop="foreclosureStatus">
            <win-select v-model="createFund.foreclosureStatus" filterable placeholder="请选择" clearable>
              <win-option v-for="item in fundDicVO.foreclosureStatuss" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
      </win-row>
    </win-form>
    <div slot="footer" class="dialog-footer" v-if="operationShow">
      <win-button @click="dialogCancel">取消</win-button>
      <win-button type="primary" :loading="createLoading" @click="submitDialog">{{dialogSumbitText}}</win-button>
    </div>
  </win-fdialog>
</template>
<script lang="ts">
import FundDialogController from "../controller/FundDialogController";
export default class FundDialog extends FundDialogController {}
</script>
<style lang="css" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-button--warning {
  background-color: #ff900d;
}
.el-date-editor {
  width: 224px;
}
</style>