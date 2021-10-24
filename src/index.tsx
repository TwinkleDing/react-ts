import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import { Route, Router, Switch } from "react-router";
import Form from "./views/form";
import Table from "./views/table";
import Chart from "./views/chart";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/form" component={Form} />
                <Route path="/table" component={Table} />
                <Route path="/chart" component={Chart} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
