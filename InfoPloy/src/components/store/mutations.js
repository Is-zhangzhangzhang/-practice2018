const mutations = {
    /*  双击表输入输出弹出EditExport模态框   */
    show (state, data){
        if (typeof data === 'object') {
            if (data.title) {
                if (data.exportShow) {
                    state.edit.title = data.title;
                    state.edit[data.exportShow] = data.show;
                }
            } else {
                state.edit.exportShow = false;
                state.edit.show = data.show;
            }
        } else {
            state.edit.show = data;
        }
        console.log(state.edit);
    },
    //  单击线 打开模态框
    showEditLine (state, data) {
        if (typeof data === 'object') {
            state.line.show = data.show;
            state.line.source = data.source;
            state.line.target = data.target;
            console.log(state.line);
            console.log(state.line);
        } else {
            state.line.show = data;
        }
    },
    //  转换属性模态框
    okCallbackTransform (state, value) {
        console.log('转换属性！');
        state.changeShow = value;
    },
    //  日志设置
    setLogSetting (state){
        state.isSetting = true;
    },
    okCallbackExecute (state, value){
        console.log('进入日志设置');
        state.isSetting = value;
    },
    //  表输出点击新建，newModal的模态框
    newModalShow (state, value){
        state.newModal = value;
        console.log('新建数据库模态框');
    },
    wizardModalShow (state, value){
        state.wizardModal = value;
        console.log('wizard模态框');
    },
    //  编辑数据库连接弹出框
    editDataBaseCallbackExecute (state, value) {
        state.editDatabase = value;
        console.log('进入store，编辑数据库');
    },
    sqlQueryShow (state, value){
        state.isGetsql = value;
        console.log('store获取SQL查询语句');
    },
    reviewShow (state, value){
        state.isReview = value;
    },
    tableEditShow (state, value){
        state.tableEditModal = value;
        console.log('命令参数table编辑');
    },
    partitionSchemaShow (state, value){
        state.partitionSchemaModal = value;
        console.log('数据库分区Schema');
    },
    slaveServersShow (state, value){
        state.slaveServersModal = value;
        console.log('子服务器模态框');
    },
    clusterSchemasShow (state, value) {
        state.clusterSchemasModal = value;
        console.log('集群Schema');
    },
    notepadShow (state, value) {
        state.notepadModal = value;
        console.log('新建注释');
    }

};

export default mutations;

