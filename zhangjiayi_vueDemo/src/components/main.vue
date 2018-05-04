<template>
      <div class="main-wrap">
            <top></top>
            <div class="main-wrap-container">
                    <div class="main-search">
                        <Input v-model="search" icon="ios-search" size="large" placeholder="搜索……" @on-click="keySearch">{{search}}</Input>
                    </div>
                    <!-- 主界面表格 -->
                    <div class="main-table">
                             <Table  highlight-row border stripe v-bind:columns="col" :data="list" @on-row-click="getCurrentRow"></Table>
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
        mounted:function(){
            this.list = this.dataList;
            //console.log("aaa");
        },
        data:function(){
            return{
                search:'',
                modalShow:false,
                mode:0,  //1表新建项目，2代表修改项目
                currentRow:{},
                currentName:'',
                listIndex:0,
                list:[],
                filterlist:[],
                item: {
                        name:'',
                        type:'',
                        days:'',
                },
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
                                                this.mdfProject(param.row.name);
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
                                         this.deleteItem(param.index)
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }
                ],
                dataList:[]
            }
        },
        watch:{
            dataList:{
                handler:function(newval,oldval){
                    console.log("检测datalist");
                    localStorage.setItem('key', JSON.stringify(this.dataList));
                },
                deep:true
            }

        },
        beforeMount:function(){
             // localStorage.removeItem('key');
             let tableData=JSON.parse(localStorage.getItem('key'));
             if(tableData ==null ){
                return ;
             }
             else{
                     this.dataList = [];
                     this.dataList = tableData;
                    // console.log("getLocalStorage:");
                    // console.log(tableData);
                    // console.log(this.dataList);
             }

        },
        methods:{
            keySearch(){
                let i,flag=0;
                this.filterlist=[];
                for(i=0;i<this.dataList.length;i++)
                {
                    for( let key in this.dataList[i]){
                        console.log(this.dataList[i][key].indexOf(this.search))
                        if( (this.dataList[i][key]).indexOf(this.search) > -1)
                        {
                             flag=1;
                             break;
                        }
                    }
                     if(flag == 1){
                        this.filterlist.push(this.dataList[i]);
                        flag =0 ;
                     }  // console.log( this.dataList[i][key]);
                }
                console.log("过滤后：")
                console.log(this.filterlist);
                this.list = [];
                this.list = this.filterlist;
            },
            changeModalShow:function(e){
                this.modalShow=false;
                console.log("父组件："+this.modalShow);
            },
            // 添加项目
            addItem:function()
            {
                this.modalShow=true;
                this.mode =1;
            },
            //  编辑项目
            mdfProject:function(name){
                this.modalShow=true;
                this.mode =2;
                this.currentName=name;
            },
            getCurrentRow(currentRow,index){
                this.currentRow = currentRow;
                console.log(index);
            },
            deleteItem:function(index)
            {
                console.log("index"+index);
                this.dataList.splice(index,1);
            },
            getEditData(name,type,days)     //获得修改后的数据
            {
                var  i;
                for(i=0;i<this.dataList.length;i++)
                {
                    if(this.dataList[i].name == this.currentName)
                        break;
                }
                this.dataList[i].name =name;
                this.dataList[i].type = type;
                this.dataList[i].days =days;
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