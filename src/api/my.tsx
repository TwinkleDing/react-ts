import HttpRequest from "./index";

export default class My extends HttpRequest {
    static getList = () => this.get("/userList");
}
