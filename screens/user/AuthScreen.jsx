import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Alert,
    Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const AuthScreen = (props) => {
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (error) {
            Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
        }
    }, [error]);

    const authHandler = async () => {
        setIsLoading(true);
        setError(null);
        console.log("EMAIL: ", email, " PASS:", password);
        try {
            if (isSignUp) {
                await dispatch(authActions.signup(email, password));
            } else {
                await dispatch(authActions.signin(email, password));
            }            
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    return (
        <LinearGradient colors={["#4630eb", "#2747fe"]} style={styles.gradient}>
            <View style={styles.authContainer}>
                <ScrollView>
                    <TextInput
                        id="email"
                        label="E-Mail"
                        keyboardType="email-address"
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please enter a valid email address."
                        onChangeText={(text) => setEmail(text)}
                        initialValue=""
                        placeholder="Enter email"
                        style={styles.input}
                    />
                    <TextInput
                        id="password"
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid password."
                        onChangeText={(text) => setPassword(text)}
                        initialValue=""
                        placeholder="Enter password"
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <Button
                                title={isSignUp ? "Sign Up" : "Login"}
                                color="#999999"
                                onPress={authHandler}
                            />
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={`Switch to ${
                                isSignUp ? "Login" : "Sign Up"
                            }`}
                            color="#0000ff"
                            onPress={() => {
                                setIsSignUp((prevState) => !prevState);
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    authContainer: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    input :{
        borderWidth: 1,
        marginVertical: 5,
        padding: 5,
        paddingHorizontal: 10,
        borderColor: '#dedede',
        borderRadius: 5
    }
});

export default AuthScreen;
