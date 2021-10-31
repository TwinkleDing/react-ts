import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { FormInstance } from "antd/es/form";
import "../css/login.scss";

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
                    <Form className={`login-form ${this.state.login ? "reg-login-form" : "login-reg-form"}`}
                        {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: "Please input your username!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}>
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
                        <Register />
                    </Form>
                </div>
            </div>
        );
    }
}

class Register extends React.Component {
    render() {
        return (
            <div>
                <Form.Item
                    label="Username"
                    name="regUsername"
                    rules={[{ required: true, message: "Please input your username!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="regPassword"
                    rules={[{ required: true, message: "Please input your password!" }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="PasswordAgain"
                    name="regPasswordAgain"
                    rules={[{ required: true, message: "Please input your password!" }]}>
                    <Input.Password />
                </Form.Item>
            </div>
        );
    }
}