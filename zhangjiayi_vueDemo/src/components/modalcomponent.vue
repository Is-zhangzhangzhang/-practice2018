<template>
    <Modal title="编辑" @on-ok="mdfProject()" v-model="show">
        <Form :model="modalData" :label-width="80">
                <FormItem label="项目名称:">
                    <Input v-model="modalData.name" placeholder="请输入项目名称">{{modalData.name}}</Input>
                </FormItem>
                 <FormItem label="项目类型:">
                        <Select v-model="modalData.select">
                            <Option value="A">A类型</Option>
                            <Option value="B">B类型</Option>
                            <Option value="C">C类型</Option>
                        </Select>
                 </FormItem>
                 <FormItem label="已进行天数:">
                    <Input v-model="modalData.name" placeholder="请输入天数">{{modalData.name}}</Input>
                </FormItem>
        </Form>
    </Modal>

</template>

<script>
        export default{
            name:'modalcomponent',
            data:function()
            {
                return{
                        show:false,
                        modalData:{
                                name:'',
                                type:'',
                                day:'',
                                select:''
                            }
                    }
                }
            }

</script>