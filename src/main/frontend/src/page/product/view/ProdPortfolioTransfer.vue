<template>
    <win-fdialog class="transfer" :title="dialogTitle" :before-close="closeDia" :visible.sync="transferVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="33%" append-to-body>
        <win-form :disabled="allDisabled">
            <p style="text-align: center; margin: 0 0 0px"></p>
            <div style="text-align: center">
                <el-transfer style="text-align: left; display: inline-block" v-model="checkedItem" filterable :titles="['未授权', '已授权']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" @change="handleChange" :data="dataDic">
                    <span slot-scope="{ option }">{{ option.key }} {{ option.label }}</span>
                </el-transfer>
            </div>
        </win-form>
        <div slot="footer" class="dialog-footer" v-show="buttonShow">
            <win-button @click="dialogCancel">取消</win-button>
            <win-button type="primary" :loading="createLoading" @click="dialogConfirm">确定</win-button>
        </div>
    </win-fdialog>
</template>

<script lang="ts">
import ProdPortfolioTransferController from "../controller/ProdPortfolioTransferController";
import Component from "vue-class-component";

@Component
export default class ProdPortfolioTransfer extends ProdPortfolioTransferController {}
</script>

<style lang="scss" scoped>
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}
.transfer /deep/ .el-checkbox__label {
    font-size: 12px !important;
}
.transfer /deep/ .el-input__inner {
    width: 170px !important;
}
.transfer /deep/ .el-input {
    width: 170px !important;
}
.el-button--warning {
    background-color: #ff900d;
}
</style>