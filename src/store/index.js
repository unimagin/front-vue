import { createStore } from 'vuex'
import axios from 'axios';


const store = createStore({
    state: {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user'),
        unreadNum: localStorage.getItem('unreadNum')
    },
    mutations: {
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
                // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
                axios.post('/api/login', params)
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.clear();
                        user.password = params.password;
                        for (let i = 0; i < checkList.length; i++) {
                            if (checkList[i] == '记住密码') {
                                localStorage.setItem("rememberMe", "true");
                            } else {
                                localStorage.setItem("autoLogin", "true");
                            }
                        }
                        localStorage.setItem('token', token.toString())
                        localStorage.setItem('user', JSON.stringify(user))
                        axios.post('/api/user/get_unreadnum', {})
                            .then(resp => {
                                localStorage.setItem('unreadNum', resp.data.unreadNum)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        // 更新token
                        commit('auth_success', {
                            token: token,
                            user: JSON.stringify(user)
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
});
export default store;