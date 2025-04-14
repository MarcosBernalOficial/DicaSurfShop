import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { login } = useAuth(); // Podrías tener un register real si implementás backend
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Simulamos registro exitoso
        login({ email });
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-900 px-4 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 transition-all"
            >
                <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-white">Crear Cuenta</h2>

                {error && (
                    <div className="text-red-600 text-sm font-medium text-center">{error}</div>
                )}

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

                <div>
                    <label className="block mb-1 text-sm font-medium dark:text-gray-300">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Registrarse
                </button>

                <div className="text-center text-sm dark:text-gray-400">
                    ¿Ya tenés cuenta?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                        Iniciá sesión
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
