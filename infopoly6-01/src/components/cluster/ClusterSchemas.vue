<template>
    <div>
        <Modal v-model="modal" @on-ok="ok" @on-cancel="cancel" width="700px">
            <p slot="header">
                <Icon type="edit"></Icon>
                <span>集群Schema</span>
            </p>
            <Form :label-width="250">
                <FormItem label="Schema名称：">
                    <Input v-model="clusterschemasData.name" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
                <FormItem label="端口">
                    <Input v-model="clusterschemasData.base_port" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
                <FormItem label="Sockets缓存大小：">
                    <Input v-model="clusterschemasData.sockets_buffer_size" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
                <FormItem label="Sockets刷新间隔（rows）：">
                    <Input v-model="clusterschemasData.sockets_flush_interval" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
                <FormItem label="Sockets数据是否压缩?">
                    <checkbox true-value="Y" v-model="clusterschemasData.sockets_compressed"></checkbox>
                </FormItem>
                <FormItem label="Dynamic cluster：">
                    <checkbox true-value="Y" v-model="clusterschemasData.dynamic"></checkbox>
                </FormItem>
            </Form>
            <Table highlight-row :columns="clusterschemasCol" :data="clusterschemasData.slaveservers"></Table>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    export default {
        name: 'clusterSchemas',
        data () {
            return {
                modal: false,
                clusterschemasCol: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    }
                ],
                clusterschemasData: {
                    name: '1',
                    base_port: '40000',
                    sockets_buffer_size: '2000',
                    sockets_flush_interval: '5000',
                    sockets_compressed: 'Y',
                    dynamic: 'N',
                    slaveservers: [
                        {
                            name: 'clusterschema'
                        }
                    ]
                }
            };
        },
        computed: {
            ...mapState([
                'clusterSchemasModal',
                'clusterschemas'
            ])
        },
        mounted () {
            this.modal = this.clusterSchemasModal;
            console.log('enter clusterSchemas');
        },
        methods: {
            ...mapMutations([
                'clusterSchemasShow'
            ]),
            ok () { //  新建数据库分区schema
                //  判断新加入的分区是否已存在
                this.clusterSchemasShow(false);
                let flag = 0;
                for (let data of this.clusterschemas.clusterschema) {
                    if (data.name === this.clusterschemasData.name) {
                        alert('Partitioning schema' + data.name + 'already existiong');
                        flag = 0;
                        break;
                    } else {
                        flag = 1;
                    }
                }
                if (flag === 1) {
                    console.log('添加');
                    this.clusterschemas.clusterschema.push({
                        name: this.clusterschemasData.name,
                        base_port: this.clusterschemasData.base_port,
                        sockets_buffer_size: this.clusterschemasData.sockets_buffer_size,
                        sockets_flush_interval: this.clusterschemasData.sockets_flush_interval,
                        sockets_compressed: this.clusterschemasData.sockets_compressed,
                        dynamic: this.clusterschemasData.dynamic,
                        slaveservers: this.clusterschemasData.slaveservers
                    });
                }
                console.log(this.clusterschemas);
            },
            cancel () {
                this.clusterSchemasShow(false);
            }
        }
    };
</script>

<style scoped>

</style>
