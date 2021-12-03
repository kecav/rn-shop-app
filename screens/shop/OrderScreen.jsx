import React, { useEffect } from "react";
// import { Text } from "react-native";
import { FlatList, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/orders";

const OrderScreen = (props) => {
    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orderActions.fetchOrders());
    }, [dispatch]);

    if (orders.length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>
                    No Orders found ! Maybe start adding some products !
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
};

export default OrderScreen;
