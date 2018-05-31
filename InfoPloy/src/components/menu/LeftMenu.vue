<template>
    <div>
        <Menu active-name="1-2" ref="leftMenu" theme="light" width="auto" :open-names="['1']">
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
            <Submenu name="3">
                <template slot="title">
                    <icon type="ios-navigate"></icon>
                    转换
                </template>
                <menu-item name="3-1">Steps（步骤）</menu-item>
                <menu-item name="3-2" @click.native="partitionSchemaClick">数据库分区schemas</menu-item>
                <menu-item name="3-3" @click.native="slaveServersClick">子服务器</menu-item>
                <menu-item name="3-4" @click.native="clusterSchemasClick">InfoPoly集群schemas</menu-item>
                <menu-item name="3-5">Hadoop clusters</menu-item>
                <menu-item name="3-6">Data Services</menu-item>
            </Submenu>
        </Menu>
        <partition-schema v-if="partitionSchemaModal"></partition-schema>
        <slave-servers v-if="slaveServersModal"></slave-servers>
        <cluster-schemas v-if="clusterSchemasModal"></cluster-schemas>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    import partitionSchema from '../modal/PartitionSchema';
    import slaveServers from '../modal/SlaveServers';
    import clusterSchemas from '../modal/ClusterSchemas';
    export default {
        components: {
            partitionSchema,
            slaveServers,
            clusterSchemas
        },
        name: 'headMenu',
        data () {
            return {
                menuList: [
                    {
                        name: '文件（F)',
                        icon: 'document',
                        menuChildList: [
                            {
                                name: '新建',
                                icon: 'ios-arrow-right',
                                isShow: 'right-start',
                                childList: [
                                    '转换',
                                    '作业',
                                    '数据库连接'
                                ]
                            },
                            {
                                name: '打开'
                            },
                            {
                                name: '从URL打开文件'
                            },
                            {
                                name: '关闭'
                            },
                            {
                                name: '关闭所有'
                            },
                            {
                                divided: true,
                                name: '保存'
                            },
                            {
                                name: '另存为...'
                            },
                            {
                                name: '另存为VFS'
                            },
                            {
                                divided: true,
                                name: '打印'
                            },
                            {
                                divided: true,
                                name: '从XML文件导入'
                            },
                            {
                                name: '导出',
                                icon: 'ios-arrow-right',
                                isShow: 'right-start',
                                childList: [
                                    '导出到XML文件',
                                    '导出到XML文件（ZIP压缩）'
                                ]
                            },
                            {
                                divided: true,
                                name: '退出'
                            }
                        ]
                    },
                    {
                        name: '编辑（E)',
                        icon: 'edit',
                        menuChildList: [
                            {
                                name: '撤销：新步骤'
                            },
                            {
                                name: '重做：不可获得'
                            },
                            {
                                divided: true,
                                name: '剪切'
                            },
                            {
                                name: '复制所选的步骤到剪贴板'
                            },
                            {
                                name: '复制文件'
                            },
                            {
                                name: '从剪贴板复制步骤'
                            },
                            {
                                divided: true,
                                name: '复制转换步骤到剪贴板'
                            },
                            {
                                name: '清除选择'
                            },
                            {
                                name: '选择所有步骤'
                            },
                            {
                                divided: true,
                                name: '搜索元数据'
                            },
                            {
                                name: '设置环境变量'
                            },
                            {
                                name: '显示环境变量'
                            },
                            {
                                name: '编辑kettle文件'
                            },
                            {
                                name: '显示参数（u）'
                            },
                            {
                                divided: true,
                                name: '设置'
                            }
                        ]
                    },
                    {
                        name: '视图（V)',
                        icon: 'monitor',
                        menuChildList: [
                            {
                                name: '视图类型',
                                icon: 'ios-arrow-right',
                                isShow: 'right-start',
                                childList: [
                                    'Data Info'
                                ]
                            },
                            {
                                name: '放大'
                            },
                            {
                                name: '缩小'
                            },
                            {
                                name: '等比例'
                            },
                            {
                                divided: true,
                                name: '执行结果面板'
                            }
                        ]
                    },
                    {
                        name: '工具（V)',
                        icon: 'monitor',
                        menuChildList: [
                            {
                                name: '数据库',
                                icon: 'ios-arrow-right',
                                isShow: 'right-start',
                                childList: [
                                    '浏览',
                                    '清除缓存'
                                ]
                            },
                            {
                                name: '资源库',
                                icon: 'ios-arrow-right',
                                isShow: 'right-start',
                                childList: [
                                    '搜索资源库',
                                    '清除共享对象缓存',
                                    '导出资源库',
                                    '导入资源库'
                                ]
                            },
                            {
                                name: '向导（W）',
                                icon: 'ios-arrow-right',
                                isShow: 'right-start',
                                childList: [
                                    '创建数据库连接向导...',
                                    '复制单表向导...',
                                    '复制多表向导...'
                                ]
                            },
                            {
                                name: 'hadoop Distribution'
                            },
                            {
                                divided: true,
                                name: '选项（O）...'
                            },
                            {
                                divided: true,
                                name: 'Capability Manager'
                            },
                            {
                                divided: true,
                                name: '选项（O）...'
                            },
                            {
                                divided: true,
                                name: 'show plugin information'
                            },
                            {
                                name: 'marketPlace'
                            }
                        ]
                    },
                    {
                        name: '帮助（V)',
                        icon: 'ios-telephone',
                        menuChildList: [
                            {
                                name: '显示欢迎屏幕'
                            },
                            {
                                name: 'Documentation'
                            },
                            {
                                divided: true,
                                name: '关于'
                            }
                        ]
                    }
                ],
                schemaSubmenu: {}
            };
        },
        computed: {
            ...mapState([
                'partitionSchemaModal',
                'slaveServersModal',
                'clusterSchemasModal'
            ])
        },
        mounted () {
            this.$nextTick( function () {
                this.$refs.leftMenu.updateOpened();
                this.$refs.leftMenu.updateActiveName();
            });
        },
        methods: {
            ...mapMutations([
                'partitionSchemaShow',
                'slaveServersShow',
                'clusterSchemasShow'
            ]),
            partitionSchemaClick () {
                // 数据库分区schema
                this.partitionSchemaShow(true);
            },
            slaveServersClick () {
                console.log('子服务器');
                this.slaveServersShow(true);
            },
            addPartitionSchemaMenu (data) {
                this.schemaSubmenu = data;
                console.log(this.schemaSubmenu);
            },
            clusterSchemasClick () {
                this.clusterSchemasShow(true);
            },
            dbclickSchema () {
                console.log('双击ok！！！');
            }
        }
    };
</script>

<style lang="less" scoped>
    .ivu-dropdown{
        padding-right: 20px;
    }
    .head-title{
        color: white;
    }
    .ivu-layout-header{
        text-align: left;
        color: #ffffff;
    }
    .menu-item{
        height: 30px;
        line-height: 30px;
    }
</style>
