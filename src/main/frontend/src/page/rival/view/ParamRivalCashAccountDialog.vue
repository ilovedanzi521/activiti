<template>
  <win-fdialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="780px">
    <win-form id="#create" :model="paramRivalCashAccountRepVO" ref="ParamRivalCashAccount" label-width="130px">
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="对手方序号" prop="rivalNo">
            <el-input v-model.number="paramRivalCashAccountRepVO.rivalNo" :disabled="rivalDisabled" clearable></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="对手方名称" prop="rivalName">
            <el-input v-model="paramRivalCashAccountRepVO.rivalName" :disabled="rivalDisabled" clearable></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="资金账号" prop="bankAccount">
            <el-input v-model="paramRivalCashAccountRepVO.bankAccount" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="资金账户名称" prop="bankAccountName">
            <el-input v-model="paramRivalCashAccountRepVO.bankAccountName" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="资金开户行" prop="bankName">
            <el-input v-model="paramRivalCashAccountRepVO.bankName" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="资金支付系统行号" prop="bankPayNo">
            <el-input v-model="paramRivalCashAccountRepVO.bankPayNo" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="停用标志" prop="stop">
            <win-select v-model="paramRivalCashAccountRepVO.stop" placeholder="请选择" clearable>
              <win-option v-for="item in rivalCashAccountDicDataVO.stopTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>

      </win-row>
    </win-form>

    <div slot="footer" class="dialog-footer" v-if="operationShow">
      <win-button @click="dialogCancel">取消</win-button>
      <win-button type="primary" :loading="createLoading" @click="submitDialog">{{ dialogSumbitText }}</win-button>
    </div>
  </win-fdialog>
</template>
<script lang="ts">
import ParamRivalCashAccountDialogController from "../controller/ParamRivalCashAccountDialogController";
export default class ParamRivalCashAccountDialog extends ParamRivalCashAccountDialogController {}
</script>
<style lang="css" scoped>
.el-button--warning {
  background-color: #ff900d;
}
.el-date-editor {
  width: 224px;
}
span font {
  text-align: left;
  margin: -30px 0 0px;
  font-size: 16px;
}
</style>