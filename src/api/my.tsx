import HttpRequest from "./index";

export default class My extends HttpRequest {
    static getInfo = (params: any) => this.get("/user", params);
}
