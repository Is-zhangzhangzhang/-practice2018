import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    edit: {
        show: false,
        exportShow: false,
        title: ''
    }
};

const mutations = {
    show (state, data){
        console.log('store修改前！');
        console.log(state.edit);
        console.log(data);
        if (typeof data === 'object') {
            if (data.title) {
                if (data.exportShow) {
                    console.log('进入!data.exportShow');
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
    }
};

const actions = {

};

export default new Vuex.Store({
    state,
    mutations,
    actions
});
