import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routerList from "./routerList";
import { RouterType } from "../interface";
import Login from "../views/login";
import store from "../store/index";

const user: string = store.getState() && store.getState().user ? store.getState().user : "";

function Routes() {
    return (
        <Router>
            {
                user ?
                    <Switch>
                        {
                            routerList.map((router: RouterType, index: number) =>
                                <Route
                                    key={index}
                                    path={router.path}
                                    render={
                                        props => <router.component name={router.name} {...props} />
                                    }>
                                </Route>
                            )
                        }
                    </Switch> :
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Redirect to="/login" />
                    </Switch>
            }
        </Router>
    );
}

export default Routes;