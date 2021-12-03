import React from "react";
import {
    View,
    Text,
    Button,
    ScrollView,
    Image,
    StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
    const { productId } = props.route.params;
    const selectedProduct = useSelector((state) =>
        state.products.availableProducts.find((prod) => prod.id === productId)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: selectedProduct.imageUrl }}
            />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to cart"
                    onPress={() =>
                        dispatch(cartActions.addToCart(selectedProduct))
                    }
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
        </ScrollView>
    );
};

export const ProductDetailsCreenOptions = (props) => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
        },
        headerTintColor: "#ffffff",
        headerTitle: "Product Detail",
    };
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    actions: {
        marginVertical: 20,
        alignItems: "center",
    },
    price: {
        fontSize: 20,
        color: "#dedede",
        textAlign: "center",
    },
    description: {
        marginVertical: 10,
        fontSize: 14,
        textAlign: "center",
    },
});

export default ProductDetailScreen;
