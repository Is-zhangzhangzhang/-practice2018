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
                partitionschemaData:
                    {
                        name: '分区1',
                        partition: [
                            {
                                id: '111'
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
            if (this.partitionschemas.partitionschema.length !== 0){
                console.log('数据库分区长度不为0');
                this.$emit('addPartitionSchemaMenu', this.partitionschemas);
            }
        },
        methods: {
            ...mapMutations([
                'partitionSchemaShow'
            ]),
            ok () {
                this.partitionSchemaShow(false);
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
                if (flag === 1) {
                    console.log('添加');
                    this.partitionschemas.partitionschema.push({
                        name: this.partitionschemaData.name,
                        partition: this.partitionschemaData.partition,
                        dynamic: this.partitionschemaData.dynamic,
                        partitions_per_slave: this.partitions_per_slave
                    });
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
