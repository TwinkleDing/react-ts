import React, { Suspense } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import routerList from "./routerList";
import Login from "@/pages/login";
import store from "@/store/index";
import Menus from "@/pages/menu";
import { RouterType } from "@/interface";
import { currentPath } from "@/utils/common";

const user: string = store.getState()?.userInfo?.value?.userId || "";

function Routes() {
	return (
		<ConfigProvider locale={zhCN}>
			<Router>
				{user === "" ? <Redirect to="login" /> : currentPath === "" ? <Redirect to="undone" /> : ""}
				{
					<Switch>
						<Route exact path="/login" component={Login} />
						<Menus
							content={
								<Suspense fallback={<Spin />}>
									<Switch>
										{routerList.map((router: RouterType, index: number) =>
											<Route
												exact
												key={index}
												path={router.path}
												render={(props) =>
													<router.component
														name={router.name}
														routes={router.routes}
														{...props}
													/>
												}
											></Route>
										)}
									</Switch>
								</Suspense>
							}
						/>
					</Switch>
				}
			</Router>
		</ConfigProvider>
	);
}

export default Routes;
