<template>
    <win-fdialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisibleSon" :close-on-click-modal="false" :close-on-press-escape="false" width="40%">
        <win-form class="form" :rules="rules" id="#create" :model="InterestRateDetail" :disabled="allDisabled" ref="rulesForm" label-width="100px" size="small">
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="证券代码" prop="securityCode" class="dialogItem">
                        <win-select v-model="InterestRateDetail.securityCode" filterable :filter-method="getSecurityCode" @visible-change="visibleChangeTrigger" placeholder="请选择" :disabled="editDisabled" clearable>
                            <win-option v-for="item in securityCodes" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                                <span style="float: left">{{ item.securityCode }}</span>
                                <span>{{ "&nbsp;"+item.securityName }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="票面利率" prop="couponRate" class="dialogItem">
                        <win-input v-model="couponRate" :num="[8,6]" :ratio="0.01" :real.sync="InterestRateDetail.couponRate" unit="%" style="width:240px;"></win-input>
                    </win-form-item>
                </win-col>
            </win-row>
            <win-row>
                <win-col :span="spanWidth">
                    <win-form-item label="开始日期" prop="beginDate" class="dialogItem">
                        <el-date-picker v-model="InterestRateDetail.beginDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </win-form-item>
                </win-col>
                <win-col :span="spanWidth">
                    <win-form-item label="结束日期" prop="endDate" class="dialogItem">
                        <el-date-picker v-model="InterestRateDetail.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </win-form-item>
                </win-col>
            </win-row>
        </win-form>
        <div slot="footer" class="dialog-footer" v-show="buttonShow">
            <win-button @click="dialogCancel">取消</win-button>
            <win-button type="primary" :loading="createLoading" @click="submitDialog('rulesForm')">{{dialogSumbitText}}</win-button>
        </div>
    </win-fdialog>
</template>
<script lang="ts">
import InterestRateChangeInfoDialogController from "../controller/InterestRateChangeInfoDialogController";
import Component from "vue-class-component";

@Component
export default class InterestRateChangeInfoDialog extends InterestRateChangeInfoDialogController {}
</script>

<style lang="scss" scoped>
.dialogItem /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 224px;
}
.form /deep/ .el-form-item__content {
    text-align: left;
}
</style>