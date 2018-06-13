<template>
    <div>
        <Modal
            v-model="modal"
            title="执行转换"
            class-name="vertical-center-modal"
            class="run-trans"
            width="700px">
            <div class="run-configuration-div">
                <span class="run-configuration">Run configuration:</span>
                <Select class="run-type" v-model="runType">
                    <Option value="local">Pentaho local</Option>
                </Select>
            </div>
            <div class="detail">
                <span>细节</span>
                <CheckboxGroup v-model="detail">
                    <Checkbox label="Clear log before running"></Checkbox>
                    <Checkbox label="启用安全模式"></Checkbox>
                    <Checkbox label="Gather performance metrics"></Checkbox>
                </CheckboxGroup>
                <div class="log-type">
                    <span>日志级别</span>
                    <Select v-model="logType" class="log-type-select">
                        <Option v-for="item in logTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="table-div">
                <Tabs type="card">
                    <TabPane label="命名参数">
                        <Table :columns="columns1" :data="data1"></Table>
                    </TabPane>
                    <TabPane label="变量">
                        <Table :columns="columns2" :data="data2"></Table>
                    </TabPane>
                </Tabs>
            </div>
            <div>
                <Checkbox v-model="run">Always show dialog on run</Checkbox>
            </div>
            <div slot="footer" >
                <Button icon="help" @click="help">Help</Button>
                <Button @click="start">启动</Button>
                <Button @click="cancel">取消</Button>
            </div>
        </Modal>
        <Modal v-model="helpMsg">
            <p slot="header">
                <Icon type="arrow-expand"></Icon>
                <span>Help for Execute a transformation</span>
            </p>
            <h3>Run a transformation</h3>
        </Modal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    export default {
        name: 'transRunMl',
        data () {
            return {
                modal: false,
                runType: 'local',
                detail: [],
                run: true,
                helpMsg: false,
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
                logType: '基本日志',
                columns1: [
                    {
                        title: '命名参数',
                        key: 'name'
                    },
                    {
                        title: '默认值',
                        key: 'default'
                    },
                    {
                        title: '值',
                        key: 'value'
                    },
                    {
                        title: 'Description',
                        key: 'description'
                    }
                ],
                data1: [
                    {
                        name: '',
                        default: '',
                        value: '',
                        description: ''
                    }
                ],
                columns2: [
                    {
                        title: '变量',
                        key: 'variable'
                    },
                    {
                        title: '值',
                        key: 'value'
                    }
                ],
                data2: [
                    {
                        variable: 'Internal.Entry.Current.Directory',
                        value: 'file:///C:/Users/Desktop'
                    },
                    {
                        variable: 'Parent Job File Directory',
                        value: 'Parent Job File Directory'
                    },
                    {
                        variable: 'Internal.Job.Filename.Name',
                        value: 'Parent Job Filename'
                    },
                    {
                        variable: 'Internal.Job.Name',
                        value: 'Parent Job Name'
                    },
                    {
                        variable: 'Internal.Job.Repository.Directory',
                        value: 'Parent Job Repository Directory'
                    }
                ]
            };
        },
        computed: {
            ...mapState([
                'runTransModal'
            ])
        },
        methods: {
            ...mapMutations([
                'runTransShow'
            ]),
            start () {
                this.runTransShow(false);
            },
            cancel () {
                this.runTransShow(false);
            },
            help () {
                this.helpMsg = true;
            }
        },
        mounted () {
            this.modal = this.runTransModal;
        },
        watch: {
            modal (val, oldVal) {
                if (oldVal && !val){
                    this.runTransShow(false);
                }
            }
        }

    };
</script>

<style lang="less" type="text/less">
    .run-trans{
        .run-configuration-div{
            margin-top: -6px;
            margin-bottom: 12px;
            .run-configuration{
                display: block;
            }
            .run-type{
                width:295px;
            }
        }
        .detail{
            border: 1px solid #dcdcdc;
            padding: 6px;
            .log-type{
                margin-top: 4px;
                .log-type-select{
                    width:200px;
                }
            }
        }
        .table-div{
            margin-top: 12px;
            margin-bottom: 12px;
        }
    }
</style>
