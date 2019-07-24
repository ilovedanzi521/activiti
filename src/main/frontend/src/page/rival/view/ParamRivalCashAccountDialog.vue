<template>
  <win_dialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="780px">
    <win_form id="#create" :model="paramRivalCashAccountRepVO" ref="paramRivalCashAccount" label-width="130px">
      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="对手方序号" prop="rivalNo">
            <el-input v-model.number="paramRivalCashAccountRepVO.rivalNo" :disabled="rivalDisabled" clearable></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="对手方名称" prop="rivalName">
            <el-input v-model="paramRivalCashAccountRepVO.rivalName" :disabled="rivalDisabled" clearable></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="资金账号" prop="bankAccount">
            <el-input v-model="paramRivalCashAccountRepVO.bankAccount" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="资金账户名称" prop="bankAccountName">
            <el-input v-model="paramRivalCashAccountRepVO.bankAccountName" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="资金开户行" prop="bankName">
            <el-input v-model="paramRivalCashAccountRepVO.bankName" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="资金支付系统行号" prop="bankPayNo">
            <el-input v-model="paramRivalCashAccountRepVO.bankPayNo" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="停用标志" prop="stop">
            <el-input v-model="paramRivalCashAccountRepVO.stop" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>

      </win_row>
    </win_form>

    <div slot="footer" class="dialog-footer" v-if="operationShow">
      <win_button @click="dialogCancel">取消</win_button>
      <win_button type="primary" :loading="createLoading" @click="submitDialog">{{ dialogSumbitText }}</win_button>
    </div>
  </win_dialog>
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