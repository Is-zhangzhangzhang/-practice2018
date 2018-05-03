<template>
      <div class="main-wrap">
            <top></top>
            <div class="main-wrap-container">
                    <div class="main-search">
                        <Input v-model="search" icon="ios-search" size="large" placeholder="搜索……"></Input>
                    </div>
                    <!-- 主界面表格 -->
                    <div class="main-table">
                             <Table  highlight-row border stripe v-bind:columns="col" :data="dataList" @on-row-click="getCurrentRow"></Table>
                             <Button class="table-additem" type="primary" size="large" @click="addItem()">添加项目</Button>
                    </div>
            </div>
            <modal-component :show="modalShow" :mode="mode" :dataList="dataList" @modalClose="changeModalShow" :currentRow="currentRow" @sentEditData="getEditData">
            </modal-component>
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
                mode:0,  //1表新建项目，2代表修改项目
                currentRow:{},
                listIndex:0,
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
                                                this.modalShow=true;
                                                this.mdfProject();
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
                    },
                    {
                        name:'项目一',
                        type:'A类型',
                        days:'0',
                    }
                ]
            }
        },
        methods:{
            changeModalShow:function(e){
                this.modalShow=false;
                console.log("父组件："+this.modalShow);
            },
            deleteItem:function(index)
            {
                this.dataList.splice(index,1);
            },
            // 添加项目
            addItem:function()
            {   
                this.modalShow=true;
                this.mode =1;
            },
            //  编辑项目
            mdfProject:function(){
                this.modalShow=true;
                this.mode =2;

            },
            getCurrentRow(currentRow,index){
                this.currentRow = currentRow;
                this.listIndex = index;
                console.log(this.listIndex);
                console.log(this.currentRow);
            },
            getEditData(name,type,days)
            {
                console.log("修改后的:");
                var item = this.dataList[this.listIndex];
                item.name = name;
                item.type = type;
                item.days = days;
                console.log(item);
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