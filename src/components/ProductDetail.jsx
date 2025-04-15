import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import { useSession } from '@supabase/auth-helpers-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const session = useSession();
    const { addToCart } = useCart();
    const [producto, setProducto] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [comentarioNuevo, setComentarioNuevo] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducto = async () => {
            const { data, error } = await supabase
                .from('productos')
                .select('*')
                .eq('id', id)
                .single();

            if (!error) setProducto(data);
            setLoading(false);
        };

        fetchProducto();
    }, [id]);

    useEffect(() => {
        const fetchComentarios = async () => {
            const { data, error } = await supabase
                .from('comentarios')
                .select('*')
                .eq('producto_id', id)
                .order('created_at', { ascending: false });

            if (!error) setComentarios(data);
        };

        fetchComentarios();
    }, [id]);

    const handleComentarioSubmit = async (e) => {
        e.preventDefault();

        if (!session) {
            alert('Debes iniciar sesión para comentar.');
            return;
        }

        const { data, error } = await supabase
            .from('comentarios')
            .insert([{
                producto_id: id,
                usuario_email: session.user.email,
                comentario: comentarioNuevo,
                calificacion: calificacion
            }]);

        if (!error) {
            setComentarioNuevo('');
            setCalificacion('');
            setComentarios(prev => [data[0], ...prev]);
        } else {
            console.error(error);
        }
    };

    if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
    if (!producto) return <p className="text-center mt-10">Producto no encontrado</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-6 text-gray-900 dark:text-white">
            <h2 className="text-4xl font-bold mb-8 text-center">{producto.nombre}</h2>

            <div className="grid md:grid-cols-2 gap-8 items-start mb-10">
                {/* Imágenes */}
                <div className="flex space-x-4 overflow-x-auto">
                    {producto.imagenes?.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Imagen ${index + 1}`}
                            className="w-48 h-48 object-cover rounded-lg shadow"
                        />
                    ))}
                </div>

                {/* Info del producto */}
                <div>
                    <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        ${producto.precio}
                    </p>
                    <p className="mb-2"><strong>Categoría:</strong> {producto.categoria}</p>
                    <p className="mb-2"><strong>Stock:</strong> {producto.stock}</p>
                    <p className="mb-4"><strong>Descripción:</strong> {producto.description}</p>

                    <button
                        className={`w-full py-3 px-6 text-white font-semibold rounded-xl transition-all 
                            ${producto.stock > 0
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-red-300 cursor-not-allowed'}`}
                        onClick={() => producto.stock > 0 && addToCart(producto)}
                        disabled={producto.stock === 0}
                    >
                        {producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                    </button>
                </div>
            </div>

            <hr className="my-6 border-gray-300 dark:border-gray-700" />

            {/* Comentarios */}
            <h3 className="text-2xl font-semibold mb-4">Comentarios</h3>

            {comentarios.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No hay comentarios aún.</p>
            ) : (
                <div className="space-y-4 mb-8">
                    {comentarios.map((c) => (
                        <div key={c.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.usuario_email}</span>
                                <span className="text-yellow-500 text-sm">{'⭐'.repeat(c.calificacion)}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 italic">{c.comentario}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Formulario comentario */}
            {session && (
                <form onSubmit={handleComentarioSubmit} className="space-y-4">
                    <textarea
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        placeholder="Escribe tu comentario..."
                        value={comentarioNuevo}
                        onChange={(e) => setComentarioNuevo(e.target.value)}
                        required
                    />
                    <select
                        value={calificacion}
                        onChange={(e) => setCalificacion(parseInt(e.target.value))}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        required
                    >
                        <option value="">Selecciona una calificación</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num} estrella{num > 1 && 's'}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold"
                    >
                        Enviar comentario
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductDetail;
