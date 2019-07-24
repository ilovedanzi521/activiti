<template>
  <win_dialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="780px">
    <win_form id="#create" :model="prodSettlementAccountRepVO" :rules="rules" ref="prodSettlementAccountRepVO" label-width="110px" :disabled="formDisabled">
      <win_row>
        <span>
          <font color='white'>产品信息</font>
        </span>
      </win_row>
      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="产品代码" prop="fundCode">
            <el-input v-model.number="prodSettlementAccountRepVO.fundCode" clearable :disabled="fundInfoDisabled"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="产品名称" prop="fundName">
            <el-input v-model.number="prodSettlementAccountRepVO.fundName" clearable :disabled="fundInfoDisabled"></el-input>
          </win_form_item>
        </win_col>
      </win_row>
      <el-divider></el-divider>
      <win_row>
        <span>
          <font color='white'>账户信息</font>
        </span>
      </win_row>
      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="资金账号" prop="capitalAccountCode">
            <el-input v-model="prodSettlementAccountRepVO.capitalAccountCode" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="资金账户户名" prop="capitalAccountName">
            <el-input v-model="prodSettlementAccountRepVO.capitalAccountName" clearable maxlength="100"></el-input>
          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="资金开户行" prop="capitalOpenBank" class="dialogItem">
            <el-input v-model="prodSettlementAccountRepVO.capitalOpenBank" clearable maxlength="100"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="托管账号" prop="escrowAccountCode">
            <el-input v-model.number="prodSettlementAccountRepVO.escrowAccountCode" clearable maxlength="100"></el-input>
          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="托管账户户名" prop="escrowAccountName">
            <el-input v-model.number="prodSettlementAccountRepVO.escrowAccountName" clearable maxlength="100"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="托管机构" prop="escrowAgency">
            <win_select v-model="prodSettlementAccountRepVO.escrowAgency" placeholder="请选择" clearable>
              <win_option v-for="item in escrowAgencyDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
      </win_row>
      <win_row>
        <win_col :span="24">
          <win_form_item label="备注" prop="summary">
            <el-input :span="24" type="textarea" v-model="prodSettlementAccountRepVO.summary"></el-input>
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
import ProdSettlementAccountDialogController from "../controller/ProdSettlementAccountDialogController";
export default class ProdSettlementAccountDialog extends ProdSettlementAccountDialogController {}
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