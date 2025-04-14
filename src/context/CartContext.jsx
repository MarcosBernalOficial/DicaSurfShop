import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase"; // Asegúrate de importar el cliente de Supabase

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Función para agregar un producto al carrito
    const addToCart = async (item) => {
        // Verificar el stock desde Supabase
        const { data, error } = await supabase
            .from('productos')
            .select('stock')
            .eq('id', item.id)
            .single();

        if (error) {
            console.error("Error al verificar stock:", error);
            return;
        }

        // Si hay stock, proceder con la adición al carrito
        if (data.stock > 0) {
            const fixedItem = { ...item, precio: item.precio ?? item.price ?? 0 };

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
        } else {
            console.log("El producto no tiene stock disponible.");
        }
    };

    // Función para disminuir la cantidad del producto en el carrito
    const decreaseFromCart = (id) => {
        setCart((prev) => {
            return prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0);
        });
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        setCart([]);
    };

    // Función para eliminar productos del carrito si ya no tienen stock
    const removeOutOfStockProducts = async () => {
        const updatedCart = [];
        for (let item of cart) {
            const { data, error } = await supabase
                .from('productos')
                .select('stock')
                .eq('id', item.id)
                .single();

            if (error) {
                console.error("Error al verificar stock:", error);
                continue;
            }

            if (data.stock > 0) {
                updatedCart.push(item); // Solo añadir al carrito si sigue teniendo stock
            }
        }

        setCart(updatedCart); // Actualizar carrito con solo productos en stock
    };

    // Esto se llama para verificar si un producto tiene stock y eliminarlo si no
    useEffect(() => {
        removeOutOfStockProducts();
    }, [cart]); // Ejecutar cada vez que el carrito cambia

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseFromCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
