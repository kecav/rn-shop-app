import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
// import { StartupScreen } from "../screens/StartupScreen";

const AppNavigator = (props) => {
    const isAuth = useSelector((state) => !!state.auth.token);
    // const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

    console.log("isAuthenticated : ",isAuth);
    return (
        <NavigationContainer>
            {isAuth ? <ShopNavigator /> : <AuthNavigator />}
            {/* {!isAuth && didTryAutoLogin && <AuthNavigator />} */}
            {/* {!isAuth && !didTryAutoLogin && <StartupScreen />} */}
            {/* <AuthNavigator /> */}
        </NavigationContainer>
    );
};

export default AppNavigator;
