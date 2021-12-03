export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";

export const signup = (email, password) => {
    return async(dispatch) => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_pqoqEzXRtrTEyrXASTDoWZ_ccgXW_ww`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong !";
            if (errorId === "EMAIL_EXISTS") {
                message = "This email already exists !";
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    };
};

export const login = (email, password) => {
    return async(dispatch) => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_pqoqEzXRtrTEyrXASTDoWZ_ccgXW_ww`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong !";
            if (errorId === "EMAIL_NOT_FOUND") {
                message = "This email could not be found !";
            } else if (errorId === "INVALID_PASSWORD") {
                message = "This password is not valid !";
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        // dispatch({ type: SIGNIN, token: resData.idToken, userId: resData.localId  });
    };
};

export const logout = () => {
    return { type: LOGOUT };
}