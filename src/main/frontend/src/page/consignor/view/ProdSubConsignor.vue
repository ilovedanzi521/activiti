<template>
    <div>
        <div class="col-md-12" style="margin-top:10px;">
            <ul class="btn-edit fr">
                <li>
                    <el-button-group>
                        <win-button type="info" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win-button>
                        <win-button v-popover:popover1 type="info" icon="el-icon-delete" round :disabled="selected.length == 0" @click="delBatch">删除</win-button>

                    </el-button-group>
                </li>
            </ul>
        </div>
        <div style="margin-top:10px;">
            <win-table :data="prodSubConsignor.list" @select-all="handleSelectAll" @select-change="handleSelectChange" v-loading="loading" @cell-dblclick="view" element-loading-text="拼命加载中...">
                <win-table-column prop="no" label="二级委托人编号" header-align="center" align="left" sortable min-width="130"></win-table-column>
                <win-table-column prop="consignorName" label="所属委托人" header-align="center" align="left" sortable min-width="200"></win-table-column>
                <win-table-column prop="name" label="二级委托人名称" header-align="center" align="left" sortable min-width="200"></win-table-column>
                <win-table-column prop="shortName" label="二级委托人简称" header-align="center" align="left" sortable min-width="150"></win-table-column>
                <win-table-column prop="companyType" label="公司类型" header-align="center" align="center" :formatter="formatDic" sortable min-width="100"></win-table-column>
                <win-table-column prop="summary" label="备注" header-align="center" align="center" sortable min-width="300"></win-table-column>
                <win-table-column prop="operator" label="操作人" header-align="center" align="center" :formatter="formatDic" min-width="100"></win-table-column>
                <win-table-column prop="operationTime" label="操作时间" header-align="center" align="center" :formatter="formatDic" min-width="220" sortable></win-table-column>
                <win-table-column label="操作" min-width="160" fixed="right" header-align="center" align="center">
                    <template slot-scope="scope">
                        <win-button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win-button>
                        <win-button type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D" @click="operation(scope.row,'DELETE')">删除</win-button>
                    </template>
                </win-table-column>
            </win-table>
        </div>
        <!--分页组件-->
        <win-pagination v-bind:childMsg="prodSubConsignor" @callFather="pageQuery"></win-pagination>
        <!-- 创建/修改/删除 begin-->
        <ProdSubConsignorDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible"></ProdSubConsignorDialog>
        <!-- 创建/修改/删除 end-->
    </div>
</template>
<script lang="ts">
import Component from "vue-class-component";
import ProdSubConsignorController from "../controller/ProdSubConsignorController";

export default class ProdSubConsignor extends ProdSubConsignorController {}
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
.el-pagination {
    padding-right: 10px;
    text-align: right;
    box-sizing: border-box;
}
</style>