<template>
    <div>
        <Dropdown v-for="(item, index) in menuList" :key="index">
            <a href="javascript:void(0)" class="head-title">
                {{item.name}}
                <Icon :type="item.icon"></Icon>
            </a>
            <DropdownMenu slot="list" class="drop-down" >
                <div v-for="(value, val) in item.menuChildList" :key="val" class="menu-item" @click="doMore(value)">
                    <Dropdown v-if="value.isShow" :placement="value.isShow" >
                        <DropdownItem >
                            {{value.name}}
                            <Icon :type="value.icon"></Icon>
                        </DropdownItem>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(child, chi) in value.childList" :key="chi">
                                {{child}}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <DropdownItem v-else :divided="value.divided">{{value.name}}</DropdownItem>
                </div>
            </DropdownMenu>
        </Dropdown>
        <run-trans-modal v-if="runTransModal"></run-trans-modal>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    import runTransModal from '../trans/run/TransRunDialog';
    export default {
        name: 'headMenu',
        components: {
            runTransModal
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
                        name: '执行（R)',
                        icon: 'monitor',
                        menuChildList: [
                            {
                                name: '运行',
                                on: {
                                    click: () => {
                                        this.run();
                                    }
                                }
                            },
                            {
                                name: 'Run Options...'
                            },
                            {
                                name: '预览'
                            },
                            {
                                name: '调试'
                            },
                            {
                                name: '重放'
                            },
                            {
                                name: '校验'
                            },
                            {
                                name: '影响分析'
                            },
                            {
                                name: '获取SQL'
                            },
                            {
                                divided: true,
                                name: '显示最近一次的操作',
                                icon: 'ios-arrow-right',
                                isShow: 'right-start',
                                childList: [
                                    '显示最近一次影响分析',
                                    '显示最近一次影响结果',
                                    '显示最近一次预览结果'
                                ]
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
                ]
            };
        },
        computed: {
            ...mapState([
                'runTransModal'
            ])
        },
        methods: {
            ...mapMutations([
                'runTransShow'
            ]),
            doMore (data) {
                if (data.name === '运行'){
                    this.runTransShow(true);
                }
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
