<template>
    <div class="ps1 contanier">
        <div class="fl">
            <ul>
                <li class="liGroup">
                    <div class="fr">
                        <span>证券类别</span>
                        <win-select clearable v-model="typeReqVO.securityType" filterable placeholder="请选择">
                            <el-option v-for="item in SecurityCodeArray" :key="item.securityType" :label="item.securityTypeName" :value="item.securityType"></el-option>
                        </win-select>
                    </div>
                    <div class="fr">
                        <span>资产类别</span>
                        <win-select clearable v-model="typeReqVO.assetType" placeholder="请选择">
                            <el-option v-for="item in securityTypeDic.assetTypeDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></el-option>
                        </win-select>
                    </div>
                    <div class="fr">
                        <span>申报单位</span>
                        <win-select clearable v-model="typeReqVO.declarationUnit" placeholder="请选择">
                            <el-option v-for="item in securityTypeDic.declarationUnitDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></el-option>
                        </win-select>
                    </div>
                    <div class="fr">
                        <span>资金冻结方式</span>
                        <win-select clearable v-model="typeReqVO.blockFundsType" placeholder="请选择">
                            <el-option v-for="item in securityTypeDic.blockFundsTypeDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></el-option>
                        </win-select>
                    </div>

                    <div class="fr botton_group">
                        <win-button style="width: 90px;" type="primary" icon="el-icon-search" @click="querySecurityType">查询</win-button>
                        <win-button style="width: 90px;" icon="el-icon-refresh" @click="reset">重置</win-button>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <win-table :max-height="520" :data="pageVO.list" :showSelection="false">
                <win-table-column prop="marketCode" :formatter="marketFormatter" label="交易市场" width="100"></win-table-column>
                <win-table-column :formatter="platformFormatter" prop="platformCode" label="交易平台" width="180"></win-table-column>
                <win-table-column prop="marketType" label="市场类型" :formatter="marketTypeFormatter" width="100"></win-table-column>
                <win-table-column prop="securityType" label="证券类别" width="120"></win-table-column>
                <win-table-column prop="securityTypeName" label="证券类别名称" width="180"></win-table-column>
                <win-table-column prop="assetType" :formatter="assetTypeFormatter" label="资产类别" width="100"></win-table-column>
                <win-table-column prop="faceValue" label="面值" width="100"></win-table-column>
                <win-table-column prop="securityTypeUnit" :formatter="securityTypeUnitFormatter" label="证券类别单位" width="180"></win-table-column>
                <win-table-column prop="boardNumber" label="每手数量" width="100"></win-table-column>
                <win-table-column prop="minBuyVolume" label="买入最小数量" width="180"></win-table-column>
                <win-table-column prop="maxBuyVolume" label="买入最大数量" width="180"></win-table-column>
                <win-table-column prop="buyEventNumber" label="买入变动单位数量" width="180"></win-table-column>
                <win-table-column prop="minSaleVolume" label="卖出最小数量" width="180"></win-table-column>
                <win-table-column prop="maxSaleVolume" label="卖出最大数量" width="180"></win-table-column>
                <win-table-column prop="saleEventNumber" label="卖出变动单位数量" width="180"></win-table-column>
                <win-table-column prop="minNumberUnit" label="数量最小单位" width="180"></win-table-column>
                <win-table-column prop="minBuyAmount" label="买入最小金额" width="180"></win-table-column>
                <win-table-column prop="maxBuyAmount" label="买入最大金额" width="180"></win-table-column>
                <win-table-column prop="minSaleAmount" label="卖出最小金额" width="180"></win-table-column>
                <win-table-column prop="maxSaleAmount" label="卖出最大金额" width="180"></win-table-column>
                <win-table-column prop="declarationUnit" :formatter="declarationUnitFormatter" label="申报单位" width="100"></win-table-column>
                <win-table-column prop="transactionDirections" label="交易方向权限" width="180"></win-table-column>
                <win-table-column prop="blockFundsType" :formatter="blockFundsTypeFormatter" label="资金冻结方式" width="180"></win-table-column>
                <win-table-column prop="minControlType" :formatter="minControlTypeFormatter" label="买卖最小数量控制方式" width="180"></win-table-column>
            </win-table>
            <!-- 分页组件 -->
            <win-pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win-pagination>
        </div>
    </div>
</template>
<script lang="ts">
import Component from "vue-class-component";
import SecurityTypeController from "../controller/SecurityTypeController";

@Component
export default class SecurityType extends SecurityTypeController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
.ps1 {
    margin-top: 8px;
    span {
        display: inline-block;
        text-align: right;
        margin: 0 10px 0 13px;
        vertical-align: middle;
        color: #909399;
    }
}
.contanier {
    padding-left: 28px;
    box-sizing: border-box;
}

li.liGroup {
    width: 100%;
    overflow: hidden;
    margin-bottom: 8px;
    .fl {
        float: left;
    }
    .fr {
        float: left;
        // margin-left: 30px;
    }
    .botton_group {
        margin-left: 62px;
    }
}
</style>