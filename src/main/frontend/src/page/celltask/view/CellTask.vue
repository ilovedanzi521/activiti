<template>
    <div class="container">
        <el-container>
            <el-header>
                <win_form :inline="true" ref="opLogForm" :model="reqVO">
                    <div class="form_content">
                        <win_form_item label="任务名称">
                            <win_input suffix-icon="xxxx" v-model="reqVO.taskName"></win_input>
                        </win_form_item>
                        <win_form_item label="任务类型">
                            <win_select v-model="reqVO.taskType" filterable placeholder="请选择">
                                <win_option key="kettle" label="kettle" value="kettle"></win_option>
                                <win_option key="shell" label="shell" value="shell"></win_option>
                            </win_select>
                            <!-- <win_input suffix-icon="xxxx" v-model="reqVO.taskType"></win_input> -->
                        </win_form_item>
                        <win_form_item label="任务路径">
                            <win_input suffix-icon="xxxx" v-model="reqVO.path"></win_input>
                        </win_form_item>
                        <win_form_item label="描述">
                            <win_input suffix-icon="xxxx" v-model="reqVO.description"></win_input>
                        </win_form_item>
                        <win_form_item>
                            <div class="form-button">
                                <win_button @click="query()" type="primary">查询</win_button>
                                <win_button @click="reset()" type="default">重置</win_button>
                            </div>
                        </win_form_item>
                    </div>
                </win_form>
            </el-header>
        </el-container>
        <el-container>
            <el-aside width="185px">
                <win_menu>
                    <win_menu_item v-on:click="redirectTask">TASK定义</win_menu_item>
                    <win_menu_item v-on:click="redirectDefinition">流程定义</win_menu_item>
                    <win_menu_item v-on:click="redirectInstance">运行实例</win_menu_item>
                    <win_menu_item v-on:click="redirectLog">日志查询</win_menu_item>
                </win_menu>
            </el-aside>
            <el-main>
                <win_button @click=" openAddDialog()" type="primary">新增</win_button>

                <win_table :data="pageVO.list" style="width: 100%" max-height="600px">
                    <win_table_column prop="taskName" label="任务名称"></win_table_column>
                    <win_table_column prop="taskType" label="任务类型"></win_table_column>
                    <win_table_column prop="path" label="任务路径"></win_table_column>
                    <win_table_column prop="description" label="描述"></win_table_column>
                    <win_table_column label="操作" width="180">
                        <template slot-scope="scope">
                            <div class="operate">
                                <span @click="deleteTask(scope.row)">删除</span>
                                <span @click="openUpdateDialog(scope.row)">修改</span>
                                <span @click="exec(scope.row)">执行</span>
                            </div>
                        </template>
                    </win_table_column>
                </win_table>

                <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>
                <!--新增修改-->
                <win_dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
                    <win_form :inline="true" label-position="left" ref="exchangeForm" :model="reqVO" :rules="rules">
                        <div class="form_content">
                            <win_form_item label="任务名称" prop="taskName">
                                <el-input v-model="reqVO.taskName" :disabled="reqVO.id!=null"></el-input>
                            </win_form_item>
                            <win_form_item label="任务类型" prop="taskType">
                                <!-- <el-input v-model="reqVO.taskType" :disabled="reqVO.id!=null"></el-input> -->
                                <win_select v-model="reqVO.taskType" :disabled="reqVO.id!=null" filterable placeholder="请选择">
                                    <win_option key="kettle" label="kettle" value="kettle"></win_option>
                                    <win_option key="shell" label="shell" value="shell"></win_option>
                                </win_select>
                            </win_form_item>
                        </div>
                        <div class="form_content">
                            <win_form_item label="任务路径" prop="path">
                                <el-input v-model="reqVO.path"></el-input>
                            </win_form_item>
                            <win_form_item label=" 描述" prop="description">
                                <el-input v-model="reqVO.description"></el-input>
                            </win_form_item>
                        </div>

                    </win_form>
                    <el-divider></el-divider>
                    <div>
                        <win_button @click="closeDialog()" class="defaultButton">取消</win_button>
                        <span v-if="reqVO.id">
                            <win_button @click="updateCellTask('exchangeForm')" class="yellowButton">确认</win_button>
                        </span>
                        <span v-else>
                            <win_button @click="addCellTask('exchangeForm')" class="yellowButton">确认</win_button>
                        </span>
                    </div>
                </win_dialog>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts">
import CellTaskController from "../controller/CellTaskController";
import Component from "vue-class-component";
export default class CellTaskView extends CellTaskController {}
</script>
<style lang="scss" scoped>
</style>
