<template>
    <table class="table-container">
        <thead class="table-header">
            <slot name="tableHeader"></slot>
        </thead>
        <tbody>
            <slot name="tableBody"></slot>
            <!-- <tr>
                <td>1</td>
                <td>A-0001</td>
                <td>黄蓉</td>
                <td>投资总监</td>
                <td>0755-32434324</td>
                <td>130668651111</td>
                <td>12sws@qq.com</td>
                <td>A-1固定投资部</td>
                <td>注销</td>
                <td>
                    <span>权限管理</span>
                    <span>冻结</span>
                    <span>重置密码</span>
                    <span>注销</span>
                </td>
            </tr>
            -->
        </tbody>
    </table>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.table-container {
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    .table-header {
        height: 44px;
        line-height: 44px;
        text-align: left;
        font-size: 14px;
        border-top: 1px solid #707070;
        tr {
            background: #2a2a2a;
        }
        td {
            padding-left: 10px;
            color: #fff;
            border: none;
        }
    }
    tbody {
        tr {
            height: 46px;
            line-height: 46px;
            text-align: left;
            background: #000000;
            td {
                padding-left: 10px;
                color: #adb5bb;
                cursor: pointer;
                &.operation {
                    span {
                        display: inline-block;
                        margin-left: 6px;
                    }
                }
            }
            &:nth-of-type(even) {
                height: 46px;
                line-height: 46px;
                text-align: left;
                color: #fff;
                background: #2a2a2a;
            }
        }
    }
}
</style>