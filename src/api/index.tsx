import axios from "@/utils/axios";

/**
 * mongoose 数据库
*/
const service = "http://localhost:3333/api";

export default class HttpRequest {
    static get(url: string, params = {}) {
        return new Promise((resolve: any) => {
            axios.get(`${service + url}`, {
                params
            }).then((res: any) => {
                resolve(res);
            });
        });
    }

    static post(url: string, params = {}) {
        return new Promise((resolve: any) => {
            axios.post(`${service + url}`, {
                ...params
            }).then((res: any) => {
                resolve(res);
            });
        });
    }
}

