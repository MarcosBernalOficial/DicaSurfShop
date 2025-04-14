import React, { useEffect, useState } from 'react';
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

const App = () => {
    const { user } = useAuth();
    const { cart } = useCart();
    const [tablas, setTablas] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const productos = [
            {
                id: 1,
                nombre: "Classic Surfboard",
                precio: 499.99,
                imagen: "/images/surfboard1.jpg",
                categoria: "Tablas de surf",
                stock: 5,
            },
            {
                id: 2,
                nombre: "Wetsuit Pro",
                precio: 199.99,
                imagen: "/images/wetsuit1.jpg",
                categoria: "Trajes de neoprene",
                stock: 3,
            },
            {
                id: 3,
                nombre: "Surf Gloves",
                precio: 29.99,
                imagen: "/images/gloves1.jpg",
                categoria: "Accesorios",
                stock: 10,
            },
            {
                id: 4,
                nombre: "Booties Xtreme",
                precio: 59.99,
                imagen: "/images/booties1.jpg",
                categoria: "Accesorios",
                stock: 0,
            },
            {
                id: 5,
                nombre: "Neoprene Hood",
                precio: 39.99,
                imagen: "/images/hood1.jpg",
                categoria: "Accesorios",
                stock: 8,
            },
        ];
        setTablas(productos);

        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setDarkMode(true);
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, []);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            localStorage.setItem('darkMode', 'true');
            document.body.classList.add('dark');
        } else {
            localStorage.setItem('darkMode', 'false');
            document.body.classList.remove('dark');
        }
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Router>
            <div className={`font-sans ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen flex flex-col`}>
                {/* Encabezado */}
                <header className={`${darkMode ? 'bg-blue-600' : 'bg-blue-600'} text-white p-4 shadow-md fixed w-full top-0 z-30`}>
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className={`${darkMode ? 'text-gray-100' : 'text-gray-100'} text-2xl font-bold`}>SurfShop</div>
                        <nav className="hidden sm:flex">
                            <ul className="flex space-x-6">
                                <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
                                <li><Link to="/shop" className="hover:text-blue-200">Shop</Link></li>
                                <li><a href="#contact" className="hover:text-blue-200">Contact</a></li>
                                <li>
                                    <Link to="/cart" className={`relative px-3 py-1 rounded 
                                        ${cartItemCount > 0 
                                            ? (darkMode ? 'bg-blue-900 text-white' : 'bg-white text-gray-900') 
                                            : 'hover:text-blue-200'}`}>
                                        Cart
                                        {cartItemCount > 0 && (
                                            <span className={`absolute -top-2 -right-2 text-xs rounded-full px-2 py-0.5 
                                                ${darkMode ? 'bg-white text-black' : 'bg-blue-900 text-white'}`}>
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                {!user ? (
                                    <>
                                        <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
                                        <li><Link to="/register" className="hover:text-blue-200">Register</Link></li>
                                    </>
                                ) : (
                                    <li><Link to="/account" className="hover:text-blue-200">Hello, {user.email}</Link></li>
                                )}
                            </ul>
                        </nav>

                        {/* Botón modo oscuro (desktop) */}
                        <button
                            onClick={toggleDarkMode}
                            className={`hidden sm:block ${darkMode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-full p-2`}
                        >
                            {darkMode ? '🌙' : '🌞'}
                        </button>

                        {/* Mobile menu */}
                        <div className="sm:hidden flex items-center space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className={`${darkMode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-full p-2`}
                            >
                                {darkMode ? '🌙' : '🌞'}
                            </button>
                            <button type="button" className="text-white" onClick={toggleMenu}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Menú móvil */}
                <div className={`sm:hidden ${menuVisible ? "block" : "hidden"} bg-blue-600 text-white z-40 fixed top-16 left-0 w-full`}>
                    <ul className="flex flex-col space-y-4 p-4">
                        <li><Link to="/" className="hover:text-blue-200" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/shop" className="hover:text-blue-200" onClick={toggleMenu}>Shop</Link></li>
                        <li><a href="#contact" className="hover:text-blue-200" onClick={toggleMenu}>Contact</a></li>
                        <li><a href="#cart" className="hover:text-blue-200" onClick={toggleMenu}>Cart</a></li>
                        {!user ? (
                            <>
                                <li><Link to="/login" className="hover:text-blue-200" onClick={toggleMenu}>Login</Link></li>
                                <li><Link to="/register" className="hover:text-blue-200" onClick={toggleMenu}>Register</Link></li>
                            </>
                        ) : (
                            <li><Link to="/account" className="hover:text-blue-200" onClick={toggleMenu}>Hello, {user.email}</Link></li>
                        )}
                    </ul>
                </div>

                {/* Contenido principal */}
                <main className="flex-grow bg-gray-900 pt-16"> {/* Agregué 'pt-16' para dar espacio al header fijo */}
                    <Routes>
                        <Route path="/" element={<Home tablas={tablas} />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/account" />} />
                        <Route path="/register" element={!user ? <Register /> : <Navigate to="/account" />} />
                        <Route path="/account" element={user ? <Account /> : <Navigate to="/login" />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-6 mt-auto">
                    <div className="max-w-7xl mx-auto text-center">
                        <p>&copy; 2025 SurfShop. All rights reserved.</p>
                        <div className="mt-4">
                            <a href="#" className="text-blue-400 mx-3 hover:underline">Facebook</a>
                            <a href="#" className="text-blue-400 mx-3 hover:underline">Twitter</a>
                            <a href="#" className="text-blue-400 mx-3 hover:underline">Instagram</a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;
