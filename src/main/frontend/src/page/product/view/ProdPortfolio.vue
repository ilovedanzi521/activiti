<template>
    <div>
        <div class="col-md-12" style="margin-top:5px;">
            <ul class="btn-edit fr">
                <li>
                    <win_button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win_button>
                </li>
            </ul>
        </div>
        <div>
            <win_table :data="prodPortfolio.list" :showSelection="false" @select-all="handleSelectAll" @select-change="handleSelectChange" indexFixed max-height="159px" highlight-current-row v-loading="loading" @cell-dblclick="view"
                element-loading-text="拼命加载中...">
                <win_table_column prop="assetUnitName" label="所属资产单元" header-align="center" align="left" sortable fixed="left" min-width="170"></win_table_column>
                <win_table_column prop="no" label="组合编号" header-align="center" align="left" sortable fixed="left" min-width="100"></win_table_column>
                <win_table_column prop="portfolioName" label="组合名称" header-align="center" align="left" sortable fixed="left" min-width="170"></win_table_column>
                <win_table_column prop="status" label="组合状态" header-align="center" align="center" sortable min-width="100" :formatter="formatDic"></win_table_column>
                <win_table_column prop="cashAccountNumber" label="资金账号" header-align="center" align="left" sortable min-width="200"></win_table_column>
                <win_table_column prop="portfolioType" label="组合类型" header-align="center" align="center" sortable min-width="100" :formatter="formatDic"></win_table_column>
                <win_table_column prop="permitMarketCodes" label="交易市场权限个数" header-align="center" align="left" :formatter="formatCount" sortable min-width="160"></win_table_column>
                <win_table_column prop="permitSecurityTypes" label="证券类别权限个数" header-align="center" align="left" sortable min-width="160" :formatter="formatCount"></win_table_column>
                <win_table_column prop="permitTransactionDirections" label="交易方向权限个数" header-align="center" align="left" sortable min-width="160" :formatter="formatCount"></win_table_column>
                <win_table_column prop="operator" label="操作人" header-align="center" align="center" :formatter="formatDic" sortable min-width="100"></win_table_column>
                <win_table_column prop="operationTime" label="操作时间" header-align="center" align="center" :formatter="formatDic" min-width="180" sortable></win_table_column>
                <win_table_column label="操作" min-width="160" fixed="right" header-align="center" align="center">
                    <template slot-scope="scope">
                        <win_button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win_button>
                        <win_button type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D" @click="operation(scope.row,'DELETE')">删除</win_button>
                    </template>
                </win_table_column>
            </win_table>
        </div>
        <!--分页组件-->
        <win_pagination v-bind:childMsg="prodPortfolio" @callFather="pageQuery"></win_pagination>
        <!-- 创建/修改/删除 begin-->
        <ProdPortfolioDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible"></ProdPortfolioDialog>
        <!-- 创建/修改/删除 end-->
    </div>
</template>
<script lang="ts">
import Component from "vue-class-component";
import ProdPortfolioController from "../controller/ProdPortfolioController";

export default class ProdPortfolio extends ProdPortfolioController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
</style>
<style lang="css" scoped>
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
.el-pagination {
    padding-right: 10px;
    text-align: right;
    box-sizing: border-box;
}
</style>