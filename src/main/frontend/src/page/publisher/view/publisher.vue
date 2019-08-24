<template>
    <div class="container">
        <!--表单查询-->
        <win-form :inline="true">
            <div class="form_content">
                <win-button round @click="openAddDialog('publisherForm')" icon="el-icon-plus" class="iconAddbutton">新增</win-button>
                <win-form-item label="发行人编号">
                    <el-input suffix-icon="xxxx" v-model="form.publisherCode"></el-input>
                </win-form-item>
                <win-form-item label="发行人名称">
                    <el-input suffix-icon="xxxx" v-model="form.publisherName"></el-input>
                </win-form-item>
                <win-form-item label="企业性质">
                    <win-select v-model="form.enterpriseNatures" multiple placeholder="请选择">
                        <win-option v-for="item in compareData.enterpriseNatureSelect" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win-option>
                    </win-select>
                </win-form-item>
                <win-form-item>
                    <win-button @click="query()" type="primary">查询</win-button>
                    <win-button @click="reset()" type="default">重置</win-button>
                </win-form-item>
            </div>
        </win-form>
        <!--表格数据-->
        <win-table :data="pageVO.list" :showSelection="false" :showIndex="false">
            <win-table-column width="150" prop="publisherCode" label="发行人编号" sortable></win-table-column>
            <win-table-column width="150" prop="publisherName" label="发行人名称" sortable></win-table-column>
            <win-table-column width="150" prop="legalPerson" sortable label="法人代表"></win-table-column>
            <win-table-column width="150" prop="companyCategory" :formatter="companyCategoryFormatter" sortable label="公司类别"></win-table-column>
            <win-table-column width="150" prop="enterpriseNature" :formatter="enterpriseNatureFormatter" sortable label="企业性质" :show-overflow-tooltip="true"></win-table-column>
            <win-table-column width="150" prop="assetsCurrencyCode" sortable label="资产币种"></win-table-column>
            <win-table-column width="150" prop="registerCapital" :formatter="moneyFormatter" sortable label="注册资本"></win-table-column>
            <win-table-column width="150" prop="externalRating" :formatter="exFormatter" sortable label="外部评级"></win-table-column>
            <win-table-column width="150" prop="internalRating" :formatter="inFormatter" sortable label="内部评级"></win-table-column>
            <win-table-column width="150" prop="registerAddress" sortable label="注册地址"></win-table-column>
            <win-table-column width="150" prop="remark" sortable label="备注"></win-table-column>
            <win-table-column width="150" label="操作">
                <template slot-scope="scope">
                    <div class="operate">
                        <span @click="openUpdateDialog(scope.row)">
                            <i class="icon1 el-icon-edit"></i>修改
                        </span>
                        <span @click="openDeleteDialog(scope.row)">
                            <i class="icon2 el-icon-delete"></i>删除
                        </span>
                    </div>
                </template>
            </win-table-column>
        </win-table>
        <!--分页组件-->
        <win-pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></win-pagination>
        <!--编辑、新增-->
        <PublisherDialog :dialogVO="dialogVO" :publisherVO="publisherVO" :compareData="compareData" @query="query"></PublisherDialog>
    </div>
</template>
<script lang="ts">
import PublisherController from "../controller/PublisherController";
import Component from "vue-class-component";
export default class PublisherView extends PublisherController {}
</script>
<style lang="scss" scoped>
.iconAddbutton {
    background: #2b3551;
    border: none;
    color: #ffffff;
}

.icon1 {
    color: #33cc33;
}

.icon2 {
    color: #ff4d4d;
}
</style>
