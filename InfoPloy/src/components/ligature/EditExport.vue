<template>
    <div>
        <Modal
            v-model="modal"
            :title="editData.name"
            class-name="vertical-center-modal"
            width="700px">
            <div class="table-top">
                <div class="item">
                    <span>步骤名称</span>
                    <Input placeholder="Enter something..." style="width: 518px"/>
                </div>
                <div class="item">
                    <span>数据库连接</span>
                    <Select v-model="model1" style="width:295px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button @click="newModal = true">编辑...</Button>
                    <Button @click="newModal = true">新建...</Button>
                    <Button @click="wizardModal = true">Wizard...</Button>
                </div>
                <div class="item">
                    <span>目标模式</span>
                    <Input placeholder="Enter something..." style="width: 400px"/>
                    <Tooltip content="Right Center text" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                    <Button  @click="instance('info')">浏览（B）...</Button>
                </div>
                <div class="item">
                    <span>目标表</span>
                    <Input placeholder="Enter something..." style="width: 400px"/>
                    <Tooltip content="Right Center text" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                    <Button  @click="instance('info')">浏览（B）...</Button>
                </div>
                <div class="item">
                    <span>提交记录数量</span>
                    <Input placeholder="1000" style="width: 500px"/>
                    <Tooltip content="Right Center text" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </div>
                <div class="item">
                    <span>裁剪表</span>
                    <span class="span">
                        <Checkbox></Checkbox>
                    </span>
                </div>
                <div class="item">
                    <span>忽略插入错误</span>
                    <span class="span">
                        <Checkbox disabled></Checkbox>
                    </span>
                </div>
                <div class="item">
                    <span>制定数据库字段</span>
                    <span class="span">
                        <Checkbox></Checkbox>
                    </span>
                </div>
            </div>
            <Tabs type="card">
                <TabPane label="标签一"  class="table-top">
                    <div class="item">
                        <span>表分区数据</span>
                        <span class="span">
                            <Checkbox disabled></Checkbox>
                        </span>
                    </div>
                    <div class="item">
                        <span>分区字段</span>
                        <Input placeholder="1000" style="width: 500px"/>
                        <Tooltip content="Right Center text" placement="left">
                            <Icon type="information-circled"></Icon>
                        </Tooltip>
                    </div>
                    <div class="item">
                        <span>每个月分区数据</span>
                        <span class="span">
                            <Radio checked></Radio>
                        </span>
                    </div>
                    <div class="item">
                        <span>每天分区数据</span>
                        <span class="span">
                            <Radio></Radio>
                        </span>
                    </div>
                    <div class="item">
                        <span>使用批量插入</span>
                        <span class="span">
                            <Checkbox checked></Checkbox>
                        </span>
                    </div>
                    <div class="item">
                        <span>表名定义在一个字段里？</span>
                        <span class="span">
                            <Checkbox></Checkbox>
                        </span>
                    </div>
                    <div class="item">
                        <span>包含表名的字段：</span>
                        <Input placeholder="1000" style="width: 500px"/>
                        <Tooltip content="Right Center text" placement="left">
                            <Icon type="information-circled"></Icon>
                        </Tooltip>
                    </div>
                    <div class="item">
                        <span>储蓄表名字段</span>
                        <span class="span">
                            <Checkbox></Checkbox>
                        </span>
                    </div>
                    <div class="item">
                        <span>返回一个自动产生的关键字</span>
                        <span class="span">
                            <Checkbox></Checkbox>
                        </span>
                    </div>
                    <div class="item">
                        <span>产生的关键字的字段名称：</span>
                        <Input placeholder="1000" style="width: 500px"/>
                        <Tooltip content="Right Center text" placement="left">
                            <Icon type="information-circled"></Icon>
                        </Tooltip>
                    </div>
                </TabPane>
                <TabPane label="标签二">
                    <Button>获取字段</Button>
                    <Button>输入字段映射</Button>
                    <br/>
                    插入的字段：
                    <Table border :columns="columns1" :data="data1"></Table>
                </TabPane>
            </Tabs>
            <div slot="footer" >
                <Button @click="instance('info')" size="small" icon="ios-help">Help</Button>
                <Button type="primary" size="small" @click="ok">确定</Button>
                <Button @click="instance('info')" size="small">SQL</Button>
                <Button type="ghost" size="small" @click="cancel">取消</Button>
            </div>
        </Modal>
        <newModal v-if="newModal" :newModal="newModal"></newModal>
        <wizardModal  v-if="wizardModal" :wizardModal="wizardModal"></wizardModal>
    </div>
</template>

<script>
    import newModal from './../modal/New';
    import wizardModal from './../modal/Info';
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    export default {
        name: 'editPage',
        components: {
            newModal,
            wizardModal
        },
        data () {
            return {
                modal: false,
                newModal: false,
                wizardModal: false,
                editData: {
                    name: ''
                },
                formItem: {
                    select: '',
                    filePath: '',
                    regular: '',
                    unregular: ''
                },
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            };
        },
        computed: {
            ...mapState([
                'edit'
            ])
        },
        methods: {
            ...mapMutations([
                'show'
            ]),
            ok () {
                this.show({ exportShow: 'exportShow', show: false});
            },
            cancel () {
                this.show({ exportShow: 'exportShow', show: false});
            },
            review () {
                this.show({ exportShow: 'exportShow', show: false});
            },
            getFilePath () {
                this.formItem.filePath = this.$refs.input.value;
            },
            instance (type) {
                const title = 'Title';
                const content = '<p>表输出</p>';
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
            }
        },
        mounted () {
            this.modal = this.edit.exportShow;
            this.editData.name = this.edit.title;
        },
        watch: {
            modal (val, oldval) {
                if (oldval && !val){
                    this.show({ tpye: 'exportShow', show: false});
                }
            }
        }

    };
</script>

<style scoped>
    .table-top{
        text-align: right;
    }
    .table-top .item{
        padding-top: 10px;
    }
    .table-top .item .span{
        display: inline-block;
        width: 513px;
        text-align: left;
    }
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
