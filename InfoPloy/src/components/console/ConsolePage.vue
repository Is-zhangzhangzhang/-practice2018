<template>
    <div class="consoleContainer">
        <div style="text-align: left;font-weight: 800;font-size: 18px;">执行结果</div>
        <Row :gutter="64">
            <i-col span="24" class="demo-tabs-style2">
                <Tabs type="card">
                    <TabPane label="日志">
                        <div class="consoleTab">
                            <Poptip trigger="hover" content="显示错误行" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="ios-information-outline"></Button>
                            </Poptip>
                            <Poptip trigger="hover" content="清除日志(C)" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="trash-a" @click="deleteLog"></Button>
                            </Poptip>
                            <Poptip trigger="hover" content="日志设置" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="gear-a" @click="setLog"></Button>
                            </Poptip>
                        </div>
                        <div v-html="message" style="overflow-y:auto; overflow-x:auto; height:160px; text-align: left; margin-left: 10px"></div>
                    </TabPane>
                    <TabPane label="执行历史">
                        <div class="consoleTab">
                            <Poptip trigger="hover" content="刷新" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="loop"></Button>
                            </Poptip>
                            <Poptip trigger="hover" content="重放" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="refresh"></Button>
                            </Poptip>
                            <Poptip trigger="hover" content="删除" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="trash-a"></Button>
                            </Poptip>
                            <Poptip trigger="hover" content="get more history" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="reply"></Button>
                            </Poptip>
                            <Poptip trigger="hover" content="get all history" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="reply-all"></Button>
                            </Poptip>
                        </div>
                        <Row :gutter="64">
                            <i-col span="24" class="demo-tabs-style2">
                                <Tabs type="card">
                                    <TabPane label="转换日志表">
                                        <Table :columns="columns1" :data="data1"></Table>
                                    </TabPane>
                                    <TabPane label="步骤日志表">
                                        <Table :columns="columns2" :data="data2"></Table>
                                    </TabPane>
                                    <TabPane label="日志通道日志表">
                                        <Table :columns="columns3" :data="data3"></Table>
                                    </TabPane>
                                    <TabPane label="Metrics log table">
                                        <Table :columns="columns4" :data="data4"></Table>
                                    </TabPane>
                                </Tabs>
                            </i-col>
                        </Row>
                    </TabPane>
                    <TabPane label="步骤度量">
                        <div class="consoleTab">
                            <Poptip trigger="hover" content="仅仅显示活动的步骤" placement="bottom-start" width="100px">
                                <Button type="ghost" shape="circle" icon="eye"></Button>
                            </Poptip>
                        </div>
                        <Table :columns="columns5" :data="data5"></Table>
                    </TabPane>
                    <TabPane label="性能图">
                        没有为这个转换收集到性能数据。<br/>
                        可以在开始转换后重试。<br/>
                        请记住要在转换配置对话框里配置性能监控。<br/>
                        <Button type="info" @click="setTransform">配置...</Button>
                    </TabPane>
                    <TabPane label="Metrics">暂无</TabPane>
                    <TabPane label="Preview data">
                        <div class="consoleTab">
                            <RadioGroup v-model="group">
                                <Radio label="one">
                                    <span>${TransPreview.FirstRows.Label}</span>
                                </Radio>
                                <Radio label="two">
                                    <span>${TransPreview.LastRows.Label}</span>
                                </Radio>
                                <Radio label="three">
                                    <span>${TransPreview.Off.Label}</span>
                                </Radio>
                            </RadioGroup>
                        </div>
                    </TabPane>
                </Tabs>
            </i-col>
        </Row>
        <setting-log v-if="isSetting" @okCallback="okCallbackExecute" @cancelCallback="cancelCallbackExecute" :setting="isSetting"></setting-log>
        <convert-properties v-if="isTransform" @okCallbackT="okCallbackTransform" @cancelCallbackT="cancelCallbackTransform" :transForm="isTransform"></convert-properties>
    </div>
</template>

<script>
    import settingLog from './SettingLog';
    import convertProperties from './Configuration';
    export default {
        components: {
            settingLog,
            convertProperties
        },
        data: function () {
            return {
                isSetting: false,
                isTransform: false,
                group: 'one',
                message: '2018/04/24 09:57:44 - Carte - Installing timer to purge stale objects after 1440 minutes.<br/>' +
                    '2018/04/24 10:00:17 - Spoon - Using legacy execution engine<br/>' +
                    '2018/04/24 10:00:17 - Spoon - 转换已经打开.<br/>' +
                    '2018/04/24 10:00:17 - Spoon - 正在打开转换 [test]...<br/>' +
                    '2018/04/24 10:00:17 - Spoon - 开始执行转换.<br/>' +
                    '2018/04/24 10:00:18 - test - 为了转换解除补丁开始  [test]<br/>' +
                    '2018/04/24 10:00:18 - 表输出.0 - Connected to database [orcl4] (commit=1000)<br/>' +
                    '2018/04/24 10:01:39 - 表输入.0 - linenr 50000<br/>' +
                    '2018/04/24 10:01:42 - 表输出.0 - linenr 50000<br/>' +
                    '2018/04/24 10:01:54 - 表输入.0 - linenr 100000<br/>' +
                    '2018/04/24 10:01:57 - 表输出.0 - linenr 100000<br/>' +
                    '2018/04/24 10:02:09 - 表输入.0 - linenr 150000<br/>' +
                    '2018/04/24 10:02:12 - 表输出.0 - linenr 150000<br/>' +
                    '2018/04/24 10:02:24 - 表输入.0 - linenr 200000<br/>' +
                    '2018/04/24 10:02:26 - 表输出.0 - linenr 200000<br/>' +
                    '2018/04/24 10:02:38 - 表输入.0 - linenr 250000<br/>' +
                    '2018/04/24 10:02:41 - 表输出.0 - linenr 250000<br/>' +
                    '2018/04/24 10:02:54 - 表输入.0 - linenr 300000<br/>' +
                    '2018/04/24 10:02:57 - 表输出.0 - linenr 300000<br/>' +
                    '2018/04/24 10:03:09 - 表输入.0 - linenr 350000<br/>' +
                    '2018/04/24 10:03:13 - 表输出.0 - linenr 350000<br/>' +
                    '2018/04/24 10:03:25 - 表输入.0 - linenr 400000<br/>' +
                    '2018/04/24 10:03:28 - 表输出.0 - linenr 400000<br/>' +
                    '2018/04/24 10:03:40 - 表输入.0 - linenr 450000<br/>' +
                    '2018/04/24 10:03:43 - 表输出.0 - linenr 450000<br/>' +
                    '2018/04/24 10:03:55 - 表输入.0 - linenr 500000<br/>' +
                    '2018/04/24 10:03:59 - 表输出.0 - linenr 500000<br/>' +
                    '2018/04/24 10:04:13 - 表输入.0 - linenr 550000<br/>' +
                    '2018/04/24 10:04:16 - 表输出.0 - linenr 550000<br/>' +
                    '2018/04/24 10:04:31 - 表输入.0 - linenr 600000<br/>' +
                    '2018/04/24 10:04:34 - 表输出.0 - linenr 600000<br/>' +
                    '2018/04/24 10:04:48 - 表输入.0 - linenr 650000<br/>' +
                    '2018/04/24 10:04:52 - 表输出.0 - linenr 650000<br/>' +
                    '2018/04/24 10:05:05 - 表输入.0 - linenr 700000<br/>' +
                    '2018/04/24 10:05:09 - 表输出.0 - linenr 700000<br/>' +
                    '2018/04/24 10:05:21 - 表输入.0 - linenr 750000<br/>' +
                    '2018/04/24 10:05:25 - 表输出.0 - linenr 750000<br/>' +
                    '2018/04/24 10:05:37 - 表输入.0 - linenr 800000<br/>' +
                    '2018/04/24 10:05:40 - 表输出.0 - linenr 800000<br/>' +
                    '2018/04/24 10:05:53 - 表输入.0 - linenr 850000<br/>' +
                    '2018/04/24 10:05:56 - 表输出.0 - linenr 850000<br/>' +
                    '2018/04/24 10:06:09 - 表输入.0 - linenr 900000<br/>' +
                    '2018/04/24 10:06:12 - 表输出.0 - linenr 900000<br/>' +
                    '2018/04/24 10:06:24 - 表输入.0 - linenr 950000<br/>' +
                    '2018/04/24 10:06:27 - 表输出.0 - linenr 950000<br/>' +
                    '2018/04/24 10:06:39 - 表输入.0 - linenr 1000000<br/>' +
                    '2018/04/24 10:06:42 - 表输出.0 - linenr 1000000<br/>' +
                    '2018/04/24 10:06:53 - 表输入.0 - Finished reading query, closing connection.<br/>' +
                    '2018/04/24 10:06:53 - 表输入.0 - 完成处理 (I=1048577, O=0, R=0, W=1048577, U=0, E=0)<br/>' +
                    '2018/04/24 10:06:56 - 表输出.0 - 完成处理 (I=0, O=1048577, R=1048577, W=1048577, U=0, E=0)<br/>' +
                    '2018/04/24 10:06:56 - Spoon - 转换完成!!',
                columns1: [
                    {
                        title: '#',
                        key: '#'
                    },
                    {
                        title: '批次ID',
                        key: 'batchId'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '读',
                        key: 'read'
                    },
                    {
                        title: '写',
                        key: 'write'
                    },
                    {
                        title: '更新',
                        key: 'update'
                    },
                    {
                        title: '输入',
                        key: 'input'
                    },
                    {
                        title: '输出',
                        key: 'output'
                    },
                    {
                        title: '舍弃',
                        key: 'abandon'
                    },
                    {
                        title: '错误',
                        key: 'error'
                    },
                    {
                        title: '启动日期',
                        key: 'startdate'
                    },
                    {
                        title: '结束日期',
                        key: 'enddate'
                    },
                    {
                        title: '日志日期',
                        key: 'logdate'
                    },
                    {
                        title: '依赖日期',
                        key: 'dependentdate'
                    },
                    {
                        title: '启动时间',
                        key: 'releasetime'
                    }
                ],
                data1: [
                    {
                        batchId: '',
                        status: ''
                    }
                ],
                columns2: [
                    {
                        title: '#',
                        key: '#'
                    },
                    {
                        title: '批次ID',
                        key: 'batchId'
                    },
                    {
                        title: '日志日期',
                        key: 'logdate'
                    },
                    {
                        title: '转换名称',
                        key: 'transformname'
                    },
                    {
                        title: '步骤名称',
                        key: 'stepname'
                    },
                    {
                        title: '复制',
                        key: 'copy'
                    },
                    {
                        title: '读',
                        key: 'read'
                    },
                    {
                        title: '写',
                        key: 'write'
                    },
                    {
                        title: '更新',
                        key: 'update'
                    },
                    {
                        title: '输入',
                        key: 'input'
                    },
                    {
                        title: '输出',
                        key: 'output'
                    },
                    {
                        title: '舍弃',
                        key: 'abandon'
                    },
                    {
                        title: '错误',
                        key: 'error'
                    }
                ],
                data2: [
                    {
                        batchId: '',
                        read: ''
                    }
                ],
                columns3: [
                    {
                        title: '#',
                        key: '#'
                    },
                    {
                        title: '批次ID',
                        key: 'batchId'
                    },
                    {
                        title: '通道ID',
                        key: 'channeId'
                    },
                    {
                        title: '日志日期',
                        key: 'logdate'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '复制',
                        key: 'copy'
                    },
                    {
                        title: '目录',
                        key: 'list'
                    },
                    {
                        title: '文件名',
                        key: 'filename'
                    },
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '修订',
                        key: 'revision'
                    },
                    {
                        title: '父通道ID',
                        key: 'parentchannelid'
                    },
                    {
                        title: '根通道ID',
                        key: 'rootchannelid'
                    }
                ],
                data3: [
                    {
                        batchId: '',
                        id: ''
                    }
                ],
                columns4: [
                    {
                        title: '#',
                        key: '#'
                    },
                    {
                        title: 'BatchID',
                        key: 'batchId'
                    },
                    {
                        title: 'channelID',
                        key: 'channelId'
                    },
                    {
                        title: 'Log date',
                        key: 'logdate'
                    },
                    {
                        title: 'Metric date',
                        key: 'metricdate'
                    },
                    {
                        title: 'Description',
                        key: 'description'
                    },
                    {
                        title: 'Subject',
                        key: 'subject'
                    },
                    {
                        title: 'Metric type',
                        key: 'metrictype'
                    },
                    {
                        title: 'Metric value',
                        key: 'metricvalue'
                    }
                ],
                data4: [
                    {
                        batchId: '',
                        subject: ''
                    }
                ],
                columns5: [
                    {
                        title: '#',
                        key: 'first'
                    },
                    {
                        title: '步骤名称',
                        key: 'stepname'
                    },
                    {
                        title: '复制的记录行数',
                        key: 'copyRows'
                    },
                    {
                        title: '读',
                        key: 'read'
                    },
                    {
                        title: '写',
                        key: 'write'
                    },
                    {
                        title: '输入',
                        key: 'input'
                    },
                    {
                        title: '输出',
                        key: 'output'
                    },
                    {
                        title: '更新',
                        key: 'update'
                    },
                    {
                        title: '拒绝',
                        key: 'refuse'
                    },
                    {
                        title: '错误',
                        key: 'error'
                    },
                    {
                        title: '激活',
                        key: 'activate'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '速度(条记录/秒)',
                        key: 'speed'
                    },
                    {
                        title: 'Pri/in/out',
                        key: 'pri'
                    }
                ],
                data5: [
                    {
                        first: '1',
                        stepname: '表输入',
                        copyRows: '0',
                        read: '0',
                        write: '1048577',
                        input: '1048577',
                        output: '0',
                        update: '0',
                        refuse: '0',
                        error: '0',
                        activate: '已完成',
                        time: '6mn 35s',
                        speed: '2655',
                        pri: '-'
                    },
                    {
                        first: '2',
                        stepname: '表输出',
                        copyRows: '0',
                        read: '1048577',
                        write: '1048577',
                        input: '0',
                        output: '1048577',
                        update: '0',
                        refuse: '0',
                        error: '0',
                        activate: '已完成',
                        time: '6mn 38s',
                        speed: '2633',
                        pri: '-'
                    }
                ]
            };
        },
        methods: {
            deleteLog () {
                this.message = '';
            },
            setLog () {
                this.isSetting = true;
                console.log('日志设置');
            },
            okCallbackExecute (value) {
                this.isSetting = value;
                console.log(value);
            },
            cancelCallbackExecute (value) {
                this.isSetting = value;
                console.log(value);
            },
            setTransform () {
                this.isTransform = true;
                console.log('转换属性');
            },
            okCallbackTransform (value) {
                this.isTransform = value;
                console.log(value);
            },
            cancelCallbackTransform (value) {
                this.isTransform = value;
                console.log(value);
            }
        }
    };
</script>

<style>
    .consoleContainer {
        height: 260px;
    }
    .consoleTab {
        text-align: left;
        margin-top: 6px;
        margin-bottom: 6px;
        margin-left: 4px;
    }
</style>
