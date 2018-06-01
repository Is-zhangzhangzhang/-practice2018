<template>
    <div>
        <div class="body">
            <Menu @on-select="select">
                <menu-item name="1">
                    <Icon type="document-text"></Icon>
                    转换
                </menu-item>
                <menu-item name="2">
                    <Icon type="chatbubbles"></Icon>
                    步骤
                </menu-item>
                <menu-item name="3">
                    <Icon type="chatbubbles"></Icon>
                    运行
                </menu-item>
                <menu-item name="4">
                    <Icon type="chatbubbles"></Icon>
                    日志通道
                </menu-item>
                <menu-item name="5">
                    <Icon type="chatbubbles"></Icon>
                    Metrics
                </menu-item>
            </Menu>
            <div style="padding-left: 20px; width: 700px;">
                <div v-if="tab === '1'" class="table-top">
                    <Form :model="logData" :label-width="160">
                        <FormItem label="日志数据库连接：">
                            <Select style="width: 300px" v-model="logData['trans-log-table'].connection">
                                <Option value=""></Option>
                            </Select>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                            <Button type="primary" @click="newModalShow(true)">新建...</Button>
                        </FormItem>
                        <FormItem label="日志表模式：">
                            <Input v-model="logData['trans-log-table'].schema" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志表：">
                            <Input v-model="logData['trans-log-table'].table" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志记录间隔时间（秒）：">
                            <Input v-model="logData['trans-log-table'].interval" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志记录过时时间（天）：">
                            <Input v-model="logData['trans-log-table'].timeout_days" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="在内存中保存日志行数：">
                            <Input v-model="logData['trans-log-table'].size_limit_lines" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                    </Form>
                    <div class="transformLog">
                        <div>
                            <span>日志字段：</span>
                        </div>
                        <Table border ref="selection" height="300" :columns="transLogTableColumns"
                               :data="logData['trans-log-table'].field"></Table>
                        <new-modal v-if="this.newModal"></new-modal>
                    </div>
                </div>
                <div v-if="tab === '2'" class="table-top">
                    <Form :model="logData" :label-width="160">
                        <FormItem label="日志数据库连接：">
                            <Select style="width: 300px" v-model="logData['step-log-table'].connection">
                                <Option value=""></Option>
                            </Select>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                            <Button type="primary" @click="newModalShow(true)">新建...</Button>
                        </FormItem>
                        <FormItem label="日志表模式：">
                            <Input v-model="logData['step-log-table'].schema" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志表：">
                            <Input v-model="logData['step-log-table'].table" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志记录过时时间（天）：">
                            <Input v-model="logData['step-log-table'].timeout_days" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                    </Form>
                    <div class="transformLog">
                        <div>
                            <span>日志字段：</span>
                        </div>
                        <Table border ref="selection" height="300" :columns="stepLogTableColumns"
                               :data="logData['step-log-table'].field"></Table>
                        <new-modal v-if="this.newModal"></new-modal>
                    </div>
                </div>
                <div v-if="tab === '3'" class="table-top">
                    <Form :model="logData" :label-width="160">
                        <FormItem label="日志数据库连接：">
                            <Select style="width: 300px" v-model="logData['perf-log-table'].connection">
                                <Option value=""></Option>
                            </Select>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                            <Button type="primary" @click="newModalShow(true)">新建...</Button>
                        </FormItem>
                        <FormItem label="日志表模式：">
                            <Input v-model="logData['perf-log-table'].schema" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志表：">
                            <Input v-model="logData['perf-log-table'].table" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志记录间隔时间（秒）：">
                            <Input v-model="logData['perf-log-table'].interval" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志记录过时时间（天）：">
                            <Input v-model="logData['perf-log-table'].timeout_days" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="在内存中保存日志行数：">
                            <Input v-model="logData['perf-log-table'].size_limit_lines" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                    </Form>
                    <div class="transformLog">
                        <div>
                            <span>日志字段：</span>
                        </div>
                        <Table border height="300" :columns="prefLogTableColumns"
                               :data="logData['perf-log-table'].field"></Table>
                        <new-modal v-if="this.newModal"></new-modal>
                    </div>
                </div>
                <div v-if="tab === '4'" class="table-top">
                    <Form :model="logData" :label-width="160">
                        <FormItem label="日志数据库连接：">
                            <Select style="width: 300px" v-model="logData['channel-log-table'].connection">
                                <Option value=""></Option>
                            </Select>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                            <Button type="primary" @click="newModalShow(true)">新建...</Button>
                        </FormItem>
                        <FormItem label="日志表模式：">
                            <Input v-model="logData['channel-log-table'].schema" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志表：">
                            <Input v-model="logData['channel-log-table'].table" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志记录过时时间（天）：">
                            <Input v-model="logData['channel-log-table'].timeout_days" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                    </Form>
                    <div class="transformLog">
                        <div>
                            <span>日志字段：</span>
                        </div>
                        <Table border ref="selection" height="300" :columns="channelLogTableColumns"
                               :data="logData['channel-log-table'].field"></Table>
                        <new-modal v-if="this.newModal"></new-modal>
                    </div>
                </div>
                <div v-if="tab === '5'" class="table-top">
                    <Form :model="logData" :label-width="160">
                        <FormItem label="日志数据库连接：">
                            <Select style="width: 300px" v-model="logData['metrics-log-table'].connection">
                                <Option value=""></Option>
                            </Select>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                            <Button type="primary" @click="newModalShow(true)">新建...</Button>
                        </FormItem>
                        <FormItem label="日志表模式：">
                            <Input v-model="logData['metrics-log-table'].schema" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志表：">
                            <Input v-model="logData['metrics-log-table'].table" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="日志记录过时时间（天）：">
                            <Input v-model="logData['metrics-log-table'].timeout_days" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                    </Form>
                    <div class="transformLog">
                        <div>
                            <span>日志字段：</span>
                        </div>
                        <Table border ref="selection" height="300" :columns="metricsLogTableColumns"
                               :data="logData['metrics-log-table'].field"></Table>
                        <new-modal v-if="this.newModal"></new-modal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {mapState} from 'vuex';
    import newModal from '../../core/database/DatabaseConnectDialog';

    export default {
        props: ['logData'],
        components: {
            newModal
        },
        data () {
            return {
                modal: false,
                editData: {
                    name: ''
                },
                tab: '1',
                transLogTableColumns: [
                    {
                        width: 60,
                        title: '启用',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        trueValue: 'Y',
                                        falseValue: 'N',
                                        value: this.logData['trans-log-table'].field[params.index].enabled
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.logData['trans-log-table'].field[params.index].enabled = event;
                                        }
                                    },
                                    style: {
                                        marginRight: '0'
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '字段名称',
                        key: 'id'
                    },
                    {
                        title: 'Step name',
                        key: 'subject'
                    },
                    {
                        title: '字段描述',
                        key: 'description'
                    }
                ],
                stepLogTableColumns: [
                    {
                        width: 60,
                        title: '启用',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        trueValue: 'Y',
                                        falseValue: 'N',
                                        value: this.logData['step-log-table'].field[params.index].enabled
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.logData['step-log-table'].field[params.index].enabled = event;
                                        }
                                    },
                                    style: {
                                        marginRight: '0'
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '字段名称',
                        key: 'id'
                    },
                    {
                        title: 'Step name',
                        key: 'subject'
                    },
                    {
                        title: '字段描述',
                        key: 'description'
                    }
                ],
                prefLogTableColumns: [
                    {
                        width: 60,
                        title: '启用',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        trueValue: 'Y',
                                        falseValue: 'N',
                                        value: this.logData['perf-log-table'].field[params.index].enabled
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.logData['perf-log-table'].field[params.index].enabled = event;
                                        }
                                    },
                                    style: {
                                        marginRight: '0'
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '字段名称',
                        key: 'id'
                    },
                    {
                        title: 'Step name',
                        key: 'subject'
                    },
                    {
                        title: '字段描述',
                        key: 'description'
                    }
                ],
                channelLogTableColumns: [
                    {
                        width: 60,
                        title: '启用',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        trueValue: 'Y',
                                        falseValue: 'N',
                                        value: this.logData['channel-log-table'].field[params.index].enabled
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.logData['channel-log-table'].field[params.index].enabled = event;
                                        }
                                    },
                                    style: {
                                        marginRight: '0'
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '字段名称',
                        key: 'id'
                    },
                    {
                        title: 'Step name',
                        key: 'subject'
                    },
                    {
                        title: '字段描述',
                        key: 'description'
                    }
                ],
                metricsLogTableColumns: [
                    {
                        width: 60,
                        title: '启用',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        trueValue: 'Y',
                                        falseValue: 'N',
                                        value: this.logData['metrics-log-table'].field[params.index].enabled
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.logData['metrics-log-table'].field[params.index].enabled = event;
                                        }
                                    },
                                    style: {
                                        marginRight: '0'
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '字段名称',
                        key: 'id'
                    },
                    {
                        title: 'Step name',
                        key: 'subject'
                    },
                    {
                        title: '字段描述',
                        key: 'description'
                    }
                ]
            };
        },
        computed: {
            ...mapState([
                'newModal'
            ])
        },
        methods: {
            ...mapMutations([
                'newModalShow'
            ]),
            select (e) {
                this.tab = e;
                console.log(e);
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            }
        }
    };
</script>

<style scoped>
    .body {
        display: flex;
        margin-top: 20px;
    }

    .table-top .item {
        padding-top: 10px;
    }

    .body {
        height: 682px;
    }

    .ivu-modal-footer {
        position: absolute;
        width: 100%;
        bottom: 0;
    }

    .foot {
        position: absolute;
        width: 100%;
        bottom: 78px;
        left: 230px;
    }

    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-radius: 0;
        background: #fff;
    }

    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-top: 1px solid #3399ff;
    }

    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .vertical-center-modal .ivu-modal {
        top: 0;
    }

    .ivu-form-item {
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .transformLog {
        margin-top: 30px;
    }

    .transformLog div {
        margin: 5px 0;
    }
</style>
