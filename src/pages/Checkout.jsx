import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        email: "",
    });

    const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crear la orden
        const newOrder = {
            id: Date.now(), // ID único simple
            ...formData,
            items: cart,
            total,
        };

        // Obtener órdenes previas
        const storedOrders = JSON.parse(localStorage.getItem("ordenes")) || [];

        // Guardar la nueva orden
        localStorage.setItem("ordenes", JSON.stringify([...storedOrders, newOrder]));

        clearCart(); // Vaciar carrito

        navigate("/orden-confirmada"); // Redirigir a confirmación
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Finalizar Compra 🧾</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Finalizar Compra
                </button>
            </form>
        </div>
    );
};

export default Checkout;
