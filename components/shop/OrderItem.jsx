import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";

import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import CustomButton from "../UI/CustomButton";

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>

            <CustomButton
                title={showDetails ? "Hide Details" : "Show Details"}
                onPress={() => {
                    setShowDetails((prevState) => !prevState);
                }}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {props.items.map((cartItem) => (
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.productTitle}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        padding: 20,
        alignItems: "flex-end",
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
    },
    totalAmount: {
        // fontFamily: "open-sans-bold",
        fontWeight: "bold",
        fontSize: 18,
    },
    date: {
        fontSize: 16,
        // fontFamily: "open-sans",
        color: "#888",
    },
    detailItems: {
        width: "100%",
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 16,
        elevation: 3,
        backgroundColor: Colors.primary,
    },
    textStyle: {
        fontSize: 15,
        // lineHeight: 21,
        // fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});

export default OrderItem;
