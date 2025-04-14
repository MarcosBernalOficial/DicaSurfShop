import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import productosData from "../data/productos";

const Home = () => {
    const { addToCart } = useCart();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(productosData);
    }, []);
    

    const categorias = {
        tablas: "Tablas de Surf",
        trajes: "Trajes de Neoprene",
        accesorios: "Accesorios de Neoprene",
    };

    const getFeaturedProduct = (categoria) => {
        return productos.find(
            (producto) => producto.categoria === categoria && producto.stock
        );
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            {/* Producto destacado */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-10">Producto Destacado</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.keys(categorias).map((categoria) => {
                        const productoDestacado = getFeaturedProduct(categoria);
                        return productoDestacado ? (
                            <div
                                key={categoria}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center"
                            >
                                <img
                                    src={productoDestacado.imagen}
                                    alt={productoDestacado.nombre}
                                    className="w-48 h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold">{productoDestacado.nombre}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">
                                    ${productoDestacado.precio}
                                </p>
                                <button
                                    onClick={() => addToCart(productoDestacado)}
                                    className={`mt-4 py-2 px-4 rounded-lg transition-all w-full ${
                                        productoDestacado.stock
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800 cursor-not-allowed"
                                    }`}
                                    disabled={!productoDestacado.stock}
                                >
                                    {productoDestacado.stock ? "Agregar al carrito" : "Sin stock"}
                                </button>
                            </div>
                        ) : null;
                    })}
                </div>
            </div>

            {/* Carrusel de productos en stock por categoría */}
            {Object.keys(categorias).map((categoria) => (
                <section key={categoria} className="mb-16">
                    <h3 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-300 dark:border-gray-600">
                        {categorias[categoria]}
                    </h3>
                    <div className="relative">
                        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hidden">
                            {productos
                                .filter((producto) => producto.categoria === categoria)
                                .map((producto) => (
                                    <div
                                        key={producto.id}
                                        className="flex-shrink-0 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all w-60 flex flex-col justify-between min-h-[370px]"
                                    >
                                        <div>
                                            <img
                                                src={producto.imagen}
                                                alt={producto.nombre}
                                                className="h-48 w-full object-cover rounded-lg mb-4"
                                            />
                                            <h3 className="text-xl font-semibold min-h-[3rem]">
                                                {producto.nombre}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                ${producto.precio}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => addToCart(producto)}
                                            className={`mt-4 py-2 px-4 rounded-lg transition-all ${
                                                producto.stock
                                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                                    : "bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800 cursor-not-allowed"
                                            }`}
                                            disabled={!producto.stock}
                                        >
                                            {producto.stock ? "Agregar al carrito" : "Sin stock"}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Home;
