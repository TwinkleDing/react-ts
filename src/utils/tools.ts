import type { RcFile } from "antd/es/upload/interface";
export const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export const deepClone = (obj: any) => {
	if (obj === null) {
		return null;
	}
	if (typeof obj !== "object") {
		return obj;
	}
	if (obj.constructor === Date) {
		return new Date(obj);
	}
	if (obj.constructor === RegExp) {
		return new RegExp(obj);
	}
	let newObj = new obj.constructor(); // 保持继承链

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			// 不遍历其原型链上的属性
			let val = obj[key];
			// newObj[key] = typeof val === 'object' ? arguments.callee(val) : val // 使用arguments.callee解除与函数名的耦合

			newObj[key] = typeof val === "object" ? deepClone(obj[key]) : val; // 使用arguments.callee解除与函数名的耦合
		}
	}
	return newObj;
};
