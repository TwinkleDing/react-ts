import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routerList from "./routerList";
import Login from "../views/login";
import store from "../store/index";
import Menus from "../views/menu";
import { RouterType } from "../interface";
import { currentPath } from "../utils/common";

const user: string = store.getState() && store.getState().user ? store.getState().user : "";

function Routes() {
    return (
        <Router>
            {
                user === "" ? <Redirect to="/login" /> : currentPath === "" ? <Redirect to="/undone" /> : ""
            }
            {
                <Switch>
                    <Route exact path="/login" component={Login} />
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
                </Switch>
            }
        </Router>
    );
}

export default Routes;
