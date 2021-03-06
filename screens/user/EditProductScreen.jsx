import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const EditProductScreen = (props) => {
    const dispatch = useDispatch();

    const [prodId, setProdId] = useState(props.route.params.prodId);
    const editedProduct = useSelector((state) =>
        state.products.availableProducts.find((prod) => prod.id === prodId)
    );

    const [isNewProduct, setIsNewProduct] = useState(
        prodId == -1 ? true : false
    );
    const [title, setTitle] = useState(isNewProduct ? "" : editedProduct.title);
    const [imageUrl, setImageUrl] = useState(
        isNewProduct ? "" : editedProduct.imageUrl
    );
    const [price, setPrice] = useState(isNewProduct ? "" : editedProduct.price);
    const [description, setDescription] = useState(
        isNewProduct ? "" : editedProduct.description
    );

    const isInputValid = () => {
        if (isNewProduct) {
            if (
                title.trim().length === 0 ||
                imageUrl.trim().length === 0 ||
                price.trim().length === 0 ||
                description.trim().length === 0
            )
                return false;
        } else {
            if (
                title.trim().length === 0 ||
                imageUrl.trim().length === 0 ||
                description.trim().length === 0
            )
                return false;
        }
        return true;
    };

    const submitHandler = async () => {
        if (!isInputValid()) {
            Alert.alert("Invalid Submit", "Please Enter valid input", [
                { text: "OKAY" },
            ]);
            return;
        }

        if (!isNewProduct) {
            await dispatch(
                productActions.updateProduct(
                    prodId,
                    title,
                    description,
                    imageUrl
                )
            );
            console.log("REQUESTING UPDATE");
        } else {
            await dispatch(
                productActions.createProduct(
                    title,
                    description,
                    imageUrl,
                    price
                )
            );
            console.log("REQUESTING CREATE");
        }
        props.navigation.goBack();
    };

    useEffect(() => {
        if (isNewProduct) {
            props.navigation.setOptions({ headerTitle: "Add new Product" });
        }
        if (props.route.params.submitted) {
            submitHandler();
            props.route.params.submitted = false;
        }
    }, [submitHandler, props.navigation]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        autoCapitalize="sentences"
                        placeholder="Product Title ..."
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        placeholder="Product image link ..."
                    />
                </View>
                {isNewProduct ? (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                            keyboardType="decimal-pad"
                            placeholder="Product price ..."
                        />
                    </View>
                ) : null}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Product decription ..."
                    />
                </View>
            </View>
        </ScrollView>
    );
};

// screen options
export const EditProductScreenOptions = (props) => {
    // console.log(props);
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
        },
        headerTintColor: "#ffffff",
        headerTitle: "Edit Product",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="save"
                    iconName="md-save"
                    onPress={() => {
                        props.navigation.navigate("EditProduct", {
                            submitted: true,
                        });
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
        padding: 10,
    },
    formControl: {
        width: "100%",
    },
    label: {
        // fontFamily: "open-sans-bold",
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 0,
        paddingVertical: 5,
        borderColor: "#ccc",
        borderBottomWidth: 2,
        marginBottom: 5,
    },
});

export default EditProductScreen;
