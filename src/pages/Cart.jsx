import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { MinusCircle, Trash2 } from "lucide-react";

const Cart = () => {
    const {
        cart,
        removeFromCart,
        decreaseFromCart,
        clearCart,
        removeOutOfStockProducts,
    } = useCart();

    useEffect(() => {
        // Solo eliminamos productos sin stock al montar el componente
        removeOutOfStockProducts();
    }, [removeOutOfStockProducts]);

    const total = cart.reduce((acc, item) => {
        const precio = Number(item.precio) || 0;
        const cantidad = Number(item.quantity) || 0;
        return acc + precio * cantidad;
    }, 0);

    return (
        <div className="max-w-4xl mx-auto p-4 my-8 bg-white shadow-md rounded-xl dark:bg-gray-800 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
                🛒 Tu Carrito
            </h2>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    Tu carrito está vacío.
                </p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item) => {
                            const precio = Number(item.precio) || 0;
                            const cantidad = Number(item.quantity) || 0;

                            return (
                                <li
                                    key={item.id}
                                    className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
                                >
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <img
                                            src={item.imagen}
                                            alt={item.nombre}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold dark:text-white">
                                                {item.nombre}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                ${precio.toFixed(2)} x {cantidad}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                                        <p className="text-lg font-semibold dark:text-white text-center sm:text-right">
                                            ${(precio * cantidad).toFixed(2)}
                                        </p>
                                        <div className="flex gap-2 justify-center sm:justify-end">
                                            <button
                                                onClick={() => decreaseFromCart(item.id)}
                                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition"
                                                title="Quitar uno"
                                            >
                                                <MinusCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition"
                                                title="Eliminar todos"
                                            >
                                                <Trash2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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
                            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
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
