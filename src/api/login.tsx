import HttpRequest from "./index";

export default class Login extends HttpRequest {
    static login = (data: any) => this.post("/user/login", data);


    static register = (data: any) => this.post("/user/register", data);

}
