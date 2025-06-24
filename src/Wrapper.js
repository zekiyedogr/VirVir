import React from "react";
import Router from "./App";
import UserProvider from "./context/Provider";

export default () => {
    return (
        <UserProvider>
            <Router />
        </UserProvider>
    )
}