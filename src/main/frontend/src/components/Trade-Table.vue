<template>
    <table class="table-container">
        <thead class="table-header">
            <slot name="tableHeader"></slot>
        </thead>
        <tbody>
            <slot name="tableBody"></slot>
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