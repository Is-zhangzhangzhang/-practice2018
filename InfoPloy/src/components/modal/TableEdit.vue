<template>
    <div>
        <!-- 装换属性/ 命名参数 /  table-->
        <Modal v-model="modal"
               @on-ok="ok"
               @on-cancel="cancel">
            <p slot="header">
                <Icon type="edit"></Icon>
                <span>编辑命令参数</span>
            </p>
            <Form  :label-width="120">
                <FormItem label="命名参数：">
                    <Input  v-model="tableData.name" style="width: 300px"/>
                </FormItem>
                <FormItem label="默认值：">
                    <Input  v-model="tableData.defaultValue" style="width: 300px"/>
                </FormItem>
                <FormItem label="描述：">
                    <Input v-model="tableData.description" style="width: 300px"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    export default {
        name: 'TableEdit',
        props: ['parameterList'],
        data (){
            return {
                modal: false,
                tableData: {
                    name: '',
                    defaultValue: '',
                    description: ''
                }
            };
        },
        computed: {
            ...mapState([
                'tableEditModal'
            ])
        },
        mounted (){
            this.modal = this.tableEditModal;
            console.log('成功引入表格编辑！');
        },
        methods: {
            ...mapMutations([
                'tableEditShow'
            ]),
            cancel () {
                console.log('cancel functon');
                this.tableEditShow(false);
            },
            ok () {
                this.tableEditShow(false);
                console.log(this.tableData);
                this.parameterList.push({
                    name: this.tableData.name,
                    defaultValue: this.tableData.defaultValue,
                    description: this.tableData.description
                });
            }
        }
    };
</script>

<style scoped>

</style>
