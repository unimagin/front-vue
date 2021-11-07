import { createStore } from 'vuex'
import axios from 'axios';


const store = createStore({
    state: {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user')
    },
    mutations: {
        /* flesh(state) {
             state.user = localStorage.getItem('user');
             state.token = localStorage.getItem('token');
         },*/
        auth_success (state, { token, user }) {
            state.token = token;
            state.user = user;
        },
        selfEdit (state, user) {
            state.user = user;
        },
        logout (state) {
            state.token = '';
            state.user = {};
        },
    },
    actions: {
        Login ({ commit }, { params, checkList }) {
            return new Promise((resolve, reject) => {
                console.log(params);
                // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
                axios.post('/api/user/login', params)
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        user.password = params.password;
                        for (let i = 0; i < checkList.length; i++) {
                            if (checkList[i] == '记住密码') {
                                localStorage.setItem("rememberMe", "true");
                            } else {
                                localStorage.setItem("autoLogin", "true");
                            }
                        }
                        localStorage.setItem('token', JSON.stringify(token))
                        localStorage.setItem('user', JSON.stringify(user))
                        // 更新token
                        commit('auth_success', {
                            token: token,
                            user: user
                        })
                        resolve(resp)
                    })
                    .catch(err => {
                        localStorage.clear();
                        reject(err)
                    })
            })
        },
        SaveEdit ({ commit }, user) {
            return new Promise((resolve, reject) => {
                // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
                axios.post('/api/user/edit', user)
                    .then(resp => {
                        var storageUser = JSON.parse(localStorage.getItem('user'));
                        storageUser.email = resp.data.email;
                        storageUser.bank_number = resp.data.bank_number
                        localStorage.setItem('user', JSON.stringify(storageUser))
                        commit('selfEdit', JSON.stringify(storageUser))
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        LogOut ({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.clear()
                resolve('logout');
            })
        }
    },
    getters: {
        getUser: state => state.user
    }
});
export default store;