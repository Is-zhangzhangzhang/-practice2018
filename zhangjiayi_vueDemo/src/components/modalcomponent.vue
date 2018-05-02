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
                    <Input v-model="modalData.day" placeholder="请输入天数">{{modalData.day}}</Input>
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
                ok(){
                    //this.show = false;
                    if(this.modalData.name.length == 0)
                    {
                    	alert("项目名称不能为空");
                    	this.emitClose();
                    }
                    else
                    {
                    	this.dataList.push(this.modalData);
                    	console.log(this.modalData);
                    	this.emitClose();
                    }
                   
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
                }
            }
        }

</script>