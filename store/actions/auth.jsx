import "../../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
const auth = getAuth();
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
let timer;

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

export const signup = (email, password) => {
    return async (dispatch) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log("SIGNED UP : ");

        dispatch(
            authenticate(
                userCredential._tokenResponse.localId,
                userCredential._tokenResponse.idToken,
                Number(userCredential._tokenResponse.expiresIn) * 1000
            )
        );
        const expirationDate = new Date(
            new Date().getTime() +
                Number(userCredential._tokenResponse.expiresIn) * 1000
        );
        storeData(
            userCredential._tokenResponse.idToken,
            userCredential._tokenResponse.localId,
            expirationDate
        );
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log("SIGNED IN : ");

        dispatch(
            authenticate(
                userCredential._tokenResponse.localId,
                userCredential._tokenResponse.idToken,
                Number(userCredential._tokenResponse.expiresIn) * 1000
            )
        );
        const expirationDate = new Date(
            new Date().getTime() +
                Number(userCredential._tokenResponse.expiresIn) * 1000
        );
        storeData(
            userCredential._tokenResponse.idToken,
            userCredential._tokenResponse.localId,
            expirationDate
        );
    };
};

export const logout = () => {
    clearLogoutTimer();
    // AsyncStorage.removeItem("userData");
    return async (dispatch) => {
        try {
            await signOut(auth);
            console.log("LOGGED OUT\n");
        } catch (error) {
            console.log("ERROR LOGGING OUT");
        }

        dispatch({
            type: LOGOUT,
        });
    };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = (expirationTime) => {
    return (dispatch) => {
        timer = setTimeout(() => {
            console.log("TOKEN EXPIRED LOGGING OUT ");
            dispatch(logout());
        }, expirationTime / 5);
    };
};

const storeData = async (token, userId, expirationDate) => {
    try {
        const userData = JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(),
        });
        // await AsyncStorage.setItem("userData", userData);
    } catch (e) {
        // saving error
        console.log(e);
    }
};
