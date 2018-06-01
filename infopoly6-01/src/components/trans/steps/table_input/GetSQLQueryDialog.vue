<template>
    <div>
        <Modal v-model="modal" title="Progress Information" :loading="loading" @on-cancel="cancel">
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
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    export default {
        data () {
            return {
                getQuery: false,
                modal: false,
                modal6: false,
                loading: true
            };
        },
        computed: {
            ...mapState([
                'isGetsql'
            ])
        },
        methods: {
            ...mapMutations([
                'sqlQueryShow'
            ]),
            asyncOK () {
                setTimeout(() => {
                    this.modal6 = false;
                }, 2000);
            },
            cancel () {
                this.sqlQueryShow(false);
            }
        },
        mounted () {
            this.getQuery = this.isGetsql;
            this.modal = this.getQuery;
            console.log(this.getQuery);
        }
    };
</script>

