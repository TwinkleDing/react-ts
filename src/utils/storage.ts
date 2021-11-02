import {SESSION_STORAGE} from "./common";

const validatenull = (val:any): boolean => {
    if (typeof val === "boolean") {
        return false;
    }
    if (typeof val === "number") {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) {
            return true;
        }
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === "{}") {
            return true;
        }
    } else {
        if (
            val === "null" ||
                val === null ||
                val === "undefined" ||
                val === undefined ||
                val === ""
        ) {
            return true;
        }
        return false;
    }
    return false;
};
/**
 * 存储localStorage
 */

export const setStore = (params: any = {}) => {
    let { name, content, type } = params,
        obj = {
            dataType: typeof content,
            content: content,
            type: type,
            datetime: new Date().getTime()
        };

    if (type === SESSION_STORAGE) {
        window.sessionStorage.setItem(name, JSON.stringify(obj));
    } else {
        window.localStorage.setItem(name, JSON.stringify(obj));
    }
};
/**
 * 获取localStorage
 */
interface getStorageInter {
    name: string,
    debug: boolean
}

export const getStore = (params: getStorageInter = {}) => {
    let { name, debug } = params;
    let obj:any;
    let content;

    obj = window.sessionStorage.getItem(name);
    if (validatenull(obj)) {
        obj = window.localStorage.getItem(name);
    }
    if (validatenull(obj)) {
        return;
    }
    try {
        obj = JSON.parse(obj);
    } catch {
        return obj;
    }
    if (debug) {
        return obj;
    }
    if (obj.dataType === "string") {
        content = obj.content;
    } else if (obj.dataType === "number") {
        content = Number(obj.content);
    } else if (obj.dataType === "boolean") {
        content = eval(obj.content);
    } else if (obj.dataType === "object") {
        content = obj.content;
    }
    return content;
};
/**
 * 删除localStorage
 */

export const removeStore = (params: any = {}) => {
    let { name, type } = params;

    if (type === SESSION_STORAGE) {
        window.sessionStorage.removeItem(name);
    } else {
        window.localStorage.removeItem(name);
    }
};

/**
 * 获取全部localStorage
 */
export const getAllStore = (type: string) => {
    let list = [];

    if (type) {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
            list.push({
                name: window.sessionStorage.key(i),
                content: getStore({
                    name: window.sessionStorage.key(i),
                    type: SESSION_STORAGE
                })
            });
        }
    } else {
        for (let i = 0; i <= window.localStorage.length; i++) {
            list.push({
                name: window.localStorage.key(i),
                content: getStore({
                    name: window.localStorage.key(i)
                })
            });
        }
    }
    return list;
};

/**
 * 清空全部localStorage
 */

export const clearStore = (type: string) => {
    if (type === SESSION_STORAGE) {
        window.sessionStorage.clear();
    } else {
        window.localStorage.clear();
    }
};
