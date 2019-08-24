<template>
  <win-fdialog top :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="1100px">
    <win-form id="#create" :model="prodCapitalAccountInfo" :rules="rules" ref="prodCapitalAccountInfo" label-width="110px" :disabled="formDisabled">
      <win-row>
        <span>
          <font color='white'>产品信息</font>
        </span>
      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="产品代码" prop="fundCode">
            <win-select v-model="prodCapitalAccountInfo.fundCode" filterable placeholder="请选择" :disabled="fundInfoDisabled">
              <el-input v-model.number="prodCapitalAccountInfo.accountType" clearable></el-input>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="产品名称" prop="fundName">
            <el-input v-model.number="prodCapitalAccountInfo.fundName" clearable :disabled="fundInfoDisabled"></el-input>
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
            <win-select v-model="prodCapitalAccountInfo.assetUnitNo" filterable placeholder="请选择" clearable>
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
          <win-form-item label="资金账户类型" prop="accountType">
            <win-select v-model="prodCapitalAccountInfo.accountType" filterable placeholder="请选择" clearable :disabled="editDisabled">
              <win-option v-for="item in dicVOList.accountType" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="资金账号" prop="accountCode">
            <el-autocomplete v-model="prodCapitalAccountInfo.accountCode" :fetch-suggestions="capitalAccountList" @input="handleCapitalAccountChange" @select="handleCapitalAccountSelect" :maxlength=200 placeholder="请输入内容" clearable
              :disabled="editDisabled"></el-autocomplete>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="资金账户名称" prop="accountName">
            <el-input v-model="prodCapitalAccountInfo.accountName" clearable maxlength="100" :disabled="editDisabled"></el-input>
          </win-form-item>
        </win-col>
      </win-row>

      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="客户号" prop="customerCode" class="dialogItem">
            <el-input v-model.number="prodCapitalAccountInfo.customerCode" clearable maxlength="100"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="资金密码" prop="capitalPassword">
            <el-input v-model.number="prodCapitalAccountInfo.capitalPassword" type="password" clearable maxlength="100"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="交易密码" prop="tradePassword">
            <el-input v-model.number="prodCapitalAccountInfo.tradePassword" type="password" clearable maxlength="100"></el-input>
          </win-form-item>
        </win-col>
      </win-row>

      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="委托方式" prop="entrustWay">
            <el-input v-model.number="prodCapitalAccountInfo.entrustWay" clearable maxlength="100"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="券商名称" prop="brokerName">
            <el-autocomplete v-model="prodCapitalAccountInfo.brokerName" :fetch-suggestions="brokerList" @select="handleBrokerSelect" :maxlength=200 placeholder="请输入内容" clearable :disabled="editDisabled"></el-autocomplete>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="营业部号" prop="departmentCode">
            <el-autocomplete v-model="prodCapitalAccountInfo.departmentCode" :fetch-suggestions="departmentList" @select="handleDepartmentSelect" :maxlength=200 placeholder="请输入内容" clearable :disabled="editDisabled"></el-autocomplete>
          </win-form-item>
        </win-col>
      </win-row>
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="账户币种" prop="currencyCode">
            <win-select v-model="prodCapitalAccountInfo.currencyCode" filterable placeholder="请选择" clearable>
              <win-option v-for="item in dicVOList.currencyDic" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode">
                <span style="float: left">{{ item.currencyCode }}</span>
                <span>{{ "&nbsp;"+item.currencyName }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="资金账户状态" prop="accountStatus">
            <win-select v-model="prodCapitalAccountInfo.accountStatus" filterable placeholder="请选择" clearable>
              <win-option v-for="item in dicVOList.accountStatus" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
      </win-row>
      <win-row>
        <win-col :span="24">
          <win-form-item label="备注" prop="summary">
            <el-input style="width:800px;" :span="24" type="textarea" v-model="prodCapitalAccountInfo.summary"></el-input>
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
import ProdCapitalAccountDialogController from "../controller/ProdCapitalAccountDialogController";
export default class ProdCapitalAccountDialog extends ProdCapitalAccountDialogController {}
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