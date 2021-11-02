import { LOCAL_STORAGE, SESSION_STORAGE, validateNull } from "./common";

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
    type: string
}

export const getStore = (params: getStorageInter) => {
    let { name, type } = params;
    let obj: any;
    let content;

    if (type === SESSION_STORAGE) {
        obj = window.sessionStorage.getItem(name);
    } else {
        obj = window.localStorage.getItem(name);
    }
    if (validateNull(obj)) {
        return;
    }
    try {
        obj = JSON.parse(obj);
    } catch {
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

    if (type === SESSION_STORAGE) {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
            let name = window.sessionStorage.key(i);

            if (name === null) {
                break;
            }
            list.push({
                name: name,
                content: getStore({
                    name: name,
                    type: SESSION_STORAGE
                })
            });
        }
    } else {
        for (let i = 0; i <= window.localStorage.length; i++) {
            let name = window.localStorage.key(i);

            if (name === null) {
                break;
            }
            list.push({
                name: name,
                content: getStore({
                    name: name,
                    type: LOCAL_STORAGE
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
