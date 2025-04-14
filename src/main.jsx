import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'; // Esto asume que index.css está en la misma carpeta que main.jsx
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // 👈

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
);
