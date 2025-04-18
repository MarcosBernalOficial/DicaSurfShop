import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';  // Usamos supabase para manejar el registro

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');  // Nuevo campo para el nombre
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            // Usamos supabase para crear el usuario
            const { user, error: signupError } = await supabase.auth.signUp({
                id: data.user.id,
                email,
                password,
                options: {
                    data: {
                        name // Enviamos el nombre al campo de usuario
                    }
                }
            });

            if (signupError) throw signupError;

            // Ahora, si la creación del usuario fue exitosa, insertamos el nombre en la tabla "users" (si es necesario)
            const { error: insertError } = await supabase
                .from('users')
                .upsert([{ id: user.id, email, name }]);  // Usamos upsert para insertar o actualizar

            if (insertError) throw insertError;

            // Redirige a la página de login si el registro es exitoso
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-8 bg-white dark:bg-gray-800 shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Crear Cuenta</h2>

            {error && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded dark:bg-red-800 dark:text-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                    <input
                        type="text"
                        className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                    <input
                        type="password"
                        className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition"
                >
                    Registrarse
                </button>

                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                        Iniciar sesión
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
