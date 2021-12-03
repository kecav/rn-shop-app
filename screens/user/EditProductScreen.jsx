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
    const [isTitleValid, setIsTitleValid] = useState(false);
    const dispatch = useDispatch();

    const { prodId } = props.route.params;
    const editedProduct = useSelector((state) =>
        state.products.userProducts.find((prod) => prod.id === prodId)
    );

    const [title, setTitle] = useState(
        editedProduct ? editedProduct.title : ""
    );
    const [imageUrl, setImageUrl] = useState(
        editedProduct ? editedProduct.imageUrl : ""
    );
    const [price, setPrice] = useState(
        editedProduct ? editedProduct.price : "0"
    );
    const [description, setDescription] = useState(
        editedProduct ? editedProduct.description : ""
    );

    const titleChangeHandler = (text) => {
        if (text.trim().length === 0) {
            setIsTitleValid(false);
        } else {
            setIsTitleValid(true);
        }
        setTitle(text);
    };

    // console.log(editedProduct ? `Update ${prodId}` : "New");

    const submitHandler = useCallback(() => {
        if (!isTitleValid) {
            Alert.alert("Invalid Submit", "Please Enter valid input title", [
                { text: "OKAY" },
            ]);
            return;
        }
        console.log("Submitting!");
        if (editedProduct) {
            dispatch(
                productActions.updateProduct(
                    prodId,
                    title,
                    description,
                    imageUrl
                )
            );
            console.log("UPDATING !!");
        } else {
            dispatch(
                productActions.createProduct(
                    title,
                    description,
                    imageUrl,
                    price
                )
            );
            console.log("CREATING !!");
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price, isTitleValid]);

    useEffect(() => {
        if (props.route.params.submitted) {
            submitHandler();
        }
    }, [submitHandler]);
    // console.log(editedProduct);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={titleChangeHandler}
                        autoCapitalize="sentences"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                    />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                            keyboardType="decimal-pad"
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export const EditProductScreenOptions = (props) => {
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
                        props.navigation.navigate(
                            // "EditProductScreen", {prodId: -1, submitted: true}
                            "EditProductScreen",
                            { submitted: true }
                        );
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: "100%",
    },
    label: {
        // fontFamily: "open-sans-bold",
        fontWeight: "bold",
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
});

export default EditProductScreen;
