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
                    <Form :model="formItem" :label-width="150">
                        <FormItem label="最大日期数据库连接：">
                            <Select >
                                <Option value="oracle">oracle</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="日志表：">
                            <Input />
                        </FormItem>
                        <FormItem label="最大日期字段：">
                            <Input/>
                        </FormItem>
                        <FormItem label="最大日期偏移（秒）：">
                            <Input />
                        </FormItem>
                        <FormItem label="最大日期区别（秒）：">
                            <Input/>
                        </FormItem>
                    </Form>
                </div>
                <div v-if="tab === '2'" class="table-top">

                </div>
                <div v-if="tab === '3'" class="table-top">

                </div>
                <div v-if="tab === '5'" class="table-top">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
                tab: '1'
            };
        },
        methods: {
            select (e) {
                this.tab = e;
                console.log(e);
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
</style>
