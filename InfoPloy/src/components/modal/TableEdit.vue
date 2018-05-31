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
        props: ['parameterList', 'lineIndex', 'mode'],
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
            console.log(this.mode);
            if (this.mode === 2) {
                this.showEditItem();
            }
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
                console.log(this.lineIndex);
                console.log(this.tableData);
                if (this.mode === 1) {
                    this.parameterList.push({
                        name: this.tableData.name,
                        defaultValue: this.tableData.defaultValue,
                        description: this.tableData.description
                    });
                } else {
                    this.parameterList[this.lineIndex].name = this.tableData.name;
                    this.parameterList[this.lineIndex].defaultValue = this.tableData.defaultValue;
                    this.parameterList[this.lineIndex].description = this.tableData.description;
                }
            },
            showEditItem () {
                console.log(this.lineIndex);
                this.tableData.name = this.parameterList[this.lineIndex].name;
                this.tableData.description = this.parameterList[this.lineIndex].description;
                this.tableData.defaultValue = this.parameterList[this.lineIndex].defaultValue;
            }
        }
    };
</script>

<style scoped>

</style>
