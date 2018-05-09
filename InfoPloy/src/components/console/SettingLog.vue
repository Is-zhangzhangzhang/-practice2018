<template>
    <div>
        <Modal v-model="modal" title="设置日志参数：" @on-ok="ok" @on-cancel="cancel">
            <p>日志级别</p>
            <Select v-model="logType" style="width:200px">
                <Option v-for="item in logTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal: false,
                logTypeList: [
                    {
                        value: '没有日志',
                        label: '没有日志'
                    },
                    {
                        value: '错误日志',
                        label: '错误日志'
                    },
                    {
                        value: '最小日志',
                        label: '最小日志'
                    },
                    {
                        value: '基本日志',
                        label: '基本日志'
                    },
                    {
                        value: '详细日志',
                        label: '详细日志'
                    },
                    {
                        value: '调试',
                        label: '调试'
                    },
                    {
                        value: '行级日志(非常详细)',
                        label: '行级日志(非常详细)'
                    }
                ],
                logType: '基本日志'
            };
        },
        props: [
            'setting'
        ],
        methods: {
            ok () {
                this.$emit('okCallback', false);
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$emit('cancelCallback', false);
                this.$Message.info('Clicked cancel');
            }
        },
        mounted () {
            this.modal = this.setting;
            console.log(this.setting);
        }
    };
</script>
