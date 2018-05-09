<template>
    <div>
        <Modal
            v-model="modal"
            class-name="vertical-center-modal"
            width="700px">
            <p slot="header">
                <Icon type="soup-can-outline"></Icon>
                <span>数据库连接</span>
            </p>
            <div class="body">
                <Menu @on-select="select">
                    <menu-item name="1">
                        <Icon type="document-text"></Icon>
                        一般
                    </menu-item>
                    <menu-item name="2">
                        <Icon type="chatbubbles"></Icon>
                        高级
                    </menu-item>
                    <menu-item name="3">
                        <Icon type="chatbubbles"></Icon>
                        选项
                    </menu-item>
                    <menu-item name="4">
                        <Icon type="chatbubbles"></Icon>
                        连接池
                    </menu-item>
                    <menu-item name="5">
                        <Icon type="chatbubbles"></Icon>
                        集群
                    </menu-item>
                </Menu>
                <div style="padding-left: 20px; width: 700px;">
                    <div v-if="tab === '1'" class="table-top">
                        <div class="item">
                            <div>连接名称：</div>
                            <Input type="text"  placeholder="Enter something..." style="width: 500px"/>
                        </div>
                        连接类型：
                        <div style="display: flex">
                            <div>
                                <Menu>
                                    <menu-item name="1">
                                        Apache Derby
                                    </menu-item>
                                    <menu-item name="2">
                                        Borland Interbase
                                    </menu-item>
                                    <menu-item name="3">
                                        Calpont infiniDB
                                    </menu-item>
                                    <menu-item name="4">
                                        Exasol2
                                    </menu-item>
                                    <menu-item name="5">
                                        H2
                                    </menu-item>
                                </Menu>
                                连接方式：
                                <Menu>
                                    <menu-item name="1">
                                        Native(JDBC)
                                    </menu-item>
                                    <menu-item name="2">
                                        ODBC
                                    </menu-item>
                                    <menu-item name="3">
                                        JNDI
                                    </menu-item>
                                </Menu>
                            </div>
                            设置
                            <br/>
                            <div>
                                <div class="item">
                                    <div>主机名称：</div>
                                    <Input placeholder="1000" style="width: 200px"/>
                                    <Tooltip content="Right Center text" placement="top">
                                        <Icon type="information-circled"></Icon>
                                    </Tooltip>
                                </div>
                                <div class="item">
                                    <div>数据库名称：</div>
                                    <Input placeholder="1000" style="width: 200px"/>
                                    <Tooltip content="Right Center text" placement="top">
                                        <Icon type="information-circled"></Icon>
                                    </Tooltip>
                                </div>
                                <div class="item">
                                    <div>端口号：</div>
                                    <Input placeholder="1000" style="width: 200px"/>
                                    <Tooltip content="Right Center text" placement="top">
                                        <Icon type="information-circled"></Icon>
                                    </Tooltip>
                                </div>
                                <div class="item">
                                    <div>用户名：</div>
                                    <Input placeholder="1000" style="width: 200px"/>
                                    <Tooltip content="Right Center text" placement="top">
                                        <Icon type="information-circled"></Icon>
                                    </Tooltip>
                                </div>
                                <div class="item">
                                    <div>密码：</div>
                                    <Input placeholder="1000" style="width: 200px"/>
                                    <Tooltip content="Right Center text" placement="top">
                                        <Icon type="information-circled"></Icon>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tab === '2'" class="table-top">
                        标识符
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>支持布尔数据类型</span>
                        </div>
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>Supports the timestamp data type</span>
                        </div>
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>标识符使用引号括起来</span>
                        </div>
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>强制标识符使用小写字母</span>
                        </div>
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>强制标识符使用大写字母</span>
                        </div>
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>Preserve case of reserved words</span>
                        </div>
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>Strict NUMBER(38) Interpertation(For Oracle db only)</span>
                        </div>
                        <div class="item">
                            <span>默认模式名称，在没有其他模式名时使用</span>
                            <Input placeholder="Enter something..." style="width: 480px"/>
                            <Tooltip content="Right Center text" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </div>
                        <div class="item">
                            <span>请输入连接成功后要执行的SQL语句，请分号（;）隔开：</span>
                            <Input type="textarea" :rows="4" placeholder="Enter something..."/>
                        </div>
                    </div>
                    <div v-if="tab === '3'" class="table-top">
                        命名参数
                        <Table border :columns="columns1" :data="data1"></Table>
                        <Button>帮助...</Button>
                    </div>
                    <div v-if="tab === '4'" class="table-top">
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>使用连接池</span>
                        </div>
                        <div>连接池大小</div>
                        <div class="item">
                            <div>初始大小：</div>
                            <Input type="text"  placeholder="Enter something..." style="width: 480px"/>
                            <Tooltip content="Right Center text" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </div>
                        <div class="item">
                            <div>最大空闲空间：</div>
                            <Input type="text"  placeholder="Enter something..." style="width: 480px"/>
                            <Tooltip content="Right Center text" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </div>
                        <div>命名参数：</div>
                        <Table ref="selection" border :columns="columns1" :data="data1"></Table>
                        <Button>恢复默认设置</Button>
                        <div class="item">
                            <div>描述：</div>
                            <Input type="text"  placeholder="Enter something..." style="width: 500px"/>
                        </div>
                    </div>
                    <div v-if="tab === '5'" class="table-top">
                        <div class="item">
                            <Checkbox></Checkbox>
                            <span>使用集群</span>
                        </div>
                        <div>命名参数：</div>
                        <Table ref="selection" border :columns="columns1" :data="data1"></Table>
                    </div>
                    <div class="foot">
                        <Button @click="instance('info')">测试</Button>
                        <Button @click="instance('success')">特征列表</Button>
                        <Button @click="instance('warning')">浏览</Button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'editPage',
        props: ['newModal'],
        data () {
            return {
                modal: false,
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
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
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
                ],
                tab: '1'
            };
        },
        methods: {
            ok () {
                this.$emit('show', 'exportShow', { show: false});
            },
            cancel () {
                this.$emit('show', 'exportShow', { show: false});
            },
            review () {
                this.$emit('show', 'exportShow', { show: false});
            },
            getFilePath () {
                this.formItem.filePath = this.$refs.input.value;
            },
            select (e) {
                this.tab = e;
                console.log(e);
            },
            instance (type) {
                const title = 'Title';
                const content = '<p>Content of dialog</p><p>Content of dialog</p>';
                switch (type) {
                case 'info':
                    this.$Modal.info({
                        title: title,
                        content: content
                    });
                    break;
                case 'success':
                    this.$Modal.success({
                        title: title,
                        content: content
                    });
                    break;
                case 'warning':
                    this.$Modal.warning({
                        title: title,
                        content: content
                    });
                    break;
                case 'error':
                    this.$Modal.error({
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
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            }
        },
        mounted () {
            this.modal = this.newModal;
        },
        watch: {
            modal (val, oldval) {
                if (oldval && !val){
                    this.$emit('show', 'exportShow', { show: false});
                }
            }
        }

    };
</script>

<style scoped>
    .body{
        display: flex;
    }
    .table-top .item{
        padding-top: 10px;
    }
    .body{
        height: 682px;
    }
    .ivu-modal-footer{
        position: absolute;
        width: 100%;
        bottom: 0;
    }
    .foot{
        position: absolute;
        width: 100%;
        bottom: 78px;
        left: 230px;
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
