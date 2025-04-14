import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simulada (acá deberías conectar con backend en el futuro)
        if (!email || !password) return;

        login({ email });
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-900 px-4 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 transition-all"
            >
                <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-white">Iniciar Sesión</h2>

                <div>
                    <label className="block mb-1 text-sm font-medium dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium dark:text-gray-300">Contraseña</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Iniciar Sesión
                </button>

                <div className="text-center text-sm dark:text-gray-400">
                    ¿No tenés cuenta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                        Registrate acá
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
