import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Autenticar al usuario usando el método de Supabase
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (loginError) {
                setError('❌ Credenciales incorrectas');
                return;
            }

            if (data) {
                // Redirigir al usuario a la página principal (o la ruta que elijas)
                navigate('/');
            } else {
                setError('❌ No se pudo iniciar sesión');
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-8 bg-white dark:bg-gray-800 shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Iniciar Sesión</h2>

            {error && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded dark:bg-red-800 dark:text-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition"
                >
                    Iniciar sesión
                </button>

                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
