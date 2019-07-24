<template>
    <div class="BondInfo" style="width:100%;">
        <!--债券基本信息详情子组件:Begin -->
        <BondInfoDialog v-if="isDetailAble" ref="bondInfoDialog" @getFormData="formDataSubmit"></BondInfoDialog>
        <!--债券基本信息详情子组件:End -->
        <!--债券基本信息查询form表单:Begin -->
        <div class="formInline">
            <win_form v-model="bondInfoForm" :inline="true" class="form-inline">
                <win_row>
                    <win_col class="fcol">
                        <win_form_item label="证券内码">
                            <el-autocomplete v-model="bondInfoForm.securityCode" clearable placeholder="请输入内容" :fetch-suggestions="inCodeSelectFun" @select="handleCodeSelect">
                            </el-autocomplete>
                        </win_form_item>
                    </win_col>
                    <win_col class="fcol">
                        <win_form_item label="证券类别">
                            <win_select v-model="bondInfoForm.securityTypeList" filterable clearable multiple placeholder="请选择">
                                <win_option v-for="item in securitySelect.securityTypeSelect" :key="item.securityType" :label="item.securityTypeName" :value="item.securityType">
                                    <span style="float: left">{{ item.securityType }}</span>
                                    <span>{{ "&nbsp;"+item.securityTypeName }}</span>
                                </win_option>
                            </win_select>
                        </win_form_item>
                    </win_col>
                    <win_col class="fcol">
                        <win_form_item label="付息类型">
                            <win_select v-model="bondInfoForm.payInterestTypeList" clearable multiple placeholder="请选择">
                                <win_option v-for="item in bondDicData.payInterestType" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                    <span style="float: left">{{ item.dicCode }}</span>
                                    <span>{{ "&nbsp;"+item.dicExplain }}</span>
                                </win_option>
                            </win_select>
                        </win_form_item>
                    </win_col>
                    <win_col class="fcol">
                        <win_form_item label="利率类型">
                            <win_select v-model="bondInfoForm.rateTypeList" clearable multiple placeholder="请选择">
                                <win_option v-for="item in bondDicData.rateType" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                    <span style="float: left">{{ item.dicCode }}</span>
                                    <span>{{ "&nbsp;"+item.dicExplain }}</span>
                                </win_option>
                            </win_select>
                        </win_form_item>
                    </win_col>
                    <win_col class="bcol">
                        <win_button type="primary" icon="el-icon-search" @click="onFindSubmit">查询</win_button>
                        <win_button icon="el-icon-refresh" @click="reset">重置</win_button>
                    </win_col>
                </win_row>
            </win_form>
        </div>
        <div class="col-md-12" style="margin-top:5px;">
            <ul class="btn-edit fr">
                <el-button-group>
                    <win_button type="info" icon="el-icon-plus" round @click="onAddSubmit">新增</win_button>
                    <win_button type="info" icon="el-icon-delete" :disabled="multipleSelection.length == 0" round @click="onBatchDeleteSubmit">删除</win_button>
                </el-button-group>
            </ul>
        </div>
        <!--债券基本信息查询form表单:End -->
        <!--债券基本信息表格数据:Begin -->
        <div class="bondtable" style="width:100%;">
            <win_table max-height="440" highlight-current-row @select-change="handleSelectionChange" @select-all="handleSelectAll" @cell-dblclick="handleRowDBClick" :data="pageVO.list" selectionFixed indexFixed>
                <win_table_column fixed="left" sortable prop="securityCode" label="证券内码" align="left" min-width="120"></win_table_column>
                <win_table_column fixed="left" sortable prop="securityName" label="证券名称" align="left" min-width="220"></win_table_column>
                <win_table_column fixed="left" :formatter="bondDicFormatter" sortable prop="payInterestType" align="left" label="付息类型" min-width="120">
                </win_table_column>
                <win_table_column :formatter="bondDicFormatter" prop="rateType" label="利率类型" align="left" min-width="120">
                </win_table_column>
                <win_table_column :formatter="bondDicFormatter" prop="baseType" label="基准类型" align="left" min-width="120"></win_table_column>
                <win_table_column :formatter="DateFormatter" prop="valueDate" label="起息日" align="center" min-width="120">
                </win_table_column>
                <win_table_column :formatter="DateFormatter" prop="stopDate" label="止息日" align="center" min-width="120">
                </win_table_column>
                <win_table_column :formatter="DateFormatter" prop="dueDate" label="到期日" align="center" min-width="120">
                </win_table_column>
                <win_table_column prop="deadline" label="期限" align="right" min-width="80"></win_table_column>
                <win_table_column :formatter="bondDicFormatter" prop="interestStandard" label="计息基准" align="left" min-width="100">
                </win_table_column>
                <win_table_column :formatter="couponRateFormatter" prop="couponRate" label="票面利率(%)" align="right" min-width="120">
                </win_table_column>
                <win_table_column prop="issuePrice" label="发行价" align="right" min-width="100"></win_table_column>
                <win_table_column prop="yearPaymentCount" label="年付息次数" align="right" min-width="100"></win_table_column>
                <win_table_column :formatter="bondDicFormatter" prop="isRedeemable" label="是否可赎回" align="center" min-width="100">
                </win_table_column>
                <win_table_column prop="bondIssue" label="年付息次数" align="right" min-width="100"></win_table_column>
                <win_table_column :formatter="bondDicFormatter" prop="externalRating" label="外部评级" align="left" min-width="100">
                </win_table_column>
                <win_table_column :formatter="bondDicFormatter" prop="internalRating" label="内部评级" align="left" min-width="100">
                </win_table_column>
                <win_table_column prop="currentAmount" label="当前面额" align="right" min-width="100"></win_table_column>
                <win_table_column fixed="right" align="center" label="操作" min-width="160">
                    <template slot-scope="scope">
                        <win_button @click="onEditClick(scope.row)" size="small" type="text" icon="el-icon-edit-outline">修改</win_button>
                        <win_button @click="onDeleteClick(scope.row)" size="small" style="color:#FF4D4D" type="text" icon="el-icon-delete">删除</win_button>
                    </template>
                </win_table_column>
            </win_table>
            <!--债券基本信息表格分页:Begin -->
            <win_pagination v-bind:childMsg="pageVO" @callFather="pageFindSubmit"></win_pagination>
            <!--债券基本信息表格分页:End -->
        </div>
        <!--债券基本信息表格数据:End -->
    </div>
</template>
<script lang="ts">
import BondInfoController from "../controller/BondInfoController";
import Component from "vue-class-component";

@Component
export default class BondInfo extends BondInfoController {}
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item__label {
    width: 96px !important;
}
.el-form--inline .el-form-item {
    margin-right: 2px;
}
.el-row {
    margin-top: 10px;
    margin-bottom: 10px;
}
.formInline {
    margin-left: -30px;
    margin-top: 20px;
}
.fcol {
    width: 21%;
}
.bcol {
    margin-top: 5px;
    width: 15%;
}
</style>