import HttpRequest from "../index";

export default class ManagementApi extends HttpRequest {
	static userList = () => this.get("/userList");
}
