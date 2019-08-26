<template>
    <div>
        <div class="formInline">
            <win-form :inline="true" :model="formInline" class="demo-form-inline">
                <win-row>
                    <win-col class="fcol">
                        <win-form-item label="证券代码">
                            <el-autocomplete v-model="formInline.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                        </win-form-item>
                    </win-col>
                    <win-col class="fcol">
                        <win-form-item label="交易市场">
                            <win-select v-model="formInline.marketType" clearable multiple placeholder="请选择">
                                <win-option v-for="item in paramRateChangeEntity.marketType" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                    <span style="float: left">{{ item.dicCode }}</span>
                                    <span>{{ "&nbsp;"+item.dicExplain }}</span>
                                </win-option>
                            </win-select>
                        </win-form-item>
                    </win-col>

                    <win-col class="bcol">
                        <win-form-item>
                            <win-button style=" background: #ff900d; width: 90px;" type="primary" icon="el-icon-search" @click="list">查询</win-button>
                            <win-button @click="reset" style="width: 90px;" icon="el-icon-refresh">重置</win-button>
                        </win-form-item>
                    </win-col>
                </win-row>
            </win-form>
        </div>
        <div class="col-md-12">
            <ul class="btn-edit fr">
                <li>
                    <el-button-group>
                        <win-button type="info" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win-button>
                        <win-button v-popover:popover1 type="info" icon="el-icon-delete" round :disabled="selected.length == 0" @click="delBatch">删除</win-button>
                    </el-button-group>
                </li>
            </ul>
        </div>
        <div>
            <win-table :data="interestRateChangeInfo.list" @select-all="handleSelectAll" @select-change="handleSelectChange" max-height="440px" v-loading="loading" @cell-dblclick="view" element-loading-text="拼命加载中...">
                <win-table-column prop="securityCode" label="证券代码" header-align="center" align="left" sortable min-width="150"></win-table-column>
                <win-table-column prop="securityName" label="证券名称" header-align="center" align="left" sortable min-width="200"></win-table-column>
                <win-table-column :formatter="marketTypeFormatter" prop="marketType" label="交易市场" header-align="center" align="left" sortable min-width="100"></win-table-column>
                <win-table-column prop="beginDate" label="开始日期" header-align="center" align="center" sortable :formatter="DateFormatter" min-width="120"></win-table-column>
                <win-table-column prop="endDate" label="结束日期" header-align="center" align="center" sortable :formatter="DateFormatter" min-width="120"></win-table-column>
                <win-table-column prop="couponRate" label="票面利率(%)" :formatter="couponRateFormatter" header-align="center" align="right" min-width="200" sortable></win-table-column>
                <win-table-column label="操作" min-width="194" header-align="center" align="center">
                    <template slot-scope="scope">
                        <win-button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win-button>
                        <win-button type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D" @click="operation(scope.row,'DELETE')">删除</win-button>
                    </template>
                </win-table-column>
            </win-table>
        </div>
        <!--分页组件-->
        <win-pagination v-bind:childMsg="interestRateChangeInfo" @callFather="pageQuery"></win-pagination>
        <!-- 创建/修改/删除 begin-->
        <InterestRateChangeInfoDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible"></InterestRateChangeInfoDialog>
        <!-- 创建/修改/删除 end-->
    </div>
</template>
<script lang="ts">
import InterestRateChangeInfoController from "../controller/InterestRateChangeInfoController";
import Component from "vue-class-component";

export default class InterestRateChangeInfo extends InterestRateChangeInfoController {}
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
    width: 15%;
}
.el-pagination {
    padding-right: 10px;
    text-align: right;
    box-sizing: border-box;
}
</style>