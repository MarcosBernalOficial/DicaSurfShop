import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Importa bcryptjs
import { supabase } from '../supabase'; // Importa la configuración de supabase

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            // Encriptar la contraseña antes de enviarla
            const hashedPassword = await bcrypt.hash(password, 10);

            // Registrar al usuario en Supabase con la contraseña encriptada
            const { data, error: signupError } = await supabase
                .from('users')
                .insert([{ email, password: hashedPassword }]);

            if (signupError) throw signupError;

            // Si el registro fue exitoso, redirige al usuario
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {/* Formulario de registro */}
            <form onSubmit={handleSubmit}>
                <h2>Crear Cuenta</h2>
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
                <label>Confirmar Contraseña:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrarse</button>
                <div>
                    ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
