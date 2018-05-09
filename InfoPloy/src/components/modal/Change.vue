<template>
    <Modal v-model="modal" width="700px">
        <p slot="header">
            <Icon type="arrow-shrink"></Icon>
            <span>转换属性</span>
        </p>
        <Tabs type="card">
            <TabPane v-for="tab in tabs" :key="tab" :label="'标签' + tab">标签{{ tab }}</TabPane>
        </Tabs>
    </Modal>
</template>

<script>
    export default {
        name: 'changeModal',
        props: ['changeShow'],
        data () {
            return {
                modal: false,
                tabs: 5
            };
        },
        methods: {
            ok () {
                this.$emit('show', 'changeModal', { show: false});
            },
            cancel () {
                this.$emit('show', 'changeModal', { show: false});
            }
        },
        mounted () {
            this.modal = this.changeShow;
        }

    };
</script>
<style scoped>
    .table-top .item{
        padding-top: 10px;
    }
</style>
