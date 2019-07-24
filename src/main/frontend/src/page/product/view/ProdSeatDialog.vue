<template>
  <win_dialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="42%">
    <win_form id="#create" :model="createSeat" ref="create" :rules="rules" label-width="120px" size="small" :inline="true" :disabled="formDisabled">
      <p style="text-align: left; margin: -30px 0 0px">产品信息</p>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="产品代码" prop="fundCode" class="dialogItem" required="true">
            <win_input v-model="createSeat.fundCode" :disabled="statusDisabaled"></win_input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="产品名称" prop="fundName" class="dialogItem" required="true">
            <win_input v-model="createSeat.fundName" :disabled="statusDisabaled"></win_input>
          </win_form_item>
        </win_col>
      </win_row>

      <el-divider></el-divider>
      <p style="text-align: left; margin: -30px 0 0px; margin-top:1px;">账户信息</p>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="席位代码" prop="code" class="dialogItem" required="true">
            <el-autocomplete v-model="createSeat.code" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" @input="seatCodeChange" :disabled="seatCodeDisabaled" clearable></el-autocomplete>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="席位名称" prop="name" class="dialogItem" required="true">
            <win_input v-model="createSeat.name" :disabled="updateStatusDisabaled"></win_input>
          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="交易市场" prop="marketNo" class="dialogItem" required="true">
            <win_select v-model="createSeat.marketNo" filterable placeholder="请选择" clearable :disabled="updateStatusDisabaled" @change="selectMarketEvent">
              <win_option v-for="item in seatDicVO.marketTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span style=" color: #8492a6; font-size: 13px">{{"&nbsp;" +item.dicExplain }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="所属券商序号" prop="brokerCode" class="dialogItem" required="true">
            <!-- <win_input v-model="createSeat.brokerCode" :disabled="updateStatusDisabaled"></win_input> -->
            <el-autocomplete v-model="createSeat.brokerCode" :fetch-suggestions="brokerList" @select="handleBrokerSelect" :maxlength=200 placeholder="请输入内容" clearable :disabled="selectDisabled"></el-autocomplete>

          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="主席位" prop="mainCode" class="dialogItem">
            <!-- <win_input v-model="createSeat.mainCode"></win_input> -->
            <win_select v-model="createSeat.mainCode" :disabled="seatDisabaled" filterable placeholder="请选择" clearable>
              <win_option v-for="item in prodSeatRepVOs" :key="item.code" :label="item.name" :value="item.code">
                <span style="float: left">{{ item.code }}</span>
                <span>{{ "&nbsp;"+item.name }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="交易所识别码" prop="marketRemark" class="dialogItem">
            <win_input v-model="createSeat.marketRemark" :disabled="selectDisabled"></win_input>
          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="参与人结算账户" prop="participantAccount" class="dialogItem">
            <win_input v-model="createSeat.participantAccount" :disabled="selectDisabled"></win_input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="联系人" prop="linkman" class="dialogItem">
            <win_input v-model="createSeat.linkman" :disabled="selectDisabled"></win_input>
          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="联系方式" prop="linkType" class="dialogItem">
            <win_input v-model="createSeat.linkType" :disabled="selectDisabled"></win_input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="最小合同起始号" prop="minContractNo" class="dialogItem">
            <win_input v-model="createSeat.minContractNo" :disabled="selectDisabled"></win_input>
          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="最大合同号" prop="maxContractNo" class="dialogItem">
            <win_input v-model="createSeat.maxContractNo" :disabled="selectDisabled"></win_input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="当前合同号" prop="contractNo" class="dialogItem">
            <win_input v-model="createSeat.contractNo" :disabled="selectDisabled"></win_input>
          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="当天是否交易" prop="trade" class="dialogItem" required="true">
            <win_select v-model="createSeat.trade" filterable placeholder="请选择" clearable>
              <win_option v-for="item in seatDicVO.tradeTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
      </win_row>

      <win_row>
        <win_col :span="24">
          <win_form_item label="备注" prop="summary" class="dialogItem">
            <win_input v-model="createSeat.summary" type="textarea" :rows="3" maxlength=255 :disabled="selectDisabled"></win_input>
          </win_form_item>
        </win_col>
      </win_row>

    </win_form>
    <div slot="footer" class="dialog-footer" v-show="buttonShow">
      <win_button @click="dialogCancel">取消</win_button>
      <win_button type="primary" :loading="createLoading" @click="submitDialog">{{dialogSumbitText}}</win_button>
    </div>
  </win_dialog>
</template>
<script lang="ts">
import ProdSeatDialogController from "../controller/ProdSeatDialogController";
export default class ProdSeatDialog extends ProdSeatDialogController {}
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
.dialogItem /deep/.el-textarea.el-input--small .el-textarea__inner {
  width: 603px;
}
</style>