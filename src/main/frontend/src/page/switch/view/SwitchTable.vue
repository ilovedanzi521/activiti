<template>
    <div>
        <el-row :gutter="20">

            <el-col :span="7">
                <!-----新增div.contanier------>
                <div class="contanier-radius">
                    <!-----新增contanier头部------>
                    <div class="contanier-title">
                        <span>开关控制面板</span>
                        <span>
                            <el-switch v-model="value2" active-color="#13ce66" inactive-color="#13ce66">
                            </el-switch>
                        </span>
                    </div>
                    <!-----新增contanier头部------>
                    <div class="contanier-table">
                        <win-table :data.sync="switchData" height="584" :show-header="false" :showIndex="false" :showSelection="false" highlight-current-row>
                            <win-table-column prop="switchStatus" width="80">
                                <template slot-scope="scope">
                                    <el-switch name="scope.row.switchName" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" :inactive-value="1" v-model="scope.row.switchStatus"
                                        @change="handleSwitchChange(scope.$index, scope.row)">
                                    </el-switch>
                                </template>
                            </win-table-column>
                            <win-table-column prop="switchName">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="bottom">
                                        <p>{{ scope.row.switchExplain }}</p>
                                        <div slot="reference">{{ scope.row.switchName }}</div>
                                    </el-popover>
                                </template>
                            </win-table-column>
                        </win-table>
                    </div>
                    <win-pagination v-bind:childMsg="switchPageData" :isEasy="true" @callFather="handleSwitchPageQuery"></win-pagination>
                </div>
                <!-----新增div.contanier------>
            </el-col>

            <el-col :span="17">
                <!-----新增div.contanier------>
                <div class="contanier-radius">
                    <!-----新增contanier头部------>
                    <div class="contanier-title">
                        <span>操作日志</span>
                        <em>
                            允许状态（是）
                        </em>
                        <em>
                            禁止状态（否）
                        </em>
                        <label>
                            <i class="el-icon-edit-outline"></i>
                            <span>导出</span>
                        </label>
                    </div>
                    <!-----新增contanier头部------>
                    <div class="contanier-table">
                        <win-table :data.sync="switchOpLogData" max-height="750" :auto-resize="true" :showSelection="false">
                            <win-table-column prop="switchName" label="开关名称" sortable min-width="150"></win-table-column>
                            <win-table-column prop="operationType" label="操作类型" sortable min-width="30" :formatter="formatOperationType"></win-table-column>
                            <win-table-column prop="createUserId" label="操作人" sortable min-width="30"></win-table-column>
                            <win-table-column prop="createTime" label="操作时间" sortable min-width="50"></win-table-column>
                            <win-table-column prop="operationExplain" label="备注" sortable min-width="120"></win-table-column>
                        </win-table>
                        <win-pagination v-bind:childMsg="opLogPageData" @callFather="handleOpLogPageQuery"></win-pagination>
                    </div>
                </div>
                <!-----新增div.contanier------>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";
import { WinTable, WinTableColumn } from "@win-frond-frameworks/biz-common";
import PageVO from "../../common/vo/PageVO";
import { WinPagination } from "@win-frond-frameworks/biz-common";

@Component({ components: { WinTable, WinTableColumn, WinPagination } })
export default class SwitchTable extends Vue {
    value1 = true;

    @Prop()
    switchData: Array<any>;

    @Prop()
    switchOpLogData: Array<any>;

    @Prop()
    switchPageData: PageVO;

    @Prop()
    opLogPageData: PageVO;

    @Emit("swtichChange")
    handleSwitchChange(index, row) {}

    @Emit("swtichTableRowClick")
    handleRowClick(row) {}

    @Emit("switchPageQuery")
    handleSwitchPageQuery(switchPageData: PageVO) {}

    @Emit("opLogPageQuery")
    handleOpLogPageQuery(opLogPageVO: PageVO) {}

    formatOperationType({ cellValue, row, rowIndex, column, columnIndex }) {
        return row.operationType == 0 ? "开启" : "关闭";
    }
}
</script>

<style lang="scss" scoped>
.contanier-radius {
    border-radius: 10px;
    height: 700px;
    background: #1f2640;
    overflow: hidden;
    padding-bottom: 6px;
    margin-top: 16px;
}
.contanier-table {
    padding: 0 8px;
}
.contanier-title {
    position: relative;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
    background: #68718e;
    font-size: 16px;
    span {
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
    }
    em {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 50px;
        &:nth-of-type(2) {
            &::before {
                content: "";
                background: #ff4d4d;
                border-radius: 50%;
                z-index: 1;
            }
        }
        &::after {
            content: "";
            display: inline-block;
            position: absolute;
            top: 12px;
            left: -20px;
            width: 16px;
            height: 16px;
            background: #fff;
            border-radius: 50%;
        }
        &::before {
            content: "";
            display: inline-block;
            position: absolute;
            top: 16px;
            left: -16px;
            width: 8px;
            height: 8px;
            background: #33cc33;
            border-radius: 50%;
            z-index: 1;
        }
    }
    label {
        position: absolute;
        right: 30px;
        font-size: 14px;
        color: #f58a0dff;
        i,
        span {
            display: inline-block;
            vertical-align: middle;
        }
    }
}
</style>