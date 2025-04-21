import React, { useEffect, useState } from 'react';
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import ProductDetail from './components/ProductDetail';
import AuthForm from './components/AuthForm';
import cartIcon from './assets/cart.png';
import cartIconBlack from './assets/cartBlack.png';
import moonIcon from './assets/moon.png';
import sunIcon from './assets/sun.png';
import shopIcon from './assets/shop.png';
import shopIconBlack from './assets/shopBlack.png';

import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Contact from './pages/Contact';

import { supabase } from './supabase';

const App = () => {
    const { user } = useAuth();
    const { cart } = useCart();
    const [tablas, setTablas] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchTablas = async () => {
            const { data, error } = await supabase.from('productos').select('*');
            if (error) {
                console.error("Error al cargar productos:", error.message);
            } else {
                setTablas(data);
            }
        };

        fetchTablas();

        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            localStorage.setItem('darkMode', 'true');
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('darkMode', 'false');
            document.documentElement.classList.remove('dark');
        }
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Router>
            <div className={`font-sans ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
                <header className={`p-4 shadow-md fixed w-full top-0 z-30 dark:border-b dark:border-white  ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link to="/" className="text-3xl font-bold">SQuiero</Link>
                        <nav className="hidden sm:flex">
                            <ul className="flex space-x-6">
                                <li>
                                    <Link to="/shop" className="hover:text-gray-600 dark:hover:text-gray-300">
                                        <img src={shopIconBlack} alt="shop" className="w-6 h-6 object-contain inline dark:hidden" />
                                        <img src={shopIcon} alt="shop" className="w-6 h-6 object-contain hidden dark:inline" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover:text-gray-600 dark:hover:text-gray-300">Contact</Link>
                                </li>
                                <li>
                                    <Link to="/cart" className={`relative px-3 py-1 rounded 
                                        ${cartItemCount > 0 
                                            ? (darkMode ? 'bg-black text-white' : 'bg-white text-white') 
                                            : 'hover:text-gray-600 dark:hover:text-gray-300'}`}>
                                        <img src={cartIconBlack} alt="Carrito" className="w-6 h-6 object-contain inline dark:hidden" />
                                        <img src={cartIcon} alt="Carrito" className="w-6 h-6 object-contain hidden dark:inline" />
                                        {cartItemCount > 0 && (
                                            <span className={`absolute -top-2 -right-2 text-xs rounded-full px-2 py-0.5 
                                                ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                {!user ? (
                                    <>
                                        <li><Link to="/login" className="hover:text-gray-600 dark:hover:text-gray-300">Login</Link></li>
                                        <li><Link to="/register" className="hover:text-gray-600 dark:hover:text-gray-300">Register</Link></li>
                                    </>
                                ) : (
                                    <li><Link to="/account" className="hover:text-gray-600 dark:hover:text-gray-300">Hello, {user.email}</Link></li>
                                )}
                            </ul>
                        </nav>

                        <button onClick={toggleDarkMode} className={`hidden sm:block rounded-full p-2 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            {darkMode
                                ? <img src={moonIcon} alt="moon" className="w-6 h-6 object-contain inline" />
                                : <img src={sunIcon} alt="sun" className="w-6 h-6 object-contain inline" />}
                        </button>

                        <div className="sm:hidden flex items-center space-x-4">
                            <button type="button" onClick={toggleMenu}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <Link to="/cart" className={`relative px-3 py-1 rounded ${cartItemCount > 0 
                                ? (darkMode ? 'bg-white text-black' : 'bg-black text-white') 
                                : 'hover:text-gray-600 dark:hover:text-gray-300'}`}>
                                <img src={cartIconBlack} alt="Carrito" className="w-6 h-6 object-contain inline dark:hidden" />
                                <img src={cartIcon} alt="Carrito" className="w-6 h-6 object-contain hidden dark:inline" />
                                {cartItemCount > 0 && (
                                    <span className={`absolute -top-2 -right-2 text-xs rounded-full px-2 py-0.5 
                                        ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                            <button onClick={toggleDarkMode} className={`rounded-full p-2 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                {darkMode
                                    ? <img src={moonIcon} alt="moon" className="w-6 h-6 object-contain inline" />
                                    : <img src={sunIcon} alt="sun" className="w-6 h-6 object-contain inline" />}
                            </button>
                        </div>
                    </div>
                </header>

                <div className={`sm:hidden ${menuVisible ? "block" : "hidden"} bg-white dark:bg-black z-40 fixed top-16 left-0 w-full`}>
                    <ul className="flex flex-col space-y-4 p-4">
                        <li><Link to="/shop" className="hover:text-gray-600 dark:hover:text-gray-300" onClick={toggleMenu}>Shop</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-600 dark:hover:text-gray-300" onClick={toggleMenu}>Contact</Link></li>
                        {!user ? (
                            <>
                                <li><Link to="/login" className="hover:text-gray-600 dark:hover:text-gray-300" onClick={toggleMenu}>Login</Link></li>
                                <li><Link to="/register" className="hover:text-gray-600 dark:hover:text-gray-300" onClick={toggleMenu}>Register</Link></li>
                            </>
                        ) : (
                            <li><Link to="/account" className="hover:text-gray-600 dark:hover:text-gray-300" onClick={toggleMenu}>Hello, {user.email}</Link></li>
                        )}
                    </ul>
                </div>

                <main className="flex-grow bg-white dark:bg-black pt-16">
                    <Routes>
                        <Route path="/" element={<Home tablas={tablas} />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/account" />} />
                        <Route path="/register" element={!user ? <Register /> : <Navigate to="/account" />} />
                        <Route path="/account" element={user ? <Account /> : <Navigate to="/login" />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/producto/:id" element={<ProductDetail />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>

                <footer className={`bg-white dark:bg-black dark:text-white text-black py-6 mt-auto ${darkMode ? 'border-t border-white' : 'border-t border-black'}`}>
                    <div className="max-w-7xl mx-auto text-center">
                        <p>&copy; 2025 SurfShop. All rights reserved.</p>
                        <div className="mt-4">
                            <a href="#" className="text-gray-400 mx-3 hover:underline">Facebook</a>
                            <a href="#" className="text-gray-400 mx-3 hover:underline">Twitter</a>
                            <a href="#" className="text-gray-400 mx-3 hover:underline">Instagram</a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;
