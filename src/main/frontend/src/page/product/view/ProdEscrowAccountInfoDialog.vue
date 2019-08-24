<template>
  <win-fdialog top :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="760px">
    <win-form id="#create" :model="prodEscrowAccountInfo" :rules="rules" ref="prodEscrowAccountInfo" label-width="110px" :disabled="formDisabled">
      <win-row>
        <span>
          <font color='white'>产品信息</font>
        </span>
      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="产品代码" prop="fundCode">
            <win-select v-model="prodEscrowAccountInfo.fundCode" filterable placeholder="请选择" :disabled="fundInfoDisabled">
              <el-input v-model.number="prodEscrowAccountInfo.accountType" clearable></el-input>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="产品名称" prop="fundName">
            <el-input v-model.number="prodEscrowAccountInfo.fundName" clearable :disabled="fundInfoDisabled"></el-input>
          </win-form-item>
        </win-col>
      </win-row>
      <el-divider></el-divider>
      <win-row>
        <span>
          <font color='white'>资产单元信息</font>
        </span>
      </win-row>
      <win-row>
        <win-col :span="24">
          <win-form-item label="所属资产单元" prop="assetUnitNo">
            <win-select v-model="prodEscrowAccountInfo.assetUnitNo" filterable placeholder="请选择" clearable>
              <win-option v-for="item in unitNoList" :key="item.no" :label="item.assetUnitName" :value="item.no">
                <span style="float: left">{{ item.no }}</span>
                <span>{{ "&nbsp;"+item.assetUnitName }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
      </win-row>
      <el-divider></el-divider>
      <win-row>
        <span>
          <font color='white'>账户信息</font>
        </span>
      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="银行账号" prop="accountCode">
            <win-input v-model.number="prodEscrowAccountInfo.accountCode" :num="[20,0]" clearable maxlength="30"></win-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="账户名称" prop="accountName">
            <el-input v-model.number="prodEscrowAccountInfo.accountName" clearable maxlength="100"></el-input>
          </win-form-item>
        </win-col>
      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="开户行" prop="openBank">
            <el-input v-model.number="prodEscrowAccountInfo.openBank" clearable maxlength="100"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="银行账户类型" prop="accountType">
            <win-select v-model="prodEscrowAccountInfo.accountType" filterable placeholder="请选择" clearable>
              <win-option v-for="item in dicVOList.accountTypeDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>

      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="支付系统行号" prop="paymentSystemNumber">
            <el-input v-model.number="prodEscrowAccountInfo.paymentSystemNumber" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>

        <win-col :span="spanWidth">
          <win-form-item label="开户日期" prop="openDate">
            <el-date-picker name="" v-model="prodEscrowAccountInfo.openDate" type="date" placeholder="选择日期" clearable>
            </el-date-picker>
          </win-form-item>
        </win-col>
      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="账户币种" prop="currencyCode">
            <win-select v-model="prodEscrowAccountInfo.currencyCode" filterable placeholder="请选择" clearable>
              <win-option v-for="item in dicVOList.currencyDic" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode">
                <span style="float: left">{{ item.currencyCode }}</span>
                <span>{{ "&nbsp;"+item.currencyName }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
      </win-row>
      <win-row>
        <win-col :span="24">
          <win-form-item label="备注" prop="summary">
            <el-input style="width:800px;" :span="24" type="textarea" v-model="prodEscrowAccountInfo.summary"></el-input>
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
import ProdEscrowAccountInfoDialogController from "../controller/ProdEscrowAccountInfoDialogController";
export default class ProdEscrowAccountInfoDialog extends ProdEscrowAccountInfoDialogController {}
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