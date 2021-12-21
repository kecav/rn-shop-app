import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";
export const StartupScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                // navigate to auth screen
                dispatch(authActions.setDidTryAL());
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                // navigate to auth screen
                dispatch(authActions.setDidTryAL());
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();
            // navigate to shop home screen
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };
    }, [dispatch]);
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <ActivityIndicator size="large" color="royalblue" />;
        </View>
    );
};
