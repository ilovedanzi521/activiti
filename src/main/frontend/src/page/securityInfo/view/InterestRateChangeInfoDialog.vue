<template>
    <win_dialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisibleSon" :close-on-click-modal="false" :close-on-press-escape="false" width="40%">
        <win_form class="form" :rules="rules" id="#create" :model="InterestRateDetail" :disabled="allDisabled" ref="rulesForm" label-width="100px" size="small">
            <win_row>
                <win_col :span="spanWidth">
                    <win_form_item label="证券代码" prop="securityCode" class="dialogItem">
                        <win_select v-model="InterestRateDetail.securityCode" filterable :filter-method="getSecurityCode" @visible-change="visibleChangeTrigger" placeholder="请选择" :disabled="editDisabled" clearable>
                            <win_option v-for="item in securityCodes" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                                <span style="float: left">{{ item.securityCode }}</span>
                                <span>{{ "&nbsp;"+item.securityName }}</span>
                            </win_option>
                        </win_select>
                    </win_form_item>
                </win_col>
                <win_col :span="spanWidth">
                    <win_form_item label="票面利率" prop="couponRate" class="dialogItem">
                        <win_input v-model="couponRate" :num="[8,6]" :ratio="0.01" :real.sync="InterestRateDetail.couponRate" unit="%" style="width:240px;"></win_input>
                    </win_form_item>
                </win_col>
            </win_row>
            <win_row>
                <win_col :span="spanWidth">
                    <win_form_item label="开始日期" prop="beginDate" class="dialogItem">
                        <el-date-picker v-model="InterestRateDetail.beginDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </win_form_item>
                </win_col>
                <win_col :span="spanWidth">
                    <win_form_item label="结束日期" prop="endDate" class="dialogItem">
                        <el-date-picker v-model="InterestRateDetail.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </win_form_item>
                </win_col>
            </win_row>
        </win_form>
        <div slot="footer" class="dialog-footer" v-show="buttonShow">
            <win_button @click="dialogCancel">取消</win_button>
            <win_button type="primary" :loading="createLoading" @click="submitDialog('rulesForm')">{{dialogSumbitText}}</win_button>
        </div>
    </win_dialog>
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