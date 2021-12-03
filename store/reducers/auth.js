import { LOGIN, LOGOUT, SIGNUP } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return initialState;
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            }
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state;
    }
};