import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import * as authActions from "../store/actions/auth";
import { DrawerItemList } from "@react-navigation/drawer";
import CustomButton from "./UI/CustomButton";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();
const LogoutButton = (props) => {
    return (
        <View style={styles.button}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <DrawerItemList {...props} />
                <CustomButton
                    title="Logout"
                    onPress={() => {
                        props.dispatch(authActions.logout());
                    }}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default LogoutButton;
