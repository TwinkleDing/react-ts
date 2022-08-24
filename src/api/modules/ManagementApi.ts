import HttpRequest from "../index";

export default class ManagementApi extends HttpRequest {
	static getUserList = (query: object) => this.get("/userList", query);

	static addUser = (data: any) => this.post("/user/add", data);
}
