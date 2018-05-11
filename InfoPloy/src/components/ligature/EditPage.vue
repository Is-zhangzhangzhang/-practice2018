<template>
    <div>
        <Modal v-model="modal" :title="editData.name" class-name="vertical-center-modal" width="1000px">
            <Form :model="formItem" :label-width="300">
                <FormItem label="步骤名称">
                    <Input v-model="editData.name" style="width: 420px"/>
                </FormItem>
                <FormItem label="数据库连接">
                    <Select v-model="formItem.select" style="width: 200px">
                        <Option value="oracle">oracle</Option>
                        <Option value="mySQL">mySQL</Option>
                        <Option value="DB2">DB2</Option>
                        <Option value="Sybase">Sybase</Option>
                    </Select>
                    <Button @click="editDatabaseConnect">编辑...</Button>
                    <Button @click="newModal = true">新建...</Button>
                    <Button @click="wizardModal = true">Wizard...</Button>
                </FormItem>
                <FormItem label="SQL">
                    <Button @click="getsqlQuery">获取SQL查询语句...</Button>
                </FormItem>
                <FormItem>
                    <Input v-model="formItem.sqlQuery" type="textarea" style="width: 400px"/>
                    <Poptip trigger="hover" content="使用CTRL-ATL-SPACE选择一个变量" width="100px">
                        <Button type="ghost" shape="circle" icon="help"></Button>
                    </Poptip>
                </FormItem>
                <FormItem label="行1 列0">
                </FormItem>
                <FormItem label="允许简易转换">
                    <Checkbox v-model="single"></Checkbox>
                </FormItem>
                <FormItem label="替换SQL语句里的变量">
                    <Checkbox v-model="single1"></Checkbox>
                </FormItem>
                <FormItem label="从步骤插入数据">
                    <Select v-model="formItem.select" style="width: 420px">
                        <Option value="oracle">oracle</Option>
                        <Option value="mySQL">mySQL</Option>
                        <Option value="DB2">DB2</Option>
                        <Option value="Sybase">Sybase</Option>
                    </Select>
                </FormItem>
                <FormItem label="执行每一行？">
                    <Checkbox v-model="single2"></Checkbox>
                </FormItem>
                <FormItem label="记录数量限制">
                    <Input v-model="formItem.unregular" style="width: 400px"/>
                    <Poptip trigger="hover" content="使用CTRL-ATL-SPACE选择一个变量" width="100px">
                        <Button type="ghost" shape="circle" icon="help"></Button>
                    </Poptip>
                </FormItem>
            </Form>
            <div slot="footer" >
                <Button type="primary" icon="help" size="small" @click="help">Help</Button>
                <Button type="primary" size="small" @click="ok">确定(O)</Button>
                <Button primary="error" size="small" @click="isReview = true">预览(P)</Button>
                <Button type="ghost" size="small" @click="cancel">取消(C)</Button>
            </div>
        </Modal>
        <edit-database v-if="isEditDatabase" @okCallback="okCallbackExecute" @cancelCallback="cancelCallbackExecute" :editDatabase="isEditDatabase"></edit-database>
        <sql-query v-if="isGetsql" @cancelQuery="cancelQueryExecute" :getQuery="isGetsql"></sql-query>
        <Modal v-model="isReview" @on-ok="okReview" @on-cancel="cancelReview">
            <p slot="header">
                <Icon type="arrow-expand"></Icon>
                <span>输入预览记录数量</span>
            </p>
            <p>输入你想预览的记录数量：</p>
            <Input v-model="number"/>
        </Modal>
        <Modal v-model="isReviewData">
            <p slot="header">
                <Icon type="arrow-expand"></Icon>
                <span>预览数据</span>
            </p>
            <p>步骤 表输入 的数据 (1000 rows)</p>
            <Table :columns="columns3" :data="data3"></Table>
            <div slot="footer">
                <Button type="ghost" size="small" @click="cancelReviewData">关闭(C)</Button>
                <Button type="ghost" size="small" @click="isReviewLog = true">显示日志(L)</Button>
            </div>
        </Modal>
        <Modal v-model="isReviewLog">
            <p slot="header">
                <Icon type="arrow-expand"></Icon>
                <span>日志信息</span>
            </p>
            <p>日志信息</p>
            <div v-html="logMessage"></div>
        </Modal>
        <Modal v-model="helpMsg">
            <p slot="header">
                <Icon type="arrow-expand"></Icon>
                <span>Help for step 表输入</span>
            </p>
            <h3>表输入</h3>
            <div slot="footer"></div>
        </Modal>
        <newModal v-if="newModal" :newModal="newModal"></newModal>
        <wizardModal  v-if="wizardModal" :wizardModal="wizardModal"></wizardModal>
    </div>
</template>

<script>
    import editDatabase from '../table_input/EditDatabase';
    import sqlQuery from '../table_input/GetSQLQuery';
    import newModal from './../modal/New';
    import wizardModal from './../modal/Info';
    import { mapMutations } from 'vuex';
    import { mapState } from 'vuex';
    export default {
        name: 'editPage',
        // props: ['edit'],
        components: {
            editDatabase,
            sqlQuery,
            newModal,
            wizardModal
        },
        data () {
            return {
                number: 1000,
                newModal: false,
                wizardModal: false,
                isEditDatabase: false,
                isGetsql: false,
                isReview: false,
                isReviewData: false,
                isReviewLog: false,
                helpMsg: false,
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
                    modifyTime: 'Wed Apr 18 15:20:26 CST 2018',
                    sqlQuery: 'SELECT * FROM T_REPLICATE'
                },
                columns1: [
                    {
                        title: '#',
                        key: 'first'
                    },
                    {
                        title: '命名参数',
                        key: 'name'
                    },
                    {
                        title: '默认值',
                        key: 'default'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    }
                ],
                data1: [
                    {
                        first: '1',
                        name: '',
                        default: '',
                        description: ''
                    }
                ],
                columns2: [
                    {
                        title: '#',
                        key: 'first'
                    },
                    {
                        title: '数据库连接',
                        key: 'databaseLink'
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
                data2: [
                    {
                        first: '1',
                        databaseLink: '',
                        table: '',
                        field: ''
                    }
                ],
                columns3: [
                    {
                        title: '#',
                        key: 'first'
                    },
                    {
                        title: 'C1',
                        key: 'C1'
                    },
                    {
                        title: 'C2',
                        key: 'C2'
                    }
                ],
                data3: [
                    {
                        first: '1',
                        C1: '1.0',
                        C2: '1'
                    },
                    {
                        first: '2',
                        C1: '1.0',
                        C2: '1'
                    },
                    {
                        first: '3',
                        C1: '1.0',
                        C2: '1'
                    }
                ],
                logMessage: '2018/04/26 09:41:39 - Carte - Installing timer to purge stale objects after 1440 minutes.<br/>' +
                    '2018/04/26 09:44:12 - C:\\Users\\Huaxiang\\Desktop\\test.ktr : test - 为了转换解除补丁开始  [C:\\Users\\Huaxiang\\Desktop\\test.ktr : test]<br/>' +
                    '2018/04/26 09:44:13 - 表输入.0 - Finished reading query, closing connection.<br/>' +
                    '2018/04/26 09:44:13 - dummy.0 - 完成处理 (I=0, O=0, R=897, W=896, U=0, E=0)<br/>' +
                    '2018/04/26 09:44:13 - 表输入.0 - 完成处理 (I=1003, O=0, R=0, W=1001, U=0, E=0)<br/>' +
                    '2018/04/26 09:52:55 - C:\\Users\\Huaxiang\\Desktop\\test.ktr : test - 为了转换解除补丁开始  [C:\\Users\\Huaxiang\\Desktop\\test.ktr : test]<br/>' +
                    '2018/04/26 09:52:55 - 表输入.0 - Finished reading query, closing connection.<br/>' +
                    '2018/04/26 09:52:55 - dummy.0 - 完成处理 (I=0, O=0, R=890, W=889, U=0, E=0)<br/>' +
                    '2018/04/26 09:52:55 - 表输入.0 - 完成处理 (I=1003, O=0, R=0, W=1001, U=0, E=0)<br/>' +
                    '2018/04/26 10:48:28 - C:\\Users\\Huaxiang\\Desktop\\test.ktr : test - 为了转换解除补丁开始  [C:\\Users\\Huaxiang\\Desktop\\test.ktr : test]<br/>' +
                    '2018/04/26 10:48:28 - 表输入.0 - Finished reading query, closing connection.<br/>' +
                    '2018/04/26 10:48:28 - dummy.0 - 完成处理 (I=0, O=0, R=900, W=899, U=0, E=0)<br/>' +
                    '2018/04/26 10:48:28 - 表输入.0 - 完成处理 (I=1003, O=0, R=0, W=1001, U=0, E=0)<br/>' +
                    '2018/04/26 11:41:43 - C:\\Users\\Huaxiang\\Desktop\\test.ktr : test - 为了转换解除补丁开始  [C:\\Users\\Huaxiang\\Desktop\\test.ktr : test]<br/>'
            };
        },
        computed: {
            ...mapState(['edit'])
        },
        methods: {
            ...mapMutations(['show']),
            help () {
                this.helpMsg = true;
                // this.$emit('show', false);
            },
            ok () {
                this.show(false);
            },
            cancel () {
                this.show(false);
            },
            review () {
                this.isReview = true;
                // this.$emit('show', false);
            },
            editDatabaseConnect () {
                this.isEditDatabase = true;
                console.log('编辑数据库连接');
            },
            okCallbackExecute (value) {
                this.isEditDatabase = value;
                console.log(value);
            },
            cancelCallbackExecute (value) {
                this.isEditDatabase = value;
                console.log(value);
            },
            getsqlQuery (){
                this.isGetsql = true;
                console.log('获取SQL查询语句');
            },
            cancelQueryExecute (value) {
                this.isGetsql = value;
                console.log(value);
            },
            okReview () {
                console.log('确定还有一个弹框');
                this.isReviewData = true;
                // this.$emit('reviewShow', true);
            },
            cancelReview () {
                console.log('取消没有弹框');
                // this.$emit('reviewShow', false);
            },
            showReviewData () {
                this.isReviewLog = true;
                console.log('显示日志');
            },
            cancelReviewData () {
                console.log('关闭');
                this.isReviewData = false;
            },
            okReviewLog () {
                console.log('显示日志信息详情');
            },
            cancelReviewLog () {
                console.log('取消日志显示');
            }
        },
        mounted () {
            this.modal = this.edit.show;
            this.editData.name = this.edit.title;
        },
        watch: {
            modal (val, oldval) {
                if (oldval && !val){
                    this.show(false);
                }
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
    .ivu-form-item {
        margin-bottom: 10px;
    }
</style>
