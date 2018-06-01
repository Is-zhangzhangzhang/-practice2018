<template>
    <div class="layout">
        <Layout>
            <Header>
                <head-menu></head-menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}" width="240">
                    <Tabs type="card" @on-tab-remove="handleTabRemove">
                        <TabPane label="主对象树" icon="document-text" v-if="tab2">
                            <left-menu></left-menu>
                        </TabPane>
                        <TabPane label="核心对象" icon="edit" v-if="tab3">
                            <div class="main-wel">
                                <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                                    <Submenu name="1">
                                        <template slot="title">
                                            <icon type="ios-navigate"></icon>
                                            输入
                                        </template>
                                        <menu-item name="1-1" class="draggable-component">表输入</menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <icon type="ios-keypad"></icon>
                                            输出
                                        </template>
                                        <menu-item name="2-1" class="draggable-component">表输出</menu-item>
                                    </Submenu>
                                </Menu>
                            </div>
                        </TabPane>
                    </Tabs>
                </Sider>
                <Tabs type="card" closable @on-tab-remove="handleTabRemove">
                    <TabPane label="转换一" icon="arrow-shrink" v-if="tab1">
                        <Layout>
                            <Content :style="{padding: '24px', minHeight: '280px', width: '1663px'}">
                                <index></index>
                                <editExport v-if="edit.exportShow"></editExport>
                                <edit-page v-if="edit.show"></edit-page>
                                <line-edit v-if="line.show"></line-edit>
                                <console-page></console-page>
                            </Content>
                        </Layout>
                    </TabPane>
                    <TabPane label="欢迎！" icon="heart" v-if="tab0">
                        <welcome></welcome>
                    </TabPane>
                </Tabs>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import index from './utils/Jsplumb';
    import editPage from './trans/steps/table_input/TableInputDialog';
    import editExport from './trans/steps/table_output/TableOutputDialog';
    import lineEdit from './trans/hops/NodeConnectDialog';
    import headMenu from './menu/HeadMenu';
    import leftMenu from './menu/LeftMenu';
    import welcome from './welcome/Welcome';
    import consolePage from './trans/run/TransRunResult';
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';

    export default {
        name: 'test1',
        components: {
            index,
            editPage,
            editExport,
            lineEdit,
            headMenu,
            leftMenu,
            welcome,
            consolePage
        },
        data (){
            return {
                tab0: true,
                tab1: true,
                tab2: true,
                tab3: true
            };
        },
        computed: {
            ...mapState([
                'edit', 'line'
            ])
        },
        methods: {
            ...mapMutations([
                'showEditLine'
            ]),
            handleTabRemove (name) {
                this['tab' + name] = false;
            }
        }
    };
</script>

<style lang="less">
    .ivu-layout-header {
        text-align: left;
    }

    .ivu-select-dropdown {
        z-index: 901;
    }

    .ivu-tabs-bar {
        margin-bottom: 0;
    }

    .main-wel {
        font-size: 50px;
    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>
