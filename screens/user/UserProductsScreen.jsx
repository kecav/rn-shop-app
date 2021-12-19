import React from "react";
import { FlatList, Button, Alert, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const UserProductsScreen = (props) => {
    const userProducts = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert("Are you sure ?", "Do you really want to delete this ?", [
            { text: "No", style: "default" },
            {
                text: "Yes",
                style: "destructive",
                onPress: () => {
                    dispatch(productsActions.deleteProduct(id));
                },
            },
        ]);
    };

    if (userProducts.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Products, Start adding some.</Text>
            </View>
        );
    }

    // console.log("UserProductScreen: ", userProducts);

    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {console.log(itemData)}}
                >
                    <Button
                        color={Colors.primary}
                        title="Edit"
                        onPress={() => {
                            props.navigation.navigate("EditProductScreen", {
                                prodId: itemData.item.id,
                            });
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />
                </ProductItem>
            )}
        />
    );
};

export const UserProductScreenOptions = (props) => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
        },
        headerTintColor: "#ffffff",
        title: "User Product",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="drawerMenu"
                    iconName="md-menu"
                    onPress={() => {
                        props.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Edit user product"
                    iconName="md-create"
                    onPress={() => {
                        props.navigation.navigate("EditProductScreen", {
                            prodId: -1,
                        });
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UserProductsScreen;
