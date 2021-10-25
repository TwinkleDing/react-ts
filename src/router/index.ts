import React from "react";
import { Route } from "react-router";

function Routes(router) {
    return(
        <Route
            key={router.path}
            path={router.path}
            component={router.component}>
        </Route>
    )
}
export default Routes;