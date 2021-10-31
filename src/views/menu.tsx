import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import "../css/menu.scss";

const { Header, Content, Footer, Sider } = Layout;


export default class Menus extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(this.props);
    }
    render() {
        return (
            <Layout className="app-content">
                <Header className="header">
                    <div className="logo" >
                        <div className="logo-img" />
                    </div>
                    {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu> */}
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["task"]}
                            style={{ height: "100%", borderRight: 0 }}>
                            <Menu.Item key="task" icon={<LaptopOutlined />}>
                                <Link to="/task">任务</Link>
                            </Menu.Item>
                            <Menu.Item key="form" icon={<UserOutlined />}>
                                <Link to="/form">我的</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                            }}>
                            {this.props.content}
                        </Content>
                        <Footer style={{ textAlign: "center" }}>Ant Design ©2021 Created by Twinkle Ding</Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}