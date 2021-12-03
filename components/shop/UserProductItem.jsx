import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const UserProductItem = (props) => {
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }
    return (
        //<View style={styles.productContainer}>
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={props.onViewDetail} useForeground>
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: props.image }}
                        />
                        <View style={styles.details}>
                            <Text>{props.title}</Text>
                            <Text>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button
                                color={Colors.primary}
                                title="View details"
                                onPress={props.onViewDetail}
                            />
                            <Button
                                color={Colors.primary}
                                title="To cart"
                                onPress={props.onAddToCart}
                            />
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </View>
        //</View>
    );
};

const styles = StyleSheet.create({
    product: {
        elevation: 0.5,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        height: 300,
        margin: 20,
    },
    touchable: {
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "60%",
    },
    title: { fontSize: 18, marginVertical: 5 },
    price: { fontSize: 14, color: "#dedede" },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    details: {
        alignItems: "center",
        marginVertical: 5,
    },
    productContainer: {
        elevation: 5,
        borderWidth: 5,
    },
});

export default UserProductItem;
