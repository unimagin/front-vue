import axios from 'axios'

// 超时时间
axios.defaults.timeout = 10000;
axios.interceptors.request.use(config => {
    let url = config.url;
    if (url.startsWith('/api/user')) {
        if (localStorage.getItem("token")) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        } else {
            throw new Error("请先登录");
        }
    }
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
