<template>
    <div>
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <icon type="ios-navigate"></icon>
                    转换
                </template>
                <menu-item name="1-1">Steps（步骤）</menu-item>
                <Submenu name="1-2" @contextmenu.native="showContextMenu(newPartitionContextMenuData)">
                    <template slot="title" ref="refPartitionSchema">数据库分区schemas</template>
                    <menu-item v-for="(data) in partitionschemas.partitionschema"
                               @contextmenu.native="showContextMenu(editPartitionContextMenuData)"
                               @dblclick.native="dblClickEditPartitionSchema"
                               :name="data.name"
                               :key="data.name">{{data.name}}</menu-item>
                </Submenu>
                <vue-context-menu :contextMenuData="newPartitionContextMenuData"
                                  @newPartitionSchema="newPartitionSchema">
                </vue-context-menu>
                <vue-context-menu :contextMenuData="editPartitionContextMenuData"
                                  @editPartitionSchema="editPartitionSchema"
                                  @delPartitionSchema="delPartitionSchema"
                                  @sharePartitionSchema="sharePartitionSchema">
                </vue-context-menu>
                <menu-item name="1-3" @dblclick.native="slaveServersClick">子服务器</menu-item>
                <menu-item name="1-4" @dblclick.native="clusterSchemasClick">InfoPoly集群schemas</menu-item>
                <menu-item name="1-5">Hadoop clusters</menu-item>
                <menu-item name="1-6">Data Services</menu-item>
            </Submenu>
        </Menu>
        <partition-schema v-if="partitionSchemaModal" :mode="partitionSchemaModalMode" :editSchemaData="editPartitionSchemaData"></partition-schema>
        <slave-servers v-if="slaveServersModal"></slave-servers>
        <cluster-schemas v-if="clusterSchemasModal"></cluster-schemas>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    import partitionSchema from '../partition/PartitionSchema';
    import slaveServers from '../Server/SlaveServers';
    import clusterSchemas from '../cluster/ClusterSchemas';
    export default {
        name: 'headMenu',
        components: {
            partitionSchema,
            slaveServers,
            clusterSchemas
        },
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
                newPartitionContextMenuData: {
                    menuName: 'new',
                    axios: {
                        x: null,
                        y: null
                    },
                    menulists: [
                        {
                            fnHandler: 'newPartitionSchema',
                            icoName: 'fa fa-home fa-fw',
                            btnName: '新建'
                        }
                    ]
                },
                editPartitionContextMenuData: {
                    menuName: 'edit',
                    axios: {
                        x: null,
                        y: null
                    },
                    menulists: [
                        {
                            fnHandler: 'editPartitionSchema',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'Edit'
                        },
                        {
                            fnHandler: 'delPartitionSchema',
                            icoName: 'fa fa-home fa-fw',
                            btnName: '删除'
                        },
                        {
                            fnHandler: 'sharePartitionSchema',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'Share'
                        }
                    ]
                },
                partitionSchemaModalMode: 0, //  1:表示新建分区，2:表示编辑当前分区
                editPartitionSchemaName: '',
                editPartitionSchemaData: {}
            };
        },
        computed: {
            ...mapState([
                'partitionSchemaModal',
                'slaveServersModal',
                'clusterSchemasModal',
                'clusterschemas',
                'partitionschemas'
            ])
        },
        mounted () {
            /*
             *  1.数据库分区数不为0，则添加到分区子菜单栏中
             *  2.数据库分区数为0，则把展开栏的小三角去掉
             */
            this.$nextTick(() => {
                console.log( this.$refs.refPartitionSchema);
            });
            if (this.partitionschemas.partitionschema.length !== 0){
                console.log('数据库分区长度不为0');
                // this.$emit('addPartitionSchemaMenu', this.partitionschemas);
                this.schemaSubmenu = this.partitionschemas;
            } else {
                console.log( document.getElementById('leftMenuPartitionSchema') );
            }
        },
        methods: {
            ...mapMutations([
                'partitionSchemaShow',
                'slaveServersShow',
                'clusterSchemasShow',
                'delPartitionSchemaStore'
            ]),
            slaveServersClick () {
                console.log('子服务器');
                this.slaveServersShow(true);
            },
            /*
             *  子组件在判断partitionschemas.partitionschema长度不为0，实现动态添加子菜单
             * addPartitionSchemaMenu (data) {
             *     this.schemaSubmenu = data;
             *     console.log(this.schemaSubmenu);
             * },
             */
            clusterSchemasClick () {
                this.clusterSchemasShow(true);
            },
            dbclickSchema () {
                console.log('双击ok！！！');
            },
            optionclick (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('option7');
            },
            showContextMenu (data) {
                event.preventDefault();
                event.stopPropagation();
                let x = event.clientX;
                let y = event.clientY - 70;
                data.axios = {
                    x, y
                };
                this.editPartitionSchemaName = event.target.innerText;
            },
            dblClickEditPartitionSchema () {
                this.editPartitionSchemaName = event.target.innerText;
                this.editPartitionSchema();
            },
            newPartitionSchema () {
                console.log('新建分区：');
                this.partitionSchemaShow(true);
                this.partitionSchemaModalMode = 1;
            },
            searchPartitionSchema () {
                let data;
                let i = -1;
                console.log('修改前的分区');
                console.log(this.partitionschemas);
                for (data of this.partitionschemas.partitionschema) {
                    i++;
                    console.log(i);
                    //  找到了返回下标
                    if (data.name === this.editPartitionSchemaName) {
                        this.editPartitionSchemaData = data;
                        return i;
                    } else {
                        continue;
                    }
                }
                alert('分区不存在！');
                return -1;
            },
            editPartitionSchema () {
                alert('edit schema');
                this.searchPartitionSchema();
                this.partitionSchemaShow(true);
                this.partitionSchemaModalMode = 2;
            },
            delPartitionSchema () {
                alert('del schema');
                let index = this.searchPartitionSchema();
                if ( index !== -1) {
                    this.delPartitionSchemaStore(index);
                }
            },
            sharePartitionSchema () {
                alert('share schema');
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
