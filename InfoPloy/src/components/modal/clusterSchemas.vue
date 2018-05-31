<template>
    <div>
        <Modal v-model="modal" @on-ok="ok" @on-cancel="cancel" width="700px">
            <p slot="header">
                <Icon type="edit"></Icon>
                <span>集群Schema</span>
            </p>
            <Form :label-width="250">
                <FormItem label="Schema名称：">
                    <Input v-model="clusterschemas.clusterschema[0].name" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
                <FormItem label="端口">
                    <Input v-model="clusterschemas.clusterschema[0].base_port" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
                <FormItem label="Sockets缓存大小：">
                    <Input v-model="clusterschemas.clusterschema[0].sockets_buffer_size" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
                <FormItem label="Sockets刷新间隔（rows）：">
                    <Input v-model="clusterschemas.clusterschema[0].sockets_flush_interval" style="width: 300px"/>
                    <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                        <Icon type="information-circled"></Icon>
                    </Tooltip>
                </FormItem>
                <FormItem label="Sockets数据是否压缩?">
                    <checkbox true-value="Y" v-model="clusterschemas.clusterschema[0].sockets_compressed"></checkbox>
                </FormItem>
                <FormItem label="Dynamic cluster：">
                    <checkbox true-value="Y" v-model="clusterschemas.clusterschema[0].dynamic"></checkbox>
                </FormItem>
            </Form>
            <Table highlight-row :columns="clusterschemasCol" :data="clusterschemas.clusterschema[0].slaveservers"></Table>
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
                clusterschemas: {
                    clusterschema: [
                        {
                            name: '',
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
                    ]
                }
            };
        },
        computed: {
            ...mapState([
                'clusterSchemasModal'
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
            ok () {
                this.clusterSchemasShow(false);
            },
            cancel () {
                this.clusterSchemasShow(false);
            }
        }
    };
</script>

<style scoped>

</style>
