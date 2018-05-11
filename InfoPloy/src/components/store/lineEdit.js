import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    line: {
        show: false,
        source: '',
        target: ''
    }
};

const  mutations = {
    showEditLine (state,data) {
        if (typeof data === 'object') {
            this.line.show = data.show;
            this.line.source = data.source;
            this.line.target = data.target;
        } else {
            this.line.show = data;
        }
    }
}



export default new Vuex.Store({
    state,
    mutations
});
