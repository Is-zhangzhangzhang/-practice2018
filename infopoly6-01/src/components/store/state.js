const state = {
    edit: {
        show: false,
        exportShow: false,
        title: ''
    },
    newModal: false,
    wizardModal: false,
    editDatabase: false,
    isGetsql: false,
    isReview: false,
    line: {
        show: false,
        source: '',
        target: ''
    },
    isSetting: false,
    changeShow: false,
    tableEditModal: false,
    partitionSchemaModal: false,
    slaveServersModal: false,
    clusterSchemasModal: false,
    notepadModal: false,
    partitionschemas: { //  分区schema数据
        partitionschema: [
            {
                name: '1',
                partition: [
                    {
                        id: ''
                    }
                ],
                dynamic: 'Y',
                partitions_per_slave: ''
            }
        ]
    },
    clusterschemas: { //    集群schema的数据
        clusterschema: [
            {
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
            },
            {
                name: '2',
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

export default state;
