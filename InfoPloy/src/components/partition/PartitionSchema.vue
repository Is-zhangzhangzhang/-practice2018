<template>
    <div>
        <Modal v-model="modal" width="700px"
               @on-ok="ok"
               @on-cancel="cancel">
            <p slot="header">
                <Icon type="edit"></Icon>
                <span>数据分区schema对话框</span>
            </p>
            <Form :label-width="300">
                <FormItem label="分区schema名称：">
                    <Input v-model="partitionschemaData.name" style="width: 300px"/>
                </FormItem>
                <FormItem label="Dynamically create the schema">
                    <Checkbox v-model="partitionschemaData.dynamic" true-value="Y"></Checkbox>
                </FormItem>
                <FormItem label="Number of partitions per slave server?">
                    <Input v-model="partitionschemaData.partitions_per_slave" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
            </Form>
            <Table border :columns="partitionCol" :data="partitionschemaData.partition"></Table>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    export default {
        name: 'partitionSchema',
        props: ['mode', 'editSchemaData'],
        data () {
            return {
                modal: false,
                partitionCol: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '分区ID',
                        key: 'id'
                    }
                ],
                partitionschemaData: {
                    name: '',
                    partition: [
                        {
                            id: ''
                        }
                    ],
                    dynamic: 'Y',
                    partitions_per_slave: ''
                }
            };
        },
        computed: {
            ...mapState([
                'partitionSchemaModal',
                'partitionschemas'
            ])
        },
        mounted (){
            this.modal = this.partitionSchemaModal;
            console.log(this.modal);
            console.log('enter patritionSchema');
            /*
             * mode=1说明点击了新建分区
             * mode=2 说明点击了编辑分区
             */
            console.log(this.mode);
            if (this.mode === 2) {
                this.editSchema();
            }
        },
        methods: {
            ...mapMutations([
                'partitionSchemaShow',
                'addPartitionSchemaStore',
                'editPartitionSchemaStore'
            ]),
            ok () {
                this.partitionSchemaShow(false);
                if (this.mode === 1) {
                    this.saveAddSchema();
                } else if (this.mode === 2) {
                    this.saveEditSchema();
                }
                console.log('看看有没有修改成功！');
                console.log(this.partitionschemas);
            },
            // 判断修改后的分区或是新增的分区是否已经存在。
            schemaExisting () {
                let flag = 0;
                for (let data of this.partitionschemas.partitionschema) {
                    if (data.name === this.partitionschemaData.name) {
                        alert('Partitioning schema' + data.name + 'already existiong');
                        flag = 0;
                        break;
                    } else {
                        flag = 1;
                    }
                }
                return flag;
            },
            editSchema () {
                console.log(this.editSchemaData);
                this.partitionschemaData.name = this.editSchemaData.name;
                this.partitionschemaData.partition = [];
                this.partitionschemaData.partition = this.editSchemaData.partition;
                this.partitionschemaData.dynamic = this.editSchemaData.dynamic;
                this.partitionschemaData.partitions_per_slave = this.editSchemaData.partitions_per_slave;
            },
            saveEditSchema () {
                this.editPartitionSchemaStore(this.partitionschemaData);
                console.log(this.partitionschemas);
            },
            saveAddSchema () {
                let flag = 0;
                flag = this.schemaExisting();
                if (flag === 1) {
                    console.log('添加');
                    this.addPartitionSchemaStore(this.partitionschemaData);
                }
                console.log(this.partitionschemas);
            },
            cancel () {
                this.partitionSchemaShow(false);
            }
        }
    };
</script>

<style scoped>

</style>
