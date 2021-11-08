export const LOCAL_STORAGE = "localStorage";
export const SESSION_STORAGE = "sessionStorage";
export const PROJECT_NAME = "react-ts";
export const LOGIN_PATH = "login";

export const validateNull = (val: any): boolean => {
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

const pathArr = window.location.href.split("/");

export const currentPath = pathArr[pathArr.length - 1];

//表单序列化
export const serialize = (data: any) => {
    let list: any = [];

    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`);
    });
    return list.join("&");
};
