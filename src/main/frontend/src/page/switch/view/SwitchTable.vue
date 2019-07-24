<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="7">
                <win_table :data="switchData" :max-height="700" :show-header="false" :showIndex="false" :showSelection="false" highlight-current-row>
                    <win_table_column prop="switchStatus" width="80">
                        <template slot-scope="scope">
                            <el-switch name="scope.row.switchName" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" :inactive-value="1" v-model="scope.row.switchStatus" @change="handleSwitchChange(scope.$index, scope.row)">
                            </el-switch>
                        </template>
                    </win_table_column>
                    <win_table_column prop="switchName">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="bottom">
                                <p>{{ scope.row.switchExplain }}</p>
                                <div slot="reference">{{ scope.row.switchName }}</div>
                            </el-popover>
                        </template>
                    </win_table_column>
                </win_table>
            </el-col>
            <el-col :span="17">
                <win_table :data="switchOpLogData" :showSelection="false" style="width: 100%" :height="700">
                    <win_table_column prop="switchName" label="开关名称" :show-overflow-tooltip="true" sortable></win_table_column>
                    <win_table_column prop="operationType" label="操作类型" :formatter="formatOperationType" sortable width="100"></win_table_column>
                    <win_table_column prop="createUserId" label="操作人" sortable width="150"></win_table_column>
                    <win_table_column prop="createTime" label="操作时间" sortable width="170"></win_table_column>
                    <win_table_column prop="operationExplain" label="备注" sortable :show-overflow-tooltip="true"></win_table_column>
                </win_table>
                <win_pagination v-bind:childMsg="opLogPageData" :pageSizes="pageSizes" @callFather="handleOpLogPageQuery"></win_pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";
import { win_table, win_table_column } from "@win-frond-frameworks/biz-common";
import PageVO from "../../common/vo/PageVO";
import { win_pagination } from "@win-frond-frameworks/biz-common";

@Component({ components: { win_table, win_table_column, win_pagination } })
export default class SwitchTable extends Vue {
    @Prop()
    switchData: Array<any>;

    @Prop()
    switchOpLogData: Array<any>;

    @Prop()
    opLogPageData: PageVO;

    pageSizes: Array<number> = [15, 20, 30, 40];

    @Emit("swtichChange")
    handleSwitchChange(index, row) {}

    @Emit("swtichTableRowClick")
    handleRowClick(row) {}

    @Emit("opLogPageQuery")
    handleOpLogPageQuery(opLogPageVO: PageVO) {}

    formatOperationType({ cellValue, row, rowIndex, column, columnIndex }) {
        return row.operationType == 0 ? "开启" : "关闭";
    }
}
</script>

<style lang="scss" scoped>
</style>