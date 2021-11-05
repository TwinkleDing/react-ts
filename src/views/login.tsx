import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { FormInstance } from "antd/es/form";
import "../css/login.scss";
import store from "../store/index";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

export default class Login extends React.Component<any, any> {
    formRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            login: true
        };
        this.formRef = React.createRef<FormInstance>();
    }

    onFinish = (values: any) => {
        console.log(values);
        const action = {
            type: "USER",
            value: values.username
        };

        store.dispatch(action);
        this.props.history.push("/home");
    };

    onReset = () => {
        this.setState({
            login: !this.state.login
        });
        this.formRef.current!.resetFields();
    };

    render() {
        return (
            <div className="login">
                <div className={`login-box ${this.state.login ? "reg-login-box" : "login-reg-box"}`}>
                    <Form
                        name="control-ref"
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        {...layout}
                        className={`login-form ${this.state.login ? "translateY0" : "translateY-120"}`}>
                        <Form.Item
                            label="工号"
                            name="username"
                            rules={[{ required: this.state.login, message: "请输入工号!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: this.state.login, message: "请输入密码!" }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Row>
                                <Col span={10}>
                                    <Button type="primary" htmlType="submit">
                                        {this.state.login ? "登录" : "确认注册"}
                                    </Button>
                                </Col>
                                <Col span={6}>
                                    <Button htmlType="button" onClick={this.onReset}>
                                        {this.state.login ? "注册" : "返回登陆"}
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Register login={this.state.login} />
                    </Form>
                </div>
            </div>
        );
    }
}

function Register(props: any) {
    return (
        <div>
            <Form.Item
                label="工号"
                name="regUsername"
                rules={[{ required: !props.login, message: "请输入工号!" }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="密码"
                name="regPassword"
                rules={[{ required: !props.login, message: "请输入密码!" }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="再次输入密码"
                name="regPasswordAgain"
                rules={[{ required: !props.login, message: "请再次输入密码!" }]}>
                <Input.Password />
            </Form.Item>
        </div>
    );
}
