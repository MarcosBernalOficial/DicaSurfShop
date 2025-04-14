import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cart, removeFromCart, decreaseFromCart, clearCart } = useCart();

    const total = cart.reduce((acc, item) => {
        const precio = parseFloat(item.precio) || 0;
        const cantidad = parseInt(item.quantity) || 0;
        return acc + precio * cantidad;
    }, 0);

    return (
        <div className="max-w-4xl mx-auto p-4 mt-8 bg-white shadow-lg rounded-lg dark:bg-gray-800 min-h-screen margin-botom 2dvh">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">🛒 Tu Carrito</h2>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item) => {
                            const precio = parseFloat(item.precio) || 0;
                            const cantidad = parseInt(item.quantity) || 0;

                            return (
                                <li
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                                >
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <img
                                            src={item.imagen}
                                            alt={item.nombre}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold dark:text-white">{item.nombre}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                ${precio.toFixed(2)} x {cantidad}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
                                        <p className="text-lg font-semibold text-center dark:text-white">
                                            ${(precio * cantidad).toFixed(2)}
                                        </p>
                                        <div className="flex justify-center gap-2 mt-2 sm:mt-0">
                                            <button
                                                onClick={() => decreaseFromCart(item.id)}
                                                className="px-2 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                                            >
                                                ➖ Quitar uno
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                                            >
                                                🗑️ Eliminar todos
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-8 border-t pt-4 border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between text-lg font-semibold mb-4 dark:text-white">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => alert("Implementar pago 🎉")}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                        >
                            Pagar
                        </button>
                        <button
                            onClick={clearCart}
                            className="w-full mt-4 text-sm text-gray-600 hover:underline dark:text-gray-300"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
