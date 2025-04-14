import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);

    const login = (user) => {
        setAuthState(user);
    };

    const logout = () => {
        setAuthState(null);
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
