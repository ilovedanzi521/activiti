<template>
  <win_dialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="690px">
    <win_form id="#create" :model="createFund" :rules="rules" ref="create" label-width="100px" :disabled="formDisabled">
      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="证券代码" prop="securityCode" class="dialogItem">
            <win_select v-model="createFund.securityCode" filterable :filter-method="getSecurityCode" placeholder="请选择" :disabled="securityCodeDisabaled" clearable>
              <win_option v-for="item in securityCodes" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                <span style="float: left">{{ item.securityCode }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.securityName }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="成日日期" prop="establishmentDate">
            <el-date-picker name="" v-model="createFund.establishmentDate" type="date" placeholder="选择日期" clearable>
            </el-date-picker>
          </win_form_item>
        </win_col>
      </win_row>
      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="基金类型" prop="fundType">
            <win_select v-model="createFund.fundType" filterable placeholder="请选择" clearable>
              <win_option v-for="item in fundDicVO.fundTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="收费方式" prop="chargingMethod">
            <win_select v-model="createFund.chargingMethod" filterable placeholder="请选择" clearable>
              <win_option v-for="item in fundDicVO.chargingMethods" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
      </win_row>
      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="投资分类" prop="investmentClassification">
            <win_select v-model="createFund.investmentClassification" filterable placeholder="请选择" clearable>
              <win_option v-for="item in fundDicVO.investmentClassifications" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="申赎状态" prop="foreclosureStatus">
            <win_select v-model="createFund.foreclosureStatus" filterable placeholder="请选择" clearable>
              <win_option v-for="item in fundDicVO.foreclosureStatuss" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
      </win_row>
    </win_form>
    <div slot="footer" class="dialog-footer" v-if="operationShow">
      <win_button @click="dialogCancel">取消</win_button>
      <win_button type="primary" :loading="createLoading" @click="submitDialog">{{dialogSumbitText}}</win_button>
    </div>
  </win_dialog>
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