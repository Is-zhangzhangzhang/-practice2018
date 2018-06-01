// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';

Vue.prototype.$axios = axios;
import VueContextMenu from 'vue-contextmenu';
import 'vue-contextmenu/style/css/font-awesome.min.css';
import store from './components/store/store';

Vue.use(VueContextMenu);
Vue.use(iView);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});

