<template>
    <div>
        <div class="col-md-12" style="margin-top:10px;">
            <ul class="btn-edit fr">
                <li>
                    <el-button-group>
                        <win_button type="info" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win_button>
                        <win_button v-popover:popover1 type="info" icon="el-icon-delete" round :disabled="selected.length == 0" @click="delBatch">删除</win_button>

                    </el-button-group>
                </li>
            </ul>
        </div>
        <div style="margin-top:10px;">
            <win_table :data="prodSubConsignor.list" @select-all="handleSelectAll" @select-change="handleSelectChange" highlight-current-row v-loading="loading" @cell-dblclick="view" element-loading-text="拼命加载中...">
                <win_table_column prop="no" label="二级委托人编号" header-align="center" align="left" sortable min-width="130"></win_table_column>
                <win_table_column prop="consignorName" label="所属委托人" header-align="center" align="left" sortable min-width="200"></win_table_column>
                <win_table_column prop="name" label="二级委托人名称" header-align="center" align="left" sortable min-width="200"></win_table_column>
                <win_table_column prop="shortName" label="二级委托人简称" header-align="center" align="left" sortable min-width="150"></win_table_column>
                <win_table_column prop="companyType" label="公司类型" header-align="center" align="center" :formatter="formatDic" sortable min-width="100"></win_table_column>
                <win_table_column prop="summary" label="备注" header-align="center" align="center" sortable min-width="300"></win_table_column>
                <win_table_column prop="operator" label="操作人" header-align="center" align="center" :formatter="formatDic" min-width="100"></win_table_column>
                <win_table_column prop="operationTime" label="操作时间" header-align="center" align="center" :formatter="formatDic" min-width="220" sortable></win_table_column>
                <win_table_column label="操作" min-width="160" fixed="right" header-align="center" align="center">
                    <template slot-scope="scope">
                        <win_button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win_button>
                        <win_button type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D" @click="operation(scope.row,'DELETE')">删除</win_button>
                    </template>
                </win_table_column>
            </win_table>
        </div>
        <!--分页组件-->
        <win_pagination v-bind:childMsg="prodSubConsignor" @callFather="pageQuery"></win_pagination>
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