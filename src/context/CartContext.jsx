import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        console.log("Carrito desde localStorage:", storedCart); // Verifica lo que se lee desde localStorage
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        console.log("Carrito actualizado:", cart); // Verifica cada vez que se actualiza el carrito
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const fixedItem = {
            ...item,
            precio: item.precio ?? item.price ?? 0,
        };

        console.log("Añadiendo al carrito:", fixedItem); // Verifica qué producto se está añadiendo

        setCart((prev) => {
            const found = prev.find((i) => i.id === fixedItem.id);
            if (found) {
                return prev.map((i) =>
                    i.id === fixedItem.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prev, { ...fixedItem, quantity: 1 }];
            }
        });
    };

    const decreaseFromCart = (id) => {
        console.log("Disminuyendo cantidad del producto con id:", id); // Verifica el id del producto al disminuir
        setCart((prev) => {
            return prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0);
        });
    };

    const removeFromCart = (id) => {
        console.log("Eliminando producto con id:", id); // Verifica el id del producto al eliminar
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        console.log("Vaciar carrito"); // Verifica cuando se vacía el carrito
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, decreaseFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
