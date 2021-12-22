// import React, { useEffect } from "react";
// import { View, ActivityIndicator } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from "react-redux";

// import * as authActions from "../store/actions/auth";
// export const StartupScreen = (props) => {
//     // const navigation = useNavigation();
//     const dispatch = useDispatch();
    
//     useEffect(() => {
//         const tryLogin = async () => {
//             const userData = await AsyncStorage.getItem("userData");
//             console.log("PROPS ", userData);
//             if (!userData) {
//                 // navigate to auth screen
//                 navigation.navigate("Auth")
//                 dispatch(authActions.setDidTryAL());
//                 return;
//             }
//             const transformedData = JSON.parse(userData);
//             const { token, userId, expiryDate } = transformedData;
//             const expirationDate = new Date(expiryDate);

//             if (expirationDate <= new Date() || !token || !userId) {
//                 // navigate to auth screen
//                 navigation.navigate("Auth")
//                 dispatch(authActions.setDidTryAL());
//                 return;
//             }

//             const expirationTime =
//                 expirationDate.getTime() - new Date().getTime();
//             // navigate to shop home screen
//                 navigation.navigate("Products")
//             dispatch(authActions.authenticate(userId, token, expirationTime));
//         };
//         tryLogin();
//     }, [dispatch]);
//     return (
//         <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//             <ActivityIndicator size="large" color="royalblue" />
//         </View>
//     );
// };
