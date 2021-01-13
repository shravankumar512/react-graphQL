import React, { createContext, useReducer } from "react";
import jwtDecode from 'jwt-decode';

export const JWT_TOKEN = 'jwtToken';

const initialState = { user: null };

if (localStorage.getItem(JWT_TOKEN)) {
    const decodedToken = jwtDecode(localStorage.getItem(JWT_TOKEN));
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem(JWT_TOKEN);
    } else {
        initialState.user = decodedToken;
    }
}

export const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
});


function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
}


export function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem(JWT_TOKEN, userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    };

    const logout = () => {
        localStorage.removeItem(JWT_TOKEN);
        dispatch({
            type: "LOGOUT"
        });
    };

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}