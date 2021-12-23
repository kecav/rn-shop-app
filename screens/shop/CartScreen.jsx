import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    ActivityIndicator,
    Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

    const cartItems = useSelector((state) => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a, b) => {
            return a.productId > b.productId ? 1 : -1;
        });
    });
    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:
                    <Text style={styles.amount}>${cartTotalAmount}</Text>
                </Text>
                {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.accent} />
                ) : (
                    <Pressable
                        style={({ pressed }) => [
                            styles.buttonStyle,
                            {
                                opacity: pressed ? 0.75 : 1,
                            },
                            {
                                backgroundColor:
                                    cartItems.length === 0
                                        ? "#bbb"
                                        : Colors.primary,
                            },
                        ]}
                        onPress={sendOrderHandler}
                        disabled={cartItems.length === 0}
                    >
                        <Text style={styles.textStyle}>Order Now</Text>
                    </Pressable>
                )}
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={(itemData) => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        showDelete={true}
                        onRemove={() => {
                            dispatch(
                                cartActions.removeFromCart(
                                    itemData.item.productId
                                )
                            );
                        }}
                    />
                )}
            />
        </View>
    );
};

export const CartCreenOptions = (props) => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
        },
        headerTintColor: "#ffffff",
        headerTitle: "Cart Items",
    };
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
    },
    summaryText: {
        // fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
        marginLeft: 55,
        fontWeight: "bold",
        fontSize: 20,
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        elevation: 3,
        backgroundColor: Colors.primary,
    },
    textStyle: {
        fontSize: 15,
        letterSpacing: 0.25,
        color: "white",
    },
});

export default CartScreen;
