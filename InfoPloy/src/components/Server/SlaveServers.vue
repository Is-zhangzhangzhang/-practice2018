<template>
    <div>
        <Modal v-model="modal" width="700px"
               @on-ok="ok"
               @on-cancel="cancel">
            <Tabs type="card">
                <TabPane label="服务">
                    <Form :label-width="280" style="margin-top: 25px">
                        <FormItem label="服务器名称：">
                            <Input v-model="slaveservers.slaveserver[0].name" style="width: 300px"/>
                        </FormItem>
                        <FormItem label="主机名称或IP地址：">
                            <Input v-model="slaveservers.slaveserver[0].hostname" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="端口号（如果不写就是端口80）：">
                            <Input v-model="slaveservers.slaveserver[0].port" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="Web App Name(required for Pentaho Server)：">
                            <Input v-model="slaveservers.slaveserver[0].webAppName" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="用户名：">
                            <Input v-model="slaveservers.slaveserver[0].username" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="密码：">
                            <Input v-model="slaveservers.slaveserver[0].password" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="是服务器吗？：">
                            <checkbox v-model="slaveservers.slaveserver[0].master" true-value="Y"></checkbox>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane label="代理">
                    <Form :label-width="280" style="margin-top: 25px">
                        <FormItem label="代理服务器主机名：">
                            <Input v-model="slaveservers.slaveserver[0].proxy_hostname" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="代理服务器端口：">
                            <Input v-model="slaveservers.slaveserver[0].proxy_port" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="Ignore proxy for hosts: regexp|separated：">
                            <Input v-model="slaveservers.slaveserver[0].non_proxy_hosts" style="width: 300px"/>
                            <Tooltip content="使用CTRL-ALT-SPACE选择一个变量" placement="top">
                                <Icon type="information-circled"></Icon>
                            </Tooltip>
                        </FormItem>
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    export default {
        name: 'slaveServers',
        data () {
            return {
                modal: false,
                slaveservers: {
                    slaveserver: [
                        {
                            name: '子服务器1',
                            hostname: '',
                            port: '',
                            webAppName: '',
                            username: '',
                            password: '',
                            proxy_hostname: '',
                            proxy_port: '',
                            non_proxy_hosts: '',
                            master: 'N',
                            sslMode: 'N',
                            sslConfig: {
                                keyStore: '',
                                keyStorePassword: '',
                                keyPassword: ''
                            }
                        }
                    ]
                }
            };
        },
        computed: {
            ...mapState([
                'slaveServersModal'
            ])
        },
        mounted () {
            this.modal = this.slaveServersModal;
            console.log('enter slaveServers');
        },
        methods: {
            ...mapMutations([
                'slaveServersShow'
            ]),
            ok () {
                this.slaveServersShow(false);
            },
            cancel () {
                this.slaveServersShow(false);
            }
        }
    };
</script>

<style scoped>

</style>
