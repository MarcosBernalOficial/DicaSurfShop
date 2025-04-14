import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OrdenConfirmada = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <motion.h1
                className="text-4xl font-bold text-green-600 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                ¡Gracias por tu compra! 🏄‍♂️
            </motion.h1>

            <motion.p
                className="text-lg text-gray-700 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Tu pedido ha sido procesado con éxito. Te enviaremos la confirmación por correo electrónico.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Link
                    to="/"
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Volver a la tienda
                </Link>
            </motion.div>
        </div>
    );
};

export default OrdenConfirmada;
