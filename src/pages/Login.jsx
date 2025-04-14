import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Importa bcryptjs
import { supabase } from '../supabase'; // Importa la configuración de supabase

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Buscar el usuario en Supabase por email
            const { data, error: loginError } = await supabase
                .from('users')
                .select('email, password')
                .eq('email', email)
                .single();

            if (loginError) throw loginError;

            if (data) {
                // Comparar la contraseña ingresada con la encriptada en la base de datos
                const isPasswordCorrect = await bcrypt.compare(password, data.password);

                if (isPasswordCorrect) {
                    // Si la contraseña es correcta, redirige al usuario
                    navigate('/');
                } else {
                    setError('Credenciales incorrectas');
                }
            } else {
                setError('No se encontró el usuario');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                {error && <div>{error}</div>}
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar sesión</button>
                <div>
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
