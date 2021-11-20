import axios from "./axios";
const service = "http://localhost:8080";

const get = (url: string, params = {}) => {
    return new Promise((resolve: any) => {
        axios.get(`${service + url}`, {
            ...params
        }).then(res => {
            resolve(res);
        });
    });
};

const post = (url: string, params = {}) => {
    return new Promise((resolve: any) => {
        axios.post(`${service + url}`, {
            ...params
        }).then(res => {
            resolve(res);
        });
    });
};

export default {
    get,
    post
};
