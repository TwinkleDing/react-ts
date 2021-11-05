import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { QuestionCircleOutlined, AlignLeftOutlined, DiffOutlined, UserSwitchOutlined, SettingOutlined } from "@ant-design/icons";
import "../css/menu.scss";
import { currentPath } from "../utils/common";

const { Header, Content, Footer, Sider } = Layout;


export default class Menus extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
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
                            defaultSelectedKeys={[currentPath ? currentPath : "undone"]}
                            style={{ height: "100%", borderRight: 0 }}>
                            <Menu.Item key="undone" icon={<QuestionCircleOutlined />}>
                                <Link to="/undone">未完成的</Link>
                            </Menu.Item>
                            <Menu.Item key="task" icon={<DiffOutlined />}>
                                <Link to="/task">发起任务</Link>
                            </Menu.Item>
                            <Menu.Item key="progress" icon={<AlignLeftOutlined />}>
                                <Link to="/progress">查看进度</Link>
                            </Menu.Item>
                            <Menu.Item key="management" icon={<UserSwitchOutlined />}>
                                <Link to="/management">人员管理</Link>
                            </Menu.Item>
                            <Menu.Item key="my" icon={<SettingOutlined />}>
                                <Link to="/my">我的信息</Link>
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
