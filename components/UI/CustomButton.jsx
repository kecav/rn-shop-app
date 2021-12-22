import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import Colors from "../../constants/Colors";

const CustomButton = (props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.buttonStyle,
                { opacity: pressed ? 0.75 : 1 },
            ]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={styles.textStyle}>{props.title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        elevation: 3,
        backgroundColor: Colors.primary,
    },
    textStyle: {
        fontSize: 15,
        letterSpacing: 0.25,
        color: "#FFFFFF",
    },
});

export default CustomButton;
