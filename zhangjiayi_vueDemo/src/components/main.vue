<template>
      <div class="main-wrap">
            <top></top>
            <div class="main-wrap-container">
                    <div class="main-search">
                        <Input v-model="search" icon="ios-search" size="large" placeholder="搜索……"></Input>
                    </div>
                    <div class="main-table">
                             <Table  border stripe v-bind:columns="col" :data="dataList"></Table>
                             <Button class="table-additem" type="primary" size="large" @click="addItem()">添加项目</Button>
                    </div>
            </div>
            <modal-component v-modal="modalShow"></modal-component>
      </div>
</template>

<script>
import top from './top'
import modalComponent  from './modalcomponent.vue'
    export default{
        name:'mainVue',
        components:{
            top,
            modalComponent
        },
        data:function(){
            return{
                search:'',
                modalShow:false,
                col:[
                    {
                        title:'项目名称',
                        key:'name'
                    },
                    {
                        title:'项目类型',
                        key:'type'
                    },
                    {
                        title:'已进行天数',
                        key:'days'
                    },
                    {
                        title:'操作',
                        key:'action',
                        align:'center',
                        //用render来创建html
                        render:(h,param) => {
                            return h('div',[
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                        },
                                        on:{
                                            click: () =>
                                            {
                                                this.modalShow=true
                                                this.mdfProject()
                                            }
                                        }
                                },'编辑'),
                                h('Button',{
                                    props:{
                                        type:'error',
                                    },
                                    style:{
                                        marginLeft: '5px'
                                    },
                                    on:{
                                        click: () =>{
                                          this.deleteItem()
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }
                ],
                dataList:[
                    {
                        name:'项目一',
                        type:'A类型',
                        days:'0',
                        action:'hh'
                    },
                    {
                        name:'项目一',
                        type:'A类型',
                        days:'0',
                        action:'hh'
                    }
                ]
            }
        },
        methods:{
            deleteItem:function(index)
            {
                this.dataList.splice(index,1);
            },
            addItem:function()
            {
                this.modalShow=true;
                console.log("addok"+this.modalShow)
            },
            mdfProject:function()
            {
                console.log("mdfok"+this.modalShow)
            }
        }
    }
</script>

<style>
    .main-wrap-container{
        width: 80%;
        margin: 0 auto;
        margin-top:3%;
    }
    .main-search {
        width:56%;
        min-width: 450px;
        margin:0 auto;
    }
    .main-search input{
        padding:10px;
        border-radius: 20px;
    }
    .main-table{
        min-width: 618px;
        max-width: 85%;
        margin:0 auto;
        margin-top:50px;
    }
    .table-additem{
        margin:20px 0;
        float:right;
    }

</style>