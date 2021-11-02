import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routerList from "./routerList";
import { RouterType } from "../interface";
import Login from "../views/login";
import store from "../store/index";
import Menus from "../views/menu";
import { LOGIN_PATH } from "../utils/common";

const user: string = store.getState() && store.getState().user ? store.getState().user : "";
const path = window.location.href.split("/");
const loginPath = path[path.length - 1];

function Routes() {
    return (
        <Router>
            {
                loginPath === LOGIN_PATH ?
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Redirect to="/login" />
                    </Switch> : ""
            }
            {
                user !== "" ?
                    <div id="app">
                        <Menus content={
                            <Switch>
                                {
                                    routerList.map((router: RouterType, index: number) =>
                                        <Route
                                            exact
                                            key={index}
                                            path={router.path}
                                            render={
                                                props => <router.component name={router.name} routes={router.routes} {...props} />
                                            }>
                                        </Route>
                                    )
                                }
                            </Switch>
                        } />
                    </div> :
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Redirect to="/login" />
                    </Switch>
            }
        </Router>
    );
}

export default Routes;
