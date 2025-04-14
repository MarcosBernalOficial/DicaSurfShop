import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Agrega un producto al carrito (si hay stock)
    const addToCart = async (item) => {
        const { data, error } = await supabase
            .from("productos")
            .select("stock")
            .eq("id", item.id)
            .single();

        if (error) {
            console.error("Error al verificar stock:", error);
            return;
        }

        if (data.stock > 0) {
            const fixedItem = {
                ...item,
                precio: item.precio ?? item.price ?? 0,
            };

            setCart((prev) => {
                const found = prev.find((i) => i.id === fixedItem.id);
                if (found) {
                    return prev.map((i) =>
                        i.id === fixedItem.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    );
                } else {
                    return [...prev, { ...fixedItem, quantity: 1 }];
                }
            });
        } else {
            console.log("El producto no tiene stock disponible.");
        }
    };

    // Disminuye la cantidad de un producto
    const decreaseFromCart = (id) => {
        setCart((prev) =>
            prev
                .map((item) => ({
                    ...item,
                    quantity: item.id === id
                        ? Math.max((Number(item.quantity) || 1) - 1, 0)
                        : item.quantity,
                }))
                .filter((item) => item.quantity > 0)
        );
    };

    // Elimina un producto completamente
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Limpia todo el carrito
    const clearCart = () => {
        setCart([]);
    };

    // Elimina productos del carrito que ya no tienen stock en Supabase
    const removeOutOfStockProducts = async () => {
        try {
            const ids = cart.map((item) => item.id);

            const { data, error } = await supabase
                .from("productos")
                .select("id, stock")
                .in("id", ids);

            if (error) {
                console.error("Error al obtener stocks:", error);
                return;
            }

            const stockMap = new Map(data.map((p) => [p.id, p.stock]));
            const updatedCart = cart.filter((item) => {
                const stock = stockMap.get(item.id);
                return stock > 0;
            });

            if (JSON.stringify(cart) !== JSON.stringify(updatedCart)) {
                setCart(updatedCart);
            }
        } catch (err) {
            console.error("Error general al eliminar sin stock:", err);
        }
    };

    // Al montar, verifica que no haya productos sin stock
    useEffect(() => {
        removeOutOfStockProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseFromCart,
                removeFromCart,
                clearCart,
                removeOutOfStockProducts, // ✅ AHORA exportado
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
