import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    FlatList,
    Button,
    ActivityIndicator,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = (props) => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        // setIsLoading(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
        console.log("Reloading");
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            productTitle: title,
        });
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
                <Button
                    title="Try again"
                    onPress={loadProducts}
                    color="black"
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found ! Try adding some</Text>
            </View>
        );
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(
                            itemData.item.id,
                            itemData.item.title
                        );
                    }}
                >
                    <Pressable
                        style={({ pressed }) => [
                            styles.buttonStyle,
                            {
                                opacity: pressed ? 0.75 : 1
                            },
                        ]}
                        // style={styles.buttonStyle}
                        onPress={() => {
                            selectItemHandler(
                                itemData.item.id,
                                itemData.item.title
                            );
                        }}
                    >
                        <Text style={styles.textStyle}>View Details</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.buttonStyle,
                            {
                                opacity: pressed ? 0.75 : 1
                            },
                        ]}
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    >
                        <Text style={styles.textStyle}>Add to Cart</Text>
                    </Pressable>

                    {/* <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(
                                itemData.item.id,
                                itemData.item.title
                            );
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="Add to Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    /> */}
                </ProductItem>
            )}
        />
    );
};

export const ProductsOverviewScreenOptions = (props) => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
        },
        headerTintColor: "#ffffff",
        headerTitle: "All Products",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="cart"
                    iconName="md-cart"
                    onPress={() => {
                        props.navigation.navigate("Cart");
                    }}
                />
            </HeaderButtons>
        ),
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
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        elevation: 3,
        backgroundColor: Colors.primary,
    },
    textStyle: {
        fontSize: 15,
        letterSpacing: 0.25,
        color: "white",
    },
});

export default ProductsOverviewScreen;
