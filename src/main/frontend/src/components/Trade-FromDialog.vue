<template>
    <div class="mask">
        <div class="dialogFrom-contaier">
            <div class="header">
                <span class="header-title">新增公司</span>
                <span class="header-close">X</span>
            </div>
            <div class="content">
                <p>
                    <label id="logo" class="label">公司logo</label>
                    <input type="text" class="input" for="logo">
                </p>
                <p>
                    <label id="name" class="label required">公司全称</label>
                    <input type="text" class="input" for="name">
                </p>
                <p>
                    <label id="jc" class="label required">公司简称</label>
                    <input type="text" class="input" for="jc">
                </p>
                <p>
                    <label id="code" class="label required">公司编号</label>
                    <input type="text" class="input" for="code">
                </p>
            </div>
            <div class="footer">
                <button>取消</button>
                <button class="submit">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    methods: {}
};
</script>
<style lang="scss" scoped>
@import "../assets/style/theme.scss";
@import "../assets/style/element.scss";
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    .dialogFrom-contaier {
        padding: 30px 32px;
        border: 1px solid $color-orange;
        border-radius: 4px;
        background: #494949;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            padding-bottom: 8px;
            font-size: 18px;
            color: #fff;
            font-weight: bold;
            font-weight: bolder;
            border-bottom: 2px solid #707070;
        }
        .footer {
            padding: 28px 0 0;
            margin-top: 16px;
            text-align: center;
            border-top: 2px solid #707070;
            button {
                @include button();
                &:last-of-type {
                    margin-left: 16px;
                }
                &.submit {
                    @include button($bg: #ff900d, $color: #fff);
                }
            }
        }
        .content {
            p {
                margin-bottom: 16px;
            }
            label,
            input {
                display: inline-block;
                vertical-align: middle;
                margin-right: 4px;
                &.input {
                    width: 240px;
                    height: 40px;
                    padding-left: 6px;
                    line-height: 40px;
                    background: #494949;
                    border: none;
                    color: #fff;
                    border: 1px solid #adb5bb;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                &.label {
                    color: #adb5bb;
                    font-weight: bolder;
                    margin-right: 6px;
                    position: relative;
                    &.required {
                        &::after {
                            content: "*";
                            position: absolute;
                            color: red;
                            right: -6px;
                            top: -4px;
                        }
                    }
                }
            }
        }
    }
}
</style>