<template>
    <Modal v-model="modal"
           width="700px">
        <p slot="header">
            <Icon type="soup-can-outline"></Icon>
            <span>选择数据库名称和类型</span>
        </p>
        <div>
            <Icon type="close-circled"></Icon>
            <span>输入数据库连接名称，数据库类型和访问类型。</span>
        </div>
        <div class="table-top">
            <div class="item">
                <span>数据库连接名称</span>
                <Input placeholder="Enter something..." style="width: 400px"/>
            </div>
            <div class="item">
                <span>数据库连接类型</span>
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
            </div>
            <div class="item">
                <span>数据库访问类型</span>
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
            </div>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: 'wizard',
        props: ['wizardModal'],
        data () {
            return {
                modal: false
            };
        },
        methods: {
            ok () {
                this.$emit('show', 'exportShow', { show: false});
            },
            cancel () {
                this.$emit('show', 'exportShow', { show: false});
            }

        },
        mounted () {
            this.modal = this.wizardModal;
        }

    };
</script>
<style scoped>
    .table-top .item{
        padding-top: 10px;
    }
</style>
