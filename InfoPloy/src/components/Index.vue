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
                                欢迎
                            </div>
                        </TabPane>
                    </Tabs>
                </Sider>
                <Tabs type="card" closable @on-tab-remove="handleTabRemove">
                    <TabPane label="转换一" icon="arrow-shrink" v-if="tab1">
                        <Layout>
                            <Content :style="{padding: '24px', minHeight: '280px', width: '1663px'}">
                                <!--<index @showLine="showEditLine"></index> 因为在子组件中直接调用了showEditLIne所以不需要再这里再emit-->
                                <index></index>
                                <editExport v-if="edit.exportShow"></editExport>
                                <edit-page v-if="edit.show"></edit-page>
                                <line-edit v-if="line.show" @hiideLine="showEditLine" :line="line"></line-edit>
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
    import index from './ligature/Jsplumb';
    import editPage from './ligature/EditPage';
    import editExport from './ligature/EditExport';
    import lineEdit from './ligature/EditLine';
    import headMenu from './menu/HeadMenu';
    import leftMenu from './menu/LeftMenu';
    import welcome from './hello/Welcome';
    import consolePage from './console/ConsolePage';
    import {mapState} from 'vuex';

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
