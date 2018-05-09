<template>
    <Modal v-model="model" class-name="vertical-center-modal" width="1000px" height="800px">
        <div class="layout">
            <Layout>
                <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                        <menu-item name="1-1">
                            <span>一般</span>
                        </menu-item>
                        <menu-item name="1-2">
                            <span>高级</span>
                        </menu-item>
                        <menu-item name="1-3">
                            <span>选项</span>
                        </menu-item>
                        <menu-item name="1-4">
                            <span>连接池</span>
                        </menu-item>
                        <menu-item name="1-5">
                            <span>集群</span>
                        </menu-item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content :style="{margin: '20px', background: '#fff', minHeight: '600px'}">
                        <div style="background-color: #348CCC;min-height: 600px;display: inline-block;width: 48%"></div>
                        <div style="background-color: red;min-height: 600px;display: inline-block;width:48%"></div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    </Modal>
</template>
<script>
    export default {
        props: [
            'editDatabase'
        ],
        data () {
            return {
                isCollapsed: false,
                model: false
            };
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ];
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            ok () {
                this.$emit('okCallback', false);
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$emit('cancelCallback', false);
                this.$Message.info('Clicked cancel');
            }
        },
        mounted () {
            this.model = this.editDatabase;
            console.log(this.editDatabase);
        }
    };
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
