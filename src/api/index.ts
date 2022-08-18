import axios from "@/utils/axios";
import { serviceUrl } from "@/config";

export default class HttpRequest {
	static get(url: string, params = {}) {
		return new Promise((resolve: any) => {
			axios
				.get(`${serviceUrl + url}`, {
					params
				})
				.then((res: any) => {
					resolve(res);
				});
		});
	}

	static post(url: string, params = {}) {
		return new Promise((resolve: any) => {
			axios
				.post(`${serviceUrl + url}`, {
					...params
				})
				.then((res: any) => {
					resolve(res);
				});
		});
	}
}
