import { useState } from 'react';

export default function Contact() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [shake, setShake] = useState(false);

    const handleSend = () => {
        if (!message.trim()) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
        }

        const phoneNumber = '2235535852';
        const formattedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/54${phoneNumber}?text=${formattedMessage}`;

        window.open(whatsappURL, '_blank');
        setMessage('');
        setStatus('¡Mensaje enviado!');
        setTimeout(() => setStatus(''), 3000); // Limpia el mensaje en 3 segundos
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Contactanos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
            Escribí tu mensaje y te respondemos por WhatsApp
            </p>
            <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hola! Quisiera hacer una consulta sobre..."
            className={`w-full h-32 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4 transition-all duration-150 ${
                shake ? 'animate-shake' : ''
            }`}
            />
            <button
            onClick={handleSend}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
            Enviar por WhatsApp
            </button>
            {status && (
            <p className="text-green-600 dark:text-green-400 text-center mt-4">
                {status}
            </p>
            )}
        </div>
        </div>
    );
}
