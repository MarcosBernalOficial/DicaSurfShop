import { useState } from 'react'
import { supabase } from '../supabase'

export default function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })

        if (error) {
        alert(error.message)
        } else {
        alert(isLogin ? 'Inicio de sesión exitoso' : 'Registro exitoso, revisa tu email')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto p-4">
        <h2 className="text-xl font-bold text-center">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>
        <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded"
        />
        <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            {isLogin ? 'Entrar' : 'Crear cuenta'}
        </button>
        <p
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-500 cursor-pointer text-center"
        >
            {isLogin
            ? '¿No tienes cuenta? Regístrate'
            : '¿Ya tienes cuenta? Inicia sesión'}
        </p>
        </form>
    )
}
