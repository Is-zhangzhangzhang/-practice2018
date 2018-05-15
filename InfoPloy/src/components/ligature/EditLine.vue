<template>
    <div>
        <Modal
            v-model="modal"
            title="Excel输入"
            class-name="vertical-center-modal"
            width="500px">
            <div class="contain">
                <Form :label-width="100">
                    <FormItem label="起始步骤:">
                        <Select style="width:200px" :value="pointList.source"  v-model="source">
                            <Option  :value="pointList.source" :key="pointList.source">{{ pointList.source }}</Option>
                            <Option  :value="pointList.target" :key="pointList.target">{{ pointList.target }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="目标步骤:">
                        <Select style="width:200px" :value="pointList.target"  v-model="target">
                            <Option  :value="pointList.source" :key="pointList.source">{{ pointList.source }}</Option>
                            <Option  :value="pointList.target" :key="pointList.target">{{ pointList.target }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="使连接生效？">
                        <Checkbox v-model="single"></Checkbox>
                        <Button type="ghost" @click.prevent="changeLimit" style="float: right">From  To</Button>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" >
                <Button type="primary" size="small" @click="ok">确定</Button>
                <Button type="ghost" size="small" @click="cancel">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    export default {
        name: 'editLine',
        // props: ['line'],
        data () {
            return {
                modal: false,
                pointList: {
                    source: '',
                    target: ''
                },
                source: '',
                target: '',
                single: false
            };
        },
        computed: {
            ...mapState([
                'line'
            ])
        },
        methods: {
            ...mapMutations([
                'showEditLine'
            ]),
            ok () {
                this.showEditLine(false);
            },
            cancel () {
                this.showEditLine(false);
            },
            changeLimit () {
                let tem = this.source;
                this.source = this.target;
                this.target = tem;
            }
        },
        mounted () {
            this.modal = this.line.show;
            this.source = this.pointList.source = this.line.source;
            this.target = this.pointList.target = this.line.target;
        },
        watch: {
            modal (val, oldval) {
                if (oldval && !val){
                    this.showEditLine(false);
                }
            }
        }
    };
</script>

<style>
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .vertical-center-modal .ivu-modal{
        top: 0;
    }
</style>
