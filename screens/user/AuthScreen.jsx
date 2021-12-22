import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth.jsx";
import { LinearGradient } from "expo-linear-gradient";
// import Colors from '../../constants/Colors';

const AuthScreen = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
        }
    }, [error]);

    const authHandler = async (method) => {
        setIsLoading(true);
        setError(null);

        if(email.trim().length==0 || password.trim().length==0){
            setError("Please enter valid credentials");
            setIsLoading(false);
            return;
        }

        console.log(method, "EMAIL: ", email, " PASS:", password);
        try {
            if (method === "signup") {
                await dispatch(authActions.signup(email, password));
                props.navigation.navigate("Products");
                // console.log(props);
            } else if ((method = "login")) {
                await dispatch(authActions.login(email, password));
            }
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={["#0093E9", "#CE9FFC"]}
                style={styles.background}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        keyboardType="default"
                        onChangeText={(text) => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#f00" />
                ) : (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                authHandler("login");
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                authHandler("signup");
                            }}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        fontSize: 16
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782f9",
        width: "100%",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "#ffffff",
        marginTop: 5,
        borderColor: "#0782f9",
        borderWidth: 2,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782f9",
        fontWeight: "700",
        fontSize: 16,
    },
    background: { flex: 1, justifyContent: "center", alignItems: "center", width: '100%' },
});

export default AuthScreen;
