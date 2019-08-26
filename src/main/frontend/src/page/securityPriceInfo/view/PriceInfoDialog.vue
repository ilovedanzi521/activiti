<template>
  <win-fdialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="65%">
    <win-form id="#create" :model="createPriceInfo" :rules="rules" ref="create" label-width="130px" size="small" :inline="true" :disabled="formDisabled">

      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="证券代码" prop="securityCode" class="dialogItem">

            <win-select v-model="createPriceInfo.securityCode" filterable clearable :filter-method="outCodeSelectFun" @change="selectCodeTrigger(createPriceInfo.securityCode)" @visible-change="visibleChangeTrigger"
              :disabled="securityCodeDisabaled" placeholder="请选择">
              <win-option v-for="item in securityCodeSelect" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                <span style="float: left">{{ item.securityCode }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.securityName }}</span></win-option>
            </win-select>
          </win-form-item>
        </win-col>

        <win-col :span="spanWidth">
          <win-form-item label="行情日" prop="infoDate" class="dialogItem">
            <win-date-picker v-model="createPriceInfo.infoDate" type="date" placeholder="选择日期"></win-date-picker>
          </win-form-item>
        </win-col>

        <win-col :span="spanWidth">
          <win-form-item label="停牌标志" prop="delistStatus" class="dialogItem">
            <win-select v-model="createPriceInfo.delistStatus" filterable placeholder="请选择" clearable>
              <win-option v-for="item in delistStatusTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
      </win-row>

      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="最新价" prop="newPrice" class="dialogItem">
            <win-input v-model="createPriceInfo.newPrice" clearable></win-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="昨收盘" prop="yesterdayClosePrice" class="dialogItem">
            <win-input v-model="createPriceInfo.yesterdayClosePrice" clearable></win-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="今开盘" prop="todayOpenPrice" class="dialogItem">
            <win-input v-model="createPriceInfo.todayOpenPrice" clearable></win-input>
          </win-form-item>
        </win-col>
      </win-row>

      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="最低价" prop="lowPrice" class="dialogItem">
            <win-input v-model="createPriceInfo.lowPrice" clearable></win-input>
          </win-form-item>
        </win-col>

        <win-col :span="spanWidth">
          <win-form-item label="最高价" prop="highPrice" class="dialogItem">
            <win-input v-model="createPriceInfo.highPrice" clearable></win-input>
          </win-form-item>
        </win-col>

        <win-col :span="spanWidth">
          <win-form-item label="平均价" prop="averagePrice" class="dialogItem">
            <win-input v-model="createPriceInfo.averagePrice" clearable></win-input>
          </win-form-item>
        </win-col>
      </win-row>

      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="涨停价" prop="limitUpPrice" class="dialogItem">
            <win-input v-model="createPriceInfo.limitUpPrice" clearable></win-input>
          </win-form-item>
        </win-col>

        <win-col :span="spanWidth">
          <win-form-item label="跌停价" prop="limitDownPrice" class="dialogItem">
            <win-input v-model="createPriceInfo.limitDownPrice" clearable></win-input>
          </win-form-item>
        </win-col>

        <win-col :span="spanWidth">
          <win-form-item label="成交量" prop="tradeCount" class="dialogItem">
            <win-input v-model="createPriceInfo.tradeCount" style="width:210px;" clearable></win-input>万
          </win-form-item>
        </win-col>
      </win-row>

      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="成交额" prop="tradePrice" class="dialogItem">
            <win-input v-model="createPriceInfo.tradePrice" style="width:195px;" clearable></win-input>万元
          </win-form-item>
        </win-col>
      </win-row>
      <!-- <el-divider></el-divider> -->
      <div class="zq" v-if="showDIV">
        <win-row>
          <win-col :span="spanWidth">
            <win-form-item label="全价昨收盘" prop="fullPriceClosedYesterday" class="dialogItem">
              <win-input v-model="createPriceInfo.fullPriceClosedYesterday" clearable></win-input>
            </win-form-item>
          </win-col>

          <win-col :span="spanWidth">
            <win-form-item label="应计利息" prop="accruedInterest" class="dialogItem">
              <win-input v-model="createPriceInfo.accruedInterest" clearable></win-input>
            </win-form-item>
          </win-col>

          <win-col :span="spanWidth">
            <win-form-item label="中债估值净价" prop="chinaBondPrice" class="dialogItem">
              <win-input v-model="createPriceInfo.chinaBondPrice" clearable></win-input>
            </win-form-item>
          </win-col>
        </win-row>

        <win-row>
          <win-col :span="spanWidth">
            <win-form-item label="中债估价修正久期" prop="chinaBondAmendDate" class="dialogItem">
              <win-input v-model="createPriceInfo.chinaBondAmendDate" clearable></win-input>
            </win-form-item>
          </win-col>

          <win-col :span="spanWidth">
            <win-form-item label="中债估价收益率" prop="chinaBondYield" class="dialogItem">
              <win-input v-model="chinaBondYield" :num="[5,3]" :ratio="0.01" :real.sync="createPriceInfo.chinaBondYield" :negative="false" unit="%" style="width:242px;"></win-input>

            </win-form-item>
          </win-col>

          <win-col :span="spanWidth">
            <win-form-item label="中债估价凸性" prop="chinaBondConvexity" class="dialogItem">
              <win-input v-model="createPriceInfo.chinaBondConvexity" clearable></win-input>
            </win-form-item>
          </win-col>
        </win-row>

        <win-row>
          <win-col :span="spanWidth">
            <win-form-item label="中证估价净价" prop="chinaSecurityPrice" class="dialogItem">
              <win-input v-model="createPriceInfo.chinaSecurityPrice" clearable></win-input>
            </win-form-item>
          </win-col>

          <win-col :span="spanWidth">
            <win-form-item label="中证估价收益率" prop="chinaSecurityYield" class="dialogItem">
              <win-input v-model="chinaSecurityYield" :num="[5,3]" :ratio="0.01" :real.sync="createPriceInfo.chinaSecurityYield" :negative="false" unit="%" style="width:242px;"></win-input>

            </win-form-item>
          </win-col>

          <win-col :span="spanWidth">
            <win-form-item label="中证估价凸性" prop="chinaSecurityConvexity" class="dialogItem">
              <win-input v-model="createPriceInfo.chinaSecurityConvexity" clearable></win-input>
            </win-form-item>
          </win-col>
        </win-row>

        <win-row>
          <win-col :span="spanWidth">
            <win-form-item label="中证估价修正久期" prop="chinaSecurityAmendDate" class="dialogItem">
              <win-input v-model="createPriceInfo.chinaSecurityAmendDate" clearable></win-input>
            </win-form-item>
          </win-col>
        </win-row>
      </div>
    </win-form>

    <div slot="footer" class="dialog-footer" v-show="buttonShow">
      <win-button @click="dialogCancel">取消</win-button>
      <win-button type="primary" :loading="createLoading" @click="submitDialog">{{dialogSumbitText}}</win-button>
    </div>
  </win-fdialog>
</template>
<script lang="ts">
import PriceInfoDialogController from "../controller/PriceInfoDialogController";
export default class priceInfoDialog extends PriceInfoDialogController {
  formLabelWidth: "30px";
}
</script>
<style lang="scss" scoped>
.form_content /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 224px;
}
.BondInfoDialog /deep/ .el-dialog--center .el-dialog__body {
  padding: 30px 20px;
  color: #fff;
  font-size: 14px;
  word-break: break-all;
  text-align: center;
  width: 1160px;
  height: 600px;
  box-sizing: border-box;
  overflow: auto;
}
.el-divider {
  margin: 0px 0px 20px 0px;
}
</style>