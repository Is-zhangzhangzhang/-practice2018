<template>
    <div>
        <Modal v-model="modal" class-name="vertical-center-modal" width="800px">
            <p slot="header">
                <Icon type="arrow-shrink"></Icon>
                <span>转换属性</span>
            </p>
            <Row :gutter="64">
                <i-col span="24" class="demo-tabs-style2">
                    <Tabs type="card">
                        <TabPane label="转换">
                            <Form :model="formItem" :label-width="300">
                                <FormItem label="转换名称：">
                                    <Input v-model="info.name" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="转换文件">
                                    <Input style="width: 300px"/>
                                </FormItem>
                                <FormItem label="描述：">
                                    <Input v-model="info.description" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="扩展描述：">
                                    <Input v-model="info.extended_description" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="状态：">
                                    <Select v-model="info.trans_status">
                                        <Option value="1">草案</Option>
                                        <Option value="2">产品</Option>
                                        <Option value="0">&nbsp;</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="版本：">
                                    <Input v-model="info.trans_version" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="目录：">
                                    <Input v-model="info.directory" style="width: 200px"/>
                                    <Button><label for="review">浏览...</label></Button>
                                    <input type="file" name="review" id="review" v-show="false" @change="getDirectory" ref="input"/>
                                </FormItem>
                                <FormItem label="创建者">
                                    <Input v-model="formItem.creator" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="创建日期">
                                    <Input v-model="formItem.createTime" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="最近修改用户">
                                    <Input v-model="formItem.unregular" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="最近修改日期">
                                    <Input v-model="formItem.modifyTime" style="width: 300px"/>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="命名参数">
                            <div class="transformTab">
                                <span>命名参数：</span>
                                <Button type="dashed" icon="plus-round" size="large" @click="addTableItem">添加</Button>
                            </div>
                            <Table :columns="paramTableColumn" :data="info.parameters.parameter"></Table>
                        </TabPane>
                        <table-edit v-if="tableEditModal" :parameterList="info.parameters.parameter"></table-edit>
                        <TabPane label="日志">
                            <log :logData="info.log"></log>
                        </TabPane>
                        <TabPane label="日期">
                            <Form :model="formItem" :label-width="300">
                                <FormItem label="最大日期数据库连接：">
                                    <Select v-model="info.maxdate.connection" style="width:300px">
                                        <Option value="oracle">oracle</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="最大日期表：">
                                    <Input v-model="info.maxdate.table" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="最大日期字段：">
                                    <Input v-model="info.maxdate.field" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="最大日期偏移（秒）：">
                                    <Input v-model="info.maxdate.offset" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="最大日期区别（秒）：">
                                    <Input v-model="info.maxdate.maxdiff" style="width: 300px"/>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="依赖">
                            <div class="transformTab">
                                依赖：
                            </div>
                            <Table :columns="dependencyColumns" :data="info.dependencies.dependency"></Table>
                        </TabPane>
                        <TabPane label="杂项">
                            <Form :model="info" :label-width="300">
                                <FormItem label="记录集合里的记录数：">
                                    <Input v-model="info.size_rowset" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="转换时是否在日志中记录反馈">
                                    <Checkbox v-model="info.feedback_shown"></Checkbox>
                                </FormItem>
                                <FormItem label="每个反馈行的处理记录数">
                                    <Input v-model="info.feedback_size" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="使用唯一连接">
                                    <Checkbox v-model="info.unique_connections"></Checkbox>
                                </FormItem>
                                <FormItem label="共享对象文件">
                                    <Input v-model="info.shared_objects_file" style="width: 300px"/>
                                    <Poptip trigger="hover" content="使用CTRL-ATL-SPACE选择一个变量" width="100px">
                                        <Button type="ghost" shape="circle" icon="help"></Button>
                                    </Poptip>
                                </FormItem>
                                <FormItem label="管理线程优先级？">
                                    <Checkbox v-model="single3"></Checkbox>
                                </FormItem>
                                <FormItem label="转换引擎类型">
                                    <Select v-model="info.trans_type" placeholder="Normal" style="width: 300px">
                                        <Option value="Normal">Normal</Option>
                                        <Option value="SerialSingleThreaded">Serial Single Threaded (Experimental!)</Option>
                                        <Option value="SingleThreaded">Single Threaded (Designed for Hadoop)</Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="监控">
                            <Form :model="formItem" :label-width="300">
                                <FormItem label="开启步骤性能监控：">
                                    <Checkbox v-model="info.capture_step_performance"></Checkbox>
                                </FormItem>
                                <FormItem label="步骤性能测量间隔：">
                                    <Input v-model="info.step_performance_capturing_delay" style="width: 300px"/>
                                </FormItem>
                                <FormItem label="内存中最大的快照数量：">
                                    <Input v-model="info.step_performance_capturing_size_limit" style="width: 200px"/>
                                    <Poptip trigger="hover" content="使用CTRL-ATL-SPACE选择一个变量" width="100px">
                                        <Button type="ghost" shape="circle" icon="help"></Button>
                                    </Poptip>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </i-col>
            </Row>
            <div slot="footer" >
                <Button type="primary" size="small" @click="ok">确定</Button>
                <Button @click="instance('info')" size="small">SQL</Button>
                <Button type="ghost" size="small" @click="cancel">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    import tableEdit from '../modal/TableEdit';
    import log from '../modal/configurationLog';

    export default {
        components: {
            tableEdit,
            log
        },
        data: function () {
            return {
                modal: false,
                single: false,
                single1: false,
                single2: false,
                single3: false,
                editData: {
                    name: ''
                },
                formItem: {
                    select: '',
                    filePath: '',
                    regular: '',
                    unregular: '',
                    creator: '-',
                    createTime: 'Wed Apr 18 15:20:26 CST 2018',
                    modifyTime: 'Wed Apr 18 15:20:26 CST 2018'
                },
                paramTableColumn: [
                    {
                        title: '#',
                        type: 'index',
                        key: 'first'
                    },
                    {
                        title: '命名参数',
                        key: 'name'
                    },
                    {
                        title: '默认值',
                        key: 'defaultValue'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log('click table edit');
                                            this.tableEditShow(true);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delTransformParamTableItem(params.index);
                                            console.log('click table delte');
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                dependencyColumns: [
                    {
                        type: 'index',
                        title: '#',
                        key: 'first'
                    },
                    {
                        title: '数据库连接',
                        key: 'connection'
                    },
                    {
                        title: '表',
                        key: 'table'
                    },
                    {
                        title: 'Field',
                        key: 'field'
                    }
                ],
                info: {
                    name: '',
                    description: '',
                    extended_description: '',
                    trans_version: '',
                    trans_type: '',
                    trans_status: '',
                    directory: '',
                    parameters: {
                        parameter: [
                            {
                                name: '1',
                                defaultValue: '1',
                                description: '1'
                            }
                        ]
                    },
                    log: {
                        'trans-log-table': {
                            connections: '',
                            schema: 'schema',
                            table: '',
                            size_limit_lines: '',
                            interval: '',
                            timeout_days: '',
                            field: [
                                {
                                    id: 'start',
                                    enable: 'Y',
                                    _checked: true,
                                    name: 'ID_BATCH'
                                },
                                {
                                    id: 'CHANNEL_ID',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'CHANNEL_ID'
                                },
                                {
                                    id: 'TRANSNAME',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'TRANSNAME'
                                },
                                {
                                    id: 'STATUS',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'STATUS'
                                },
                                {
                                    id: 'LINES_READ',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'LINES_READ',
                                    subject: 'step name'
                                },
                                {
                                    id: 'LINES_WRITTEN',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'LINES_WRITTEN',
                                    subject: ''
                                },
                                {
                                    id: 'LINES_UPDATED',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'LINES_UPDATED',
                                    subject: ''
                                },
                                {
                                    id: 'LINES_INPUT',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'LINES_INPUT',
                                    subject: ''
                                },
                                {
                                    id: 'LINES_OUTPUT',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'LINES_OUTPUT',
                                    subject: ''
                                },
                                {
                                    id: 'LINES_REJECTED',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'LINES_REJECTED',
                                    subject: ''
                                },
                                {
                                    id: 'ERRORS',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'ERRORS'
                                },
                                {
                                    id: 'STARTDATE',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'STARTDATE'
                                },
                                {
                                    id: 'ENDDATE',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'ENDDATE'
                                },
                                {
                                    id: 'LOGDATE',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'LOGDATE'
                                },
                                {
                                    id: 'DEPDATE',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'DEPDATE'
                                },
                                {
                                    id: 'REPLAYDATE',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'REPLAYDATE'
                                },
                                {
                                    id: 'LOG_FIELD',
                                    enabled: 'Y',
                                    _checked: true,
                                    name: 'LOG_FIELD'
                                },
                                {
                                    id: 'EXECUTING_SERVER',
                                    enabled: 'N',
                                    _checked: true,
                                    name: 'EXECUTING_SERVER'
                                },
                                {
                                    id: 'EXECUTING_USER',
                                    enabled: 'N',
                                    _checked: true,
                                    name: 'EXECUTING_USER'
                                },
                                {
                                    id: 'CLIENT',
                                    enabled: 'N',
                                    _checked: false,
                                    name: 'CLIENT'
                                }
                            ]
                        },
                        'step-log-table': {
                            connection: '',
                            schema: '',
                            table: '',
                            timeout_days: '',
                            field: [
                                {
                                    id: 'ID_BATCH',
                                    enabled: 'Y',
                                    name: 'ID_BATCH'
                                },
                                {
                                    id: 'CHANNEL_ID',
                                    enabled: 'Y',
                                    name: 'CHANNEL_ID'
                                },
                                {
                                    id: 'LOG_DATE',
                                    enabled: 'Y',
                                    name: 'LOG_DATE'
                                },
                                {
                                    id: 'TRANSNAME',
                                    enabled: 'Y',
                                    name: 'TRANSNAME'
                                },
                                {
                                    id: 'STEPNAME',
                                    enabled: 'Y',
                                    name: 'STEPNAME'
                                },
                                {
                                    id: 'STEP_COPY',
                                    enabled: 'Y',
                                    name: 'STEP_COPY'
                                },
                                {
                                    id: 'LINES_READ',
                                    enabled: 'Y',
                                    name: 'LINES_READ'
                                },
                                {
                                    id: 'LINES_WRITTEN',
                                    enabled: 'Y',
                                    name: 'LINES_WRITTEN'
                                },
                                {
                                    id: 'LINES_UPDATED',
                                    enabled: 'Y',
                                    name: 'LINES_UPDATED'
                                },
                                {
                                    id: 'LINES_INPUT',
                                    enabled: 'Y',
                                    name: 'LINES_INPUT'
                                },
                                {
                                    id: 'LINES_OUTPUT',
                                    enabled: 'Y',
                                    name: 'LINES_OUTPUT'
                                },
                                {
                                    id: 'LINES_REJECTED',
                                    enabled: 'Y',
                                    name: 'LINES_REJECTED'
                                },
                                {
                                    id: 'ERRORS',
                                    enabled: 'Y',
                                    name: 'ERRORS'
                                },
                                {
                                    id: 'LOG_FIELD',
                                    enabled: 'N',
                                    name: 'LOG_FIELD'
                                }
                            ]
                        },
                        'perf-log-table': {
                            connection: '',
                            schema: '',
                            table: '',
                            interval: '',
                            timeout_days: '',
                            field: [
                                {
                                    id: 'ID_BATCH',
                                    enabled: 'Y',
                                    name: 'ID_BATCH'
                                },
                                {
                                    id: 'SEQ_NR',
                                    enabled: 'Y',
                                    name: 'SEQ_NR'
                                },
                                {
                                    id: 'LOGDATE',
                                    enabled: 'Y',
                                    name: 'LOGDATE'
                                },
                                {
                                    id: 'TRANSNAME',
                                    enabled: 'Y',
                                    name: 'TRANSNAME'
                                },
                                {
                                    id: 'STEPNAME',
                                    enabled: 'Y',
                                    name: 'STEPNAME'
                                },
                                {
                                    id: 'STEP_COPY',
                                    enabled: 'Y',
                                    name: 'STEP_COPY'
                                },
                                {
                                    id: 'LINES_READ',
                                    enabled: 'Y',
                                    name: 'LINES_READ'
                                },
                                {
                                    id: 'LINES_WRITTEN',
                                    enabled: 'Y',
                                    name: 'LINES_WRITTEN'
                                },
                                {
                                    id: 'LINES_UPDATED',
                                    enabled: 'Y',
                                    name: 'LINES_UPDATED'
                                },
                                {
                                    id: 'LINES_INPUT',
                                    enabled: 'Y',
                                    name: 'LINES_INPUT'
                                },
                                {
                                    id: 'LINES_OUTPUT',
                                    enabled: 'Y',
                                    name: 'LINES_OUTPUT'
                                },
                                {
                                    id: 'LINES_REJECTED',
                                    enabled: 'Y',
                                    name: 'LINES_REJECTED'
                                },
                                {
                                    id: 'ERRORS',
                                    enabled: 'Y',
                                    name: 'ERRORS'
                                },
                                {
                                    id: 'INPUT_BUFFER_ROWS',
                                    enabled: 'Y',
                                    name: 'INPUT_BUFFER_ROWS'
                                },
                                {
                                    id: 'OUTPUT_BUFFER_ROWS',
                                    enabled: 'Y',
                                    name: 'OUTPUT_BUFFER_ROWS'
                                }
                            ]
                        },
                        'channel-log-table': {
                            connection: '',
                            schema: '',
                            table: '',
                            timeout_days: '',
                            field: [
                                {
                                    id: 'ID_BATCH',
                                    enabled: 'Y',
                                    name: 'ID_BATCH'
                                },
                                {
                                    id: 'CHANNEL_ID',
                                    enabled: 'Y',
                                    name: 'CHANNEL_ID'
                                },
                                {
                                    id: 'LOG_DATE',
                                    enabled: 'Y',
                                    name: 'LOG_DATE'
                                },
                                {
                                    id: 'LOGGING_OBJECT_TYPE',
                                    enabled: 'Y',
                                    name: 'LOGGING_OBJECT_TYPE'
                                },
                                {
                                    id: 'OBJECT_NAME',
                                    enabled: 'Y',
                                    name: 'OBJECT_NAME'
                                },
                                {
                                    id: 'OBJECT_COPY',
                                    enabled: 'Y',
                                    name: 'OBJECT_COPY'
                                },
                                {
                                    id: 'REPOSITORY_DIRECTORY',
                                    enabled: 'Y',
                                    name: 'REPOSITORY_DIRECTORY'
                                },
                                {
                                    id: 'FILENAME',
                                    enabled: 'Y',
                                    name: 'FILENAME'
                                },
                                {
                                    id: 'OBJECT_ID',
                                    enabled: 'Y',
                                    name: 'OBJECT_ID'
                                },
                                {
                                    id: 'OBJECT_REVISION',
                                    enabled: 'Y',
                                    name: 'OBJECT_REVISION'
                                },
                                {
                                    id: 'PARENT_CHANNEL_ID',
                                    enabled: 'Y',
                                    name: 'PARENT_CHANNEL_ID'
                                },
                                {
                                    id: 'ROOT_CHANNEL_ID',
                                    enabled: 'Y',
                                    name: 'ROOT_CHANNEL_ID'
                                }
                            ]
                        },
                        'metrics-log-table': {
                            connection: '',
                            schema: '',
                            table: '',
                            timeout_days: '',
                            field: [
                                {
                                    id: 'ID_BATCH',
                                    enabled: 'Y',
                                    name: 'ID_BATCH'
                                },
                                {
                                    id: 'CHANNEL_ID',
                                    enabled: 'Y',
                                    name: 'CHANNEL_ID'
                                },
                                {
                                    id: 'LOG_DATE',
                                    enabled: 'Y',
                                    name: 'LOG_DATE'
                                },
                                {
                                    id: 'METRICS_DATE',
                                    enabled: 'Y',
                                    name: 'METRICS_DATE'
                                },
                                {
                                    id: 'METRICS_CODE',
                                    enabled: 'Y',
                                    name: 'METRICS_CODE'
                                },
                                {
                                    id: 'METRICS_DESCRIPTION',
                                    enabled: 'Y',
                                    name: 'METRICS_DESCRIPTION'
                                },
                                {
                                    id: 'METRICS_SUBJECT',
                                    enabled: 'Y',
                                    name: 'METRICS_SUBJECT'
                                },
                                {
                                    id: 'METRICS_TYPE',
                                    enabled: 'Y',
                                    name: 'METRICS_TYPE'
                                },
                                {
                                    id: 'METRICS_VALUE',
                                    enabled: 'Y',
                                    name: 'METRICS_VALUE'
                                }
                            ]
                        }
                    },
                    maxdate: {
                        connection: '',
                        table: '',
                        field: '',
                        offset: '0.0',
                        maxdiff: '0.0'
                    },
                    dependencies: {
                        dependency: [
                            {
                                connection: '依赖连接',
                                table: '依赖表',
                                field: '依赖字段'
                            }
                        ]
                    },
                    size_rowset: '10000',
                    feedback_shown: 'Y',
                    feedback_size: '50000',
                    unique_connections: 'N',
                    shared_objects_file: '',
                    using_thread_priorities: 'Y',
                    capture_step_performance: 'N',
                    step_performance_capturing_delay: '1000',
                    step_performance_capturing_size_limit: '100',
                    created_user: '',
                    created_date: '',
                    modified_user: '',
                    modified_date: '',
                    key_for_session_key: '',
                    is_key_private: 'Y'
                }
            };
        },
        computed: {
            ...mapState([
                'changeShow',
                'tableEditModal'
            ])
        },
        methods: {
            ...mapMutations([
                'okCallbackTransform',
                'tableEditShow'
            ]),
            ok () {
                this.okCallbackTransform(false);
            },
            cancel () {
                this.okCallbackTransform(false);
            },
            getDirectory () {
                this.info.directory = this.$refs.input.value;
            },
            instance (type) {
                const title = '正常！';
                const content = '<p>不需要执行sql，日志表看起来很好！</p>';
                switch (type) {
                case 'info':
                    this.$Modal.info({
                        title: title,
                        content: content
                    });
                    break;
                default:
                    this.$Modal.error({
                        title: title,
                        content: content
                    });
                    break;
                }
            },
            addTableItem () {
                this.tableEditShow(true);
            },
            delTransformParamTableItem (index) {
                this.info.parameters.parameter.splice(index, 1);
                console.log(this.info.parameters.parameter);
            }
        },
        mounted () {
            this.modal = this.changeShow;
        },
        watch: {
            modal (val, oldval) {
                if (oldval && !val){
                    this.okCallbackTransform(false);
                }
            },
            info: {
                handler (newVal) {
                    console.log(newVal);
                },
                deep: true
            }
        }

    };
</script>

<style scoped>
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
    .transformTab {
        text-align: left;
        margin-top: 6px;
        margin-bottom: 6px;
        margin-left: 4px;
        text-align: right;
        position: relative;
    }
    .transformTab span {
        float: left;
        padding: 10px 0;
    }
    .ivu-form-item {
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style>
