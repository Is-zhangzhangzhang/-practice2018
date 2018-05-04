<template>
    <Modal :title="modalType"  v-model="isShow" @on-cancel="cancel" @on-ok="ok" @on-visible-change="EditORCrete">
        <Form :model="modalData" :label-width="80">
                <FormItem label="项目名称:">
                    <Input v-model="modalData.name" placeholder="请输入项目名称">{{modalData.name}}</Input>
                </FormItem>
                 <FormItem label="项目类型:">
                        <Select v-model="modalData.type">
                            <Option value="A类型">A类型</Option>
                            <Option value="B类型">B类型</Option>
                            <Option value="C类型">C类型</Option>
                        </Select>
                 </FormItem>
                 <FormItem label="已进行天数:">
                    <Input v-model="modalData.days" placeholder="请输入天数">{{modalData.days}}</Input>
                </FormItem>
        </Form>
    </Modal>

</template>

<script>
        export default{
            name:'modalcomponent',
            props:['show','mode','dataList','currentRow'],
            data:function()
            {
                return{
                        modalData:{
                                name:'',
                                type:'',
                                days:''
                            }
                    }
            },
            computed:{
            	isShow:{
	            	get:function(){
	            		return this.show;
	            	},
	            	set:function(){

	            	}
	            },
	            modalType:{
	            	get:function(){
	            		if(this.mode==1)
	            			return "新建项目";
	            		else
	            			return "编辑项目";
	            	},
	            	set:function(){

	            	}
	            },
            },
            methods:{
                emitClose(){
                    console.log(this.isShow);
                    this.$emit("modalClose",!this.isShow);
                },
                existProject(name){
                    console.log("exit?");
                    console.log(name);
                    if(this.dataList.length == 0)
                        return 1;
                    for(var i=0;i<this.dataList.length;i++)
                    {
                            if(name == this.dataList[i].name)
                                return 0;
                            else return 1;
                    }
                },
                //点击确认提交数据
                ok(){
                    //this.show = false;
                    if(this.modalData.name.length == 0)
                    {
                    	alert("项目名称不能为空");
                    }
                    else
                    {
                    	if(this.mode == 1)    //创建项目
                    	{
                                if( this.existProject(this.modalData.name) )
                                {
                                           this.dataList.push({
                                           name:this.modalData.name,
                                           type:this.modalData.type,
                                           days:this.modalData.days
                                });
                                this.emitClose();
                                }
                                else {
                                    alert("该项目名称已存在！");
                                    this.modalData.name="";
                                }
                    	}
                    	else if(this.mode == 2)    //修改项目
                    	{
                    		console.log("提交修改前");
                    		console.log(this.modalData);
                    		this.$emit('sentEditData',this.modalData.name,this.modalData.type,this.modalData.days);
                    	}
                    }
                   this.emitClose();
                    //console.log(this.show);
                },
                cancel(){
                    this.emitClose();
                },
                EditORCrete(){
                	if(this.mode == 2)
                	{
                		this.modalData.name = this.currentRow.name;
                		this.modalData.days = this.currentRow.days;
                		this.modalData.type = this.currentRow.type;
                	}
                         else{
                            this.modalData.name ="";
                            this.modalData.days = "";
                            this.modalData.type = "";
                         }
                }
            }
        }

</script>