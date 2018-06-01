// import { loginByUsername, logout, getUserInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        permissions: [],
        menu: [],
        buttons: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions;
        },
        SET_MENU: (state, menu) => {
            state.menu = menu;
        },
        SET_BUTTON: (state, buttons) => {
            state.buttons = buttons;
        }
    },

    actions: {
        // 用户名登录
        Login ({ commit }, userInfo) {
            let self = this;
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                self._vm.$api['user/login']({
                    data: {
                        loginname: username,
                        password: userInfo.password
                    },
                    cb (res) {
                        if (res.data.flag === 'success') {
                            // 登录后改变登录状态
                            const data = res.data;
                            commit('SET_TOKEN', data.token);
                            setToken(res.data.token);
                            resolve();
                        } else {
                            // self.removeUserStorage();
                            self._vm.$Message.error(res.data.msg);
                        }
                    },
                    error (e) {
                        console.log(e);
                        reject(e);
                    }
                });
            });
        },

        // 获取用户的权限列表
        GetUserPermission ({ commit }) {
            let self = this;
            return new Promise((resolve, reject) => {
                self._vm.$api['role/permission-list']({
                    data: null,
                    cb (res) {
                        if (!res.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                            reject('error');
                        }
                        const data = res.data;
                        let permissions = ['index'];
                        data.menu.forEach((m) => {
                            permissions.push(m.href);
                        });
                        commit('SET_PERMISSIONS', permissions);
                        commit('SET_MENU', data.menu);
                        commit('SET_BUTTON', data.button);
                        resolve(permissions);
                    },
                    error (e) {
                        console.log(e);
                        reject(e);
                    }
                });
            });
        },

        /*
         * 第三方验证登录
         * LoginByThirdparty({ commit, state }, code) {
         *   return new Promise((resolve, reject) => {
         *     commit('SET_CODE', code)
         *     loginByThirdparty(state.status, state.email, state.code).then(response => {
         *       commit('SET_TOKEN', response.data.token)
         *       setToken(response.data.token)
         *       resolve()
         *     }).catch(error => {
         *       reject(error)
         *     })
         *   })
         * },
         */

        // 前端 登出
        FedLogOut ({ commit }) {
            return new Promise(resolve => {
                removeToken();
                commit('SET_TOKEN', '');
                commit('SET_PERMISSIONS', []);
                commit('SET_MENU', []);
                commit('SET_BUTTON', []);
                resolve();
            });
        }
    }
};

export default user;
