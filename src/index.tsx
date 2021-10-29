import React from "react";
import ReactDOM from "react-dom";
import "./css/index.less";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import routerList from "./router/routerList";
import { RouterType } from "./interface";
import store from "./store/index";
import Login from "./views/login";

const user: string = store.getState() && store.getState().user ? store.getState().user : "";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                {
                    user ?
                        routerList.map((router: RouterType, index: number) =>
                            <Route
                                key={index}
                                path={router.path}
                                render={
                                    props => <router.component name={router.name} {...props} />
                                }>
                            </Route>
                        ) :
                        <Route exact path="/login" component={Login} />
                }
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
