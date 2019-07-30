<template>
    <div class="container">
        <!--程序主窗体-->
        <el-container height="100%">
            <el-aside width="185px">
                <div ref="userinfo">
                    <el-button-group style="width:200px;margin-bottom:-18px ">
                        <win_button :disabled="level!=1" type="warning" round @click="addflowgroup" icon="el-icon-plus" class="iconAddbutton">新增</win_button>
                        <win_button type="warning" icon="el-icon-delete" class="iconAddbutton" round @click="delflowgroup">删除</win_button>
                    </el-button-group>

                    <!--左侧树形列表 -->
                    <win_tree style="margin-top:10px; width:185px;top: 30px;bottom: 0;position: absolute" ref="SlotTree" node-key="id" :accordion="true" :default-expanded-keys="expandList" :data="treedata" :auto-expand-parent="false"
                        @node-click="handleNodeClick" :highlight-current="true">
                        <div class="comp-tr-node" slot-scope="{ node, data }">
                            <template v-if="data.isEdit">
                                <el-input size="mini" v-focus v-model.trim="data.label" @blur.stop="handleBlur(data)" @keyup.enter.native="handleBlur(data)" :ref="'slotTreeInput' +data.id" :id="data.id" :autofocus="true">
                                </el-input>
                            </template>
                            <template v-else>
                                <span @dblclick="edit(data)">
                                    {{ data.label }}
                                </span>
                            </template>
                        </div>
                    </win_tree>
                </div>
            </el-aside>
            <el-container>
                <el-header height="165px">
                    <win_form :inline="true" :model="reqVO" class="demo-form-inline">
                        <el-row>
                            <win_form_item label="流程名称" style="margin-right:-5px;margin-left:-25px">
                                <el-input v-model="reqVO.flowName" :maxlength="80"></el-input>
                            </win_form_item>
                            <win_form_item label="流程类型" style="margin-right:-15px">
                                <win_select v-model="reqVO.flowType" filterable clearable placeholder="请选择">
                                    <win_option v-for="item in flowTypeItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                                </win_select>
                            </win_form_item>
                            <win_form_item label="产品" style="margin-right:-15px">
                                <win_select v-model="reqVO.productCode" filterable clearable placeholder="请选择">
                                    <win_option v-for="item in productItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                                </win_select>
                            </win_form_item>
                            <win_form_item label="投资单位" style="margin-right:-15px">
                                <win_select v-model="reqVO.investCompany" filterable clearable placeholder="请选择">
                                    <win_option v-for="item in investCompanyItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                                </win_select>
                            </win_form_item>
                            <win_form_item label="组合" style="margin-right:-15px">
                                <win_select v-model="reqVO.investConstitute" filterable clearable placeholder="请选择">
                                    <win_option v-for="item in investConstituteItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                                </win_select>
                            </win_form_item>
                        </el-row>
                        <el-row style="margin-top:-20px;margin-left:5px">
                            <win_form_item label="指令类型" style="margin-right:-5px;margin-left:-30px">
                                <win_select v-model="reqVO.instructionType" filterable clearable placeholder="请选择">
                                    <win_option v-for="item in instructionTypeItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                                </win_select>
                            </win_form_item>
                            <win_form_item label="交易市场" style="margin-right:-15px">
                                <win_select v-model="reqVO.marketCode" filterable clearable placeholder="请选择">
                                    <win_option v-for="item in marketItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                                </win_select>
                            </win_form_item>
                            <win_form_item label="证券类型" style="margin-right:-15px">
                                <win_select v-model="reqVO.securityType" filterable clearable placeholder="请选择">
                                    <win_option v-for="item in securityTypeItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                                </win_select>
                            </win_form_item>
                            <win_form_item label="交易方向" style="margin-right:-15px">
                                <win_select v-model="reqVO.transactionDirection" filterable clearable placeholder="请选择">
                                    <win_option v-for="item in transactionDirectionItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                                </win_select>
                            </win_form_item>
                        </el-row>
                        <el-row style="text-align:center;margin-top:-10px">
                            <el-button @click="queryExchangeFlow(reqVO)" type="primary">查询</el-button>
                            <el-button @click="reset()" type="default">重置</el-button>
                        </el-row>
                        <el-row style="margin-left:0px ;margin-bottom:0px">
                            <!--<el-button @click="openAddDialog()">新增</el-button>-->
                            <!--<el-button @click="batchDelete(tableChecked)">删除</el-button>-->
                            <!--<el-button @click="startflow()">启动</el-button>-->
                            <!--<el-button @click="stopflow()">停止</el-button>-->

                            <el-button-group>
                                <win_button :disabled="level!=2" type="warning" round @click="openAddDialog()" icon="el-icon-plus" class="iconAddbutton">新增</win_button>
                                <win_button :disabled="!options" type="warning" icon="el-icon-delete" class="iconAddbutton" round @click="batchDelete(tableChecked)">删除</win_button>
                                <win_button :disabled="!options" type="warning" icon="el-icon-video-play" class="iconAddbutton" round @click="startflow(tableChecked)">启用</win_button>
                                <win_button :disabled="!options" type="warning" icon="el-icon-video-pause" class="iconAddbutton" round @click="stopflow(tableChecked)">停用</win_button>
                            </el-button-group>
                        </el-row>
                    </win_form>
                    <!--返回数据列表-->
                    <win_table ref="xTable1" :data="pageVO.list" :selection-width=20 :show-index="false" @select-all="selectAllEvent" @select-change="handleSelectionChange" border>
                        <!-- <win_table_column type="selection"></win_table_column> -->
                        <win_table_column prop="flowName" label="流程名称" sortable></win_table_column>
                        <win_table_column prop="flowType" label="流程类型" sortable></win_table_column>
                        <win_table_column prop="productCode" label="产品" sortable></win_table_column>
                        <win_table_column prop="investCompany" label="投资单位" sortable width="180"></win_table_column>
                        <win_table_column prop="investConstitute" label="组合资产" sortable></win_table_column>
                        <win_table_column prop="instructionType" label="指令类型" sortable></win_table_column>
                        <win_table_column prop="marketCode" label="交易市场" sortable></win_table_column>
                        <win_table_column prop="securityType" label="证券类型" sortable></win_table_column>
                        <win_table_column prop="transactionDirection" label="交易方向" sortable></win_table_column>
                        <win_table_column label="启用标志" prop="startFlag">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.startFlag" :active-value="true" :inactive-value="false" active-color="#13ce66" inactive-color="#ff4949" @change="change(scope.row,scope.row.startFlag)"></el-switch>
                            </template>
                        </win_table_column>
                        <win_table_column prop="publisherCode" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="openUpdateDialog(scope.row)" size="small">修改</el-button>

                                <el-button type="text" @click="designFlow(scope.row)" size="small">设计流程</el-button>
                            </template>
                        </win_table_column>
                    </win_table>
                    <!--分页组件-->
                    <!-- <Pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></Pagination> -->
                    <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>
                </el-header>
            </el-container>
        </el-container>

        <!--修改、增加框 -->

        <win_dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" class="dialogclass" :close-on-click-modal="false" @close="closeDialog('exchangeForm')">
            <win_form :inline="true" label-position="left" ref="exchangeForm" :model="flowVO" :rules="rules">
                <div class="form_content_flow">
                    <win_form_item label="流程名称" prop="flowName">
                        <win_input v-model.trim="flowVO.flowName" :disabled="flowVO.id!=null" :maxlength="80"></win_input>
                    </win_form_item>
                    <win_form_item label="流程类型" prop="flowType">
                        <win_select v-model="flowVO.flowType" :disabled="flowVO.id!=null" filterable clearable placeholder="请选择">
                            <win_option v-for="item in flowTypeItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content_flow">
                    <win_form_item label="有效日期" prop="timeArray">
                        <!-- <el-date-picker v-model="flowVO.beginDate" value-format="yyyy-MM-dd" type="date" placeholder="开始日期"></el-date-picker>
                        <el-date-picker v-model="flowVO.endDate" value-format="yyyy-MM-dd" type="date" placeholder="结束日期"></el-date-picker> -->
                        <win_date_picker v-model="flowVO.timeArray" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></win_date_picker>
                    </win_form_item>
                </div>
                <div class="form_content_flow">
                    <win_form_item label="产品" prop="productCode">
                        <win_select v-model="flowVO.productCode" :disabled="flowVO.id!=null" filterable clearable placeholder="请选择">
                            <win_option v-for="item in productItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="投资单位">
                        <win_select v-model="flowVO.investCompany" filterable clearable placeholder="请选择">
                            <win_option v-for="item in investCompanyItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content_flow">
                    <win_form_item label="组合">
                        <win_select v-model="flowVO.investConstitute" filterable clearable placeholder="请选择">
                            <win_option v-for="item in investConstituteItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="指令类型">
                        <win_select v-model="flowVO.instructionType" filterable clearable placeholder="请选择">
                            <win_option v-for="item in instructionTypeItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content_flow">
                    <win_form_item label="交易市场">
                        <win_select v-model="flowVO.marketCode" filterable clearable placeholder="请选择">
                            <win_option v-for="item in marketItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="证券类型">
                        <win_select v-model="flowVO.securityType" filterable clearable placeholder="请选择">
                            <win_option v-for="item in securityTypeItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content_flow">
                    <win_form_item label="交易方向">
                        <win_select v-model="flowVO.transactionDirection" filterable clearable placeholder="请选择">
                            <win_option v-for="item in transactionDirectionItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="控制类型">
                        <win_select v-model="flowVO.controlType" filterable clearable placeholder="请选择">
                            <win_option v-for="item in controlTypeItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_input v-if="false" v-model="flowVO.flowCode"></win_input>
                </div>
            </win_form>
            <span slot="footer" class="dialog-footer">
                <win_button @click="closeDialog('exchangeForm')" type="default">取消</win_button>
                <span v-if="deleteFlag">
                    <win_button @click="deleteExchangeFlow(true)" type="primary">确认</win_button>
                </span>
                <span v-else-if="flowVO.id">
                    <win_button @click="updateExchangeFlow(true)" type="primary">确认</win_button>
                </span>
                <span v-else>
                    <win_button @click="addExchangeFlow(true)" type="primary">确认</win_button>
                </span>
            </span>
            <!-- <div>

                <win_button @click="closeDialog('exchangeForm')" class="defaultButton">取消</win_button>
                <span v-if="deleteFlag">
                    <win_button @click="deleteExchangeFlow(true)" class="yellowButton">确认</win_button>
                </span>
                <span v-else-if="flowVO.id">
                    <win_button @click="updateExchangeFlow(true)" class="yellowButton">确认</win_button>
                </span>
                <span v-else>
                    <win_button @click="addExchangeFlow(true)" class="yellowButton">确认</win_button>
                </span>
            </div> -->
        </win_dialog>
        <!--end -->
        <!-- 流程弹出窗体-->
        <win_dialog @close="closeFlowDialog" title="流程设计" :visible.sync="dialogTableVisible" width="1740px" height="760px" top="50px">
            <iframe :src="flowUrl" style="width:100%;height:760px;" frameborder="0" marginwidth="0" marginheight="0"></iframe>
        </win_dialog>
        <!-- 流程弹出窗体结束-->
    </div>
</template>
<script lang="ts">
import ExchangeFlowController from "../controller/ExchangeFlowController";
import Component from "vue-class-component";
import ElementUI from "element-ui";
export default class Exchange extends ExchangeFlowController {
    /**鼠标聚焦 */
    /**鼠标移开 */
}
</script>
<style lang="scss" scoped>
/*@import "../../../assets/style/page.scss";*/
.flow {
    position: fixed;
    width: 80%;
    height: 100%;
    right: 0;
    top: 0;
    background: #000;
    z-index: 9999;
}
.win_aside {
    background-color: #000;
    color: #333;
    text-align: center;
    /*line-height: 600px;*/
}

.win_header {
    background-color: #000;
    height: 20%;
}
.el-icon-plus {
    color: #ffffff;
}

.iconAddbutton {
    color: #fff;
    background: #2b3551;
    border: #2b3551;
}
.form_content_flow {
    height: 12%;
}
.dialogclass {
    margin-top: 62px;
}
</style>


