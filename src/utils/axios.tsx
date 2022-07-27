import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { serialize } from "@/utils/common";
import store from "@/store/index";
import { PROJECT_NAME, LOCAL_STORAGE } from "@/utils/common";
import { setStore } from "@/utils/storage";
// 设置超时时间
axios.defaults.timeout = 100000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
// axios.defaults.withCredentials = true; //没加cookie加上就cors跨域了，不加就好了？
// NProgress Configuration
NProgress.configure({
    showSpinner: false
});
//HTTPrequest拦截
axios.interceptors.request.use(
    (config: any) => {
        NProgress.start(); // start progress bar
        const meta = config.meta || {};

        config.headers["Content-Type"] = "application/json;charset=utf-8";
        const token: string = store.getState()?.token?.value || "";

        if (token) {
            config.headers.Authorization = token;
            config.headers.accessToken = token;
        }
        //headers中配置serialize为true开启序列化
        if (config.method === "post" && meta.isSerialize === true) {
            config.data = serialize(config.data);
        }
        if (config.method === "put" && meta.isSerialize === true) {
            config.data = serialize(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//HTTPresponse拦截
axios.interceptors.response.use(
    res => {
        NProgress.done();
        const status = res.status || 200;
        const message = res.data || "未知错误";
        //如果是401则跳转到登录页面

        if (status === 401) {
            window.location.hash = "login";
            setStore({
                name: PROJECT_NAME,
                type: LOCAL_STORAGE,
                content: {}
            });
        }
        // 如果请求为非200否者默认统一处理
        if (status !== 200) {
            return Promise.reject(message);
        }
        return res.data;
    },
    error => {
        NProgress.done();
        return Promise.reject(error);
    }
);

export default axios;
