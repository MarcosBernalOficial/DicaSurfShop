import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

const Shop = () => {
    const { addToCart } = useCart();
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState("");
    const [filtros, setFiltros] = useState({ precioMin: "", precioMax: "", categoria: "" });
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [aplicarFiltros, setAplicarFiltros] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const { data, error } = await supabase.from("productos").select("*");
                if (error) throw error;
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener productos:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const categorias = {
        tablas: "Tablas de Surf",
        trajes: "Trajes de Neoprene",
        accesorios: "Accesorios de Neoprene",
    };

    const productosFiltrados = productos
        .filter((producto) => {
            const nombre = producto.nombre?.toLowerCase() || "";
            const categoria = producto.categoria?.toLowerCase() || "";
            const categoriaCompleta = categorias[producto.categoria]?.toLowerCase() || "";
            const textoBusqueda = search.toLowerCase();

            const coincideNombre = nombre.includes(textoBusqueda);
            const coincideCategoria = categoria.includes(textoBusqueda) || categoriaCompleta.includes(textoBusqueda);

            const dentroRangoMin = filtros.precioMin === "" || producto.precio >= parseFloat(filtros.precioMin);
            const dentroRangoMax = filtros.precioMax === "" || producto.precio <= parseFloat(filtros.precioMax);
            const coincideSector = filtros.categoria === "" || producto.categoria === filtros.categoria;

            return (coincideNombre || coincideCategoria) &&
                (!aplicarFiltros || (dentroRangoMin && dentroRangoMax && coincideSector));
        })
        .sort((a, b) => {
            if (a.stock > 0 && b.stock === 0) return -1;
            if (a.stock === 0 && b.stock > 0) return 1;
            return 0;
        });

    const categoriasVisibles = Object.keys(categorias).filter(
        (cat) => productosFiltrados.some((p) => p.categoria === cat)
    );

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre o sector..."
                    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 w-full sm:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                >
                    {mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
                </button>
            </div>

            {mostrarFiltros && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <input
                            type="number"
                            placeholder="Precio mínimo"
                            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 shadow-sm"
                            value={filtros.precioMin}
                            onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Precio máximo"
                            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 shadow-sm"
                            value={filtros.precioMax}
                            onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
                        />
                        <select
                            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 shadow-sm"
                            value={filtros.categoria}
                            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
                        >
                            <option value="">Todos los sectores</option>
                            <option value="tablas">Tablas de Surf</option>
                            <option value="trajes">Trajes de Neoprene</option>
                            <option value="accesorios">Accesorios</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                            onClick={() => setAplicarFiltros(true)}
                        >
                            Aplicar filtros
                        </button>
                        <button
                            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 underline"
                            onClick={() => {
                                setFiltros({ precioMin: "", precioMax: "", categoria: "" });
                                setAplicarFiltros(false);
                            }}
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-300">Cargando productos...</p>
            ) : (
                <>
                    {categoriasVisibles.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-300">No se encontraron productos.</p>
                    ) : (
                        categoriasVisibles.map((categoria) => (
                            <section key={categoria} className="mb-12">
                                <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-300 dark:border-gray-600">
                                    {categorias[categoria]}
                                </h2>
                                <div className="relative">
                                    <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hidden">
                                        {productosFiltrados
                                            .filter((p) => p.categoria === categoria)
                                            .map((producto) => (
                                                <div key={producto.id} className="flex-shrink-0 w-60 flex flex-col">
                                                    <Link to={`/producto/${producto.id}`}>
                                                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col h-full">
                                                            <img
                                                                src={producto.imagen}
                                                                alt={producto.nombre}
                                                                className="h-48 w-full object-cover rounded-lg mb-4"
                                                            />
                                                            <h3 className="text-xl font-semibold mb-1 min-h-[3.5rem]">
                                                                {producto.nombre}
                                                            </h3>
                                                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                                                                ${producto.precio}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                    <div className="mt-2">
                                                        <button
                                                            onClick={() => addToCart(producto)}
                                                            className={`w-full py-2 px-4 rounded-lg transition-all ${
                                                                producto.stock > 0
                                                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                                                    : "bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800 cursor-not-allowed"
                                                            }`}
                                                            disabled={producto.stock === 0}
                                                        >
                                                            {producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </section>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

export default Shop;
