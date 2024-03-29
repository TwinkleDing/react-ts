import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Dropdown } from "antd";
import {
	QuestionCircleOutlined,
	UserSwitchOutlined,
	AlignLeftOutlined,
	SettingOutlined,
	DiffOutlined
} from "@ant-design/icons";
import { currentPath } from "@/utils/common";
import store from "@/store/index";
import AvatarImg from "@/assets/avatar.webp";
import "@/css/modules/menu.scss";

const { Header, Content, Footer, Sider } = Layout;

interface routerList {
	name: string;
	icon: string;
	key: string;
	router: string;
}

class Menus extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			routerList: [
				{
					name: "我的任务",
					icon: QuestionCircleOutlined,
					key: "undone",
					router: "/undone"
				},
				{
					name: "发起任务",
					icon: DiffOutlined,
					key: "task",
					router: "/task"
				},
				{
					name: "查看进度",
					icon: AlignLeftOutlined,
					key: "progress",
					router: "/progress"
				},
				{
					name: "人员管理",
					icon: UserSwitchOutlined,
					key: "management",
					router: "/management"
				},
				{
					name: "我的信息",
					icon: SettingOutlined,
					key: "my",
					router: "/my"
				}
			]
		};
	}
	handleClick = (e: any) => {
		this.props.history.push(e.key);
	};
	list() {
		return this.state.routerList.map((item: routerList) => {
			return (
				<Menu.Item key={item.key} icon={<item.icon />}>
					{item.name}
				</Menu.Item>
			);
		});
	}
	render() {
		const currentRoute: routerList = this.state.routerList.filter((item: any) => {
			return window.location.hash.includes(item.router) ? item.key : "";
		})[0];
		const current: string = currentRoute ? currentRoute.key : "undone";

		return (
			<Layout className="app">
				<Header className="app-header">
					<div className="logo">
						<div className="logo-img" />
					</div>
					<div className="header-user">
						<AvatarMenus />
					</div>
				</Header>
				<Layout>
					<Sider width={200}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[current]}
							mode="inline"
							defaultSelectedKeys={[currentPath ? currentPath : "undone"]}
							style={{ height: "100%", borderRight: 0 }}
						>
							{this.list()}
						</Menu>
					</Sider>
					<Layout className="app-content">
						<Breadcrumb style={{ margin: "16px 0" }} />
						<Content className="app-content-content ">{this.props.content}</Content>
						<Footer style={{ textAlign: "center" }}>Ant Design ©2021 Created by Twinkle Ding</Footer>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

interface avatarMenu {
	name: string;
	router: string;
}

class AvatarMenus extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			user: store.getState()?.userInfo || {},
			avatarMenus: [
				{
					name: "我的信息",
					router: "/my"
				},
				{
					name: "退出登录",
					router: "/login"
				}
			]
		};
	}
	componentDidMount() {
		// 类式组件，使用生命周期直接在store.subscribe()中调用setState()即可实现更新数据
		store.subscribe(() => {
			this.setState({});
		});
	}
	list() {
		return this.state.avatarMenus.map((item: avatarMenu, index: number) => {
			return (
				<Menu.Item key={index}>
					<Link to={item.router}>{item.name}</Link>
				</Menu.Item>
			);
		});
	}
	render() {
		const avatar = store.getState()?.userInfo?.value.avatar || AvatarImg;
		const menu = <Menu>{this.list()}</Menu>;

		return (
			<Dropdown overlay={menu} placement="bottomLeft">
				<div>
					<img className="avatar" src={avatar} />
					{this.state.user?.value?.userName}
				</div>
			</Dropdown>
		);
	}
}

export default withRouter(Menus);
