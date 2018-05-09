<template>
    <div>
        <Modal v-model="modal" title="Progress Information" :loading="loading">
            <p style="color: deepskyblue;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>正在从数据库读取信息...</span>
            </p>
            <Progress :percent="45" status="active"></Progress>
            <p style="text-align:center">获取模式信息</p>
            <div slot="footer" >
                <Button type="ghost" size="small" @click="cancel">Cancel</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        props: [
            'getQuery'
        ],
        data () {
            return {
                modal: false,
                modal6: false,
                loading: true
            };
        },
        methods: {
            asyncOK () {
                setTimeout(() => {
                    this.modal6 = false;
                }, 2000);
            },
            cancel () {
                this.$emit('cancelQuery', false);
            }
        },
        mounted () {
            this.modal = this.getQuery;
            console.log(this.getQuery);
        }
    };
</script>

