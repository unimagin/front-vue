import axios from 'axios'

// 超时时间
axios.defaults.timeout = 10000;
axios.interceptors.request.use(config => {
    return config;
}, error => {
    setTimeout(() => {
        alert("请求超时！");
    }, 3000)
    return Promise.reject(error)
})

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    //跳转登录
                    this.$store.dispatch('LogOut');
            }
        }
    }
);
export default axios;
