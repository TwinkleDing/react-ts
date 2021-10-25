import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import { Router, Switch } from "react-router";
import routerList from "./router/routerList";
import Routes from "./router/index";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                {
                    routerList.map(router =>
                        <Routes
                            key={router.path}
                            path={router.path}
                            component={router.component}>
                        </Routes>
                    )
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
