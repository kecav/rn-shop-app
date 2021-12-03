import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
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
import OrderScreen from "../screens/shop/OrderScreen";
import Colors from "../constants/Colors";

const ProductStack = createStackNavigator();
const OrderStack = createStackNavigator();
const AdminStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductScreensStack = () => {
    return (
        <ProductStack.Navigator>
            <ProductStack.Screen
                name="Home"
                component={ProductsOverviewScreen}
                options={ProductsOverviewScreenOptions}
            />
            <ProductStack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={ProductDetailsCreenOptions}
            />
            <ProductStack.Screen
                name="Cart"
                component={CartScreen}
                options={CartCreenOptions}
            />
        </ProductStack.Navigator>
    );
};

const AdminScreensStack = () => {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="User Products"
                component={UserProductsScreen}
                options={UserProductScreenOptions}
            />
            <AdminStack.Screen
                name="EditProductScreen"
                component={EditProductScreen}
                options={EditProductScreenOptions}
            />
        </AdminStack.Navigator>
    );
};

const OrderScreensStack = () => {
    return (
        <OrderStack.Navigator>
            <OrderStack.Screen
                name="OrderScreen"
                component={OrderScreen}
                options={UserProductScreenOptions}
            />
        </OrderStack.Navigator>
    );
};

const DrawerLeft = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Products"
                component={ProductScreensStack}
                options={{
                    headerShown: false,
                    drawerIcon: () => (
                        <Ionicons
                            name="md-cart"
                            size={22}
                            color={Colors.primary}
                        />
                    ),
                    title: "Products",
                }}
            />
            <Drawer.Screen
                name="Orders"
                component={OrderScreensStack}
                options={{
                    headerShown: false,
                    headerTintColor: "#ffffff",
                    drawerIcon: () => (
                        <Ionicons
                            name="md-list"
                            size={22}
                            color={Colors.primary}
                        />
                    ),
                    title: "Orders",
                }}
            />
            <Drawer.Screen
                name="AdminScreensStack"
                component={AdminScreensStack}
                options={{
                    headerShown: false,
                    drawerIcon: () => (
                        <Ionicons
                            name="md-create"
                            size={22}
                            color={Colors.primary}
                        />
                    ),
                    title: "Admin Products",
                }}
            />
        </Drawer.Navigator>
    );
};

const Authentication = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="authScreen" component={AuthScreen} />
        </Stack.Navigator>
    );
};

const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <DrawerLeft />
            {/* <Authentication /> */}
        </NavigationContainer>
    );
};

export default ShopNavigator;
