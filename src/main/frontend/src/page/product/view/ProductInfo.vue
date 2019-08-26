<template>
    <div class="ProductInfo">
        <!--产品详情子组件:Begin -->
        <ProdInfoDialog v-if="isDetailAble" ref="prodInfoDialog" @getFormData="formDataSubmit"></ProdInfoDialog>
        <!--产品详情子组件:End -->
        <!--产品详情查询表单:Begin -->
        <div class="formInline">
            <win-form v-model="productInfoForm" :inline="true">
                <win-row>
                    <win-col class="buttonCol">
                        <el-button-group>
                            <win-button type="info" icon="el-icon-plus" @click="onAddSubmit" round>新增</win-button>
                            <win-button type="info" icon="el-icon-delete" :disabled="multipleSelection.length == 0" round>导出</win-button>
                            <win-button type="info" icon="el-icon-document-copy" round>导出所有</win-button>
                        </el-button-group>
                    </win-col>
                    <win-col class="inCol">
                        <win-form-item label="产品名称">
                            <win_autocomplete v-model="productInfoForm.name" :fetch-suggestions="inCodeSelectFun" @select="handleCodeSelect" clearable placeholder="请输入内容">
                            </win_autocomplete>
                        </win-form-item>
                    </win-col>
                    <win-col class="inCol">
                        <win-form-item label="产品状态">
                            <win-select v-model="productInfoForm.status" clearable placeholder="请选择">
                                <win-option v-for="item in prodInfoDicData.status" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                    <span style="float: left">{{ item.dicCode }}</span>
                                    <span>{{ "&nbsp;"+item.dicExplain }}</span>
                                </win-option>
                            </win-select>
                        </win-form-item>
                    </win-col>
                    <win-col class="selectCol">
                        <win-button type="primary" icon="el-icon-search" @click="onFindSubmit">查询</win-button>
                        <win-button icon="el-icon-refresh" @click="reset">重置</win-button>
                    </win-col>
                </win-row>
            </win-form>
        </div>
        <!--产品查询表单:End -->
        <!--产品表格数据:Begin -->
        <div class="fundDataTable">
            <win-table :height="tableHeight" highlight-current-row @cell-click="handleCurrentChange" :data="pageVO.list" @select-all="handleSelectAll" ref="fundInfoTable" @cell-dblclick="handleRowDBClick"
                @select-change="handleSelectionChange" :selectionFixed="true" :showIndex="false">
                <win-table-column sortable prop="no" label="产品序号" align="center" min-width="100"></win-table-column>
                <win-table-column sortable prop="code" label="产品代码" align="left" min-width="120"></win-table-column>
                <win-table-column sortable prop="name" label="产品名称" align="left" min-width="200"></win-table-column>
                <win-table-column prop="prodShare" :thousandth="true" label="产品份额" align="right" min-width="180"></win-table-column>
                <win-table-column prop="type" :formatter="prodDicFormatter" label="产品类型" align="left" min-width="120"></win-table-column>
                <win-table-column prop="status" :formatter="prodDicFormatter" label="产品状态" align="center" min-width="120"></win-table-column>
                <win-table-column prop="assetCury" :formatter="prodCuryFormatter" label="资产币种" align="left" min-width="150"></win-table-column>
                <win-table-column prop="collectCury" :formatter="prodCuryFormatter" label="募集币种" align="left" min-width="150"></win-table-column>
                <win-table-column prop="createUserId" label="录入人" align="left" min-width="150"></win-table-column>
                <win-table-column prop="createTime" :formatter="DateFormatter" label="录入时间" align="left" min-width="150"></win-table-column>
                <win-table-column prop="updateUserId" label="最近修改人" align="left" min-width="150"></win-table-column>
                <win-table-column prop="updateTime" :formatter="DateFormatter" label="最近修改时间" align="left" min-width="150"></win-table-column>
                <win-table-column fixed="right" header-align="center" align="center" label="操作" min-width="160">
                    <template slot-scope="scope">
                        <win-button size="small" @click="onEditClick(scope.row)" type="text" icon="el-icon-edit-outline">修改</win-button>
                        <win-button size="small" @click="onDeleteClick(scope.row)" style="color:#FF4D4D" type="text" icon="el-icon-delete">删除</win-button>
                    </template>
                </win-table-column>
            </win-table>
            <!--产品表格分页:Begin -->
            <win-pagination v-bind:childMsg="pageVO" @callFather="pageFindSubmit"></win-pagination>
            <!--产品表格分页:End -->
        </div>
        <!--产品表格数据:End -->
    </div>
</template>
<script lang="ts">
import ProductInfoController from "../controller/ProductInfoController";
import Component from "vue-class-component";

@Component
export default class ProductInfo extends ProductInfoController {}
</script>
<style lang="scss" scoped>
.ProductInfo /deep/ {
    .formInline {
        width: 100%;
        height: 45px;
    }
    .buttonCol {
        width: 680px;
        margin-top: 5px;
    }
    .inCol {
        width: 360px;
    }
    .selectCol {
        width: 200px;
        margin-top: 5px;
    }
}
</style>