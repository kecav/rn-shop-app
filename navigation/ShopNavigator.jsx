import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen, {
    ProductsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
    ProductDetailsCreenOptions,
} from "../screens/shop/ProductDetailScreen";
import UserProductsScreen, {
    UserProductScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
    EditProductScreenOptions,
} from "../screens/user/EditProductScreen";
import CartScreen, { CartCreenOptions } from "../screens/shop/CartScreen";
import AuthScreen from "../screens/user/AuthScreen";
import OrderScreen, {OrderScreenOptions} from "../screens/shop/OrderScreen";
import Colors from "../constants/Colors";

const ProductsStackNavigator = createStackNavigator();
const OrdersStackNavigator = createStackNavigator();
const AdminStackNavigator = createStackNavigator();
const ShopDrawerNavigator = createDrawerNavigator();
const AuthStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator>
            <ProductsStackNavigator.Screen
                name="Home"
                component={ProductsOverviewScreen}
                options={ProductsOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={ProductDetailsCreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={CartCreenOptions}
            />
        </ProductsStackNavigator.Navigator>
    );
};

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator>
            <AdminStackNavigator.Screen
                name="UserProducts"
                component={UserProductsScreen}
                options={UserProductScreenOptions}
            />
            <AdminStackNavigator.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={EditProductScreenOptions}
            />
        </AdminStackNavigator.Navigator>
    );
};

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator>
            <OrdersStackNavigator.Screen
                name="Order"
                component={OrderScreen}
                options={OrderScreenOptions}
            />
        </OrdersStackNavigator.Navigator>
    );
};

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name="Auth"
                options={{ headerShown: false }}
                component={AuthScreen}
            />
        </AuthStackNavigator.Navigator>
    );
};

export const ShopNavigator = () => {
    return (
        <ShopDrawerNavigator.Navigator screenOptions={{ headerShown: false }}>
            <ShopDrawerNavigator.Screen
                name="Products"
                component={ProductsNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name="md-cart"
                            size={22}
                            color={props.color}
                        />
                    ),
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name="md-list"
                            size={22}
                            color={props.color}
                        />
                    ),
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name="md-create"
                            size={22}
                            color={props.color}
                        />
                    ),
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
};
