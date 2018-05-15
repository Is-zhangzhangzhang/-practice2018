const mutations = {
    /*  双击表输入输出弹出模态框   */
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
    /*  单击线 打开模态框   */
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
    /*  转换属性模态框 */
    okCallbackTransform (state, value) {
        state.changeShow = value;
        console.log(value);
    }
    /*
     *cancelCallbackTransform (state, value) {
     * state.changeShow = value;
     * console.log(value);
     *}
     */
};

export default mutations;

