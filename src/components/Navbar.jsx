import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // 👈 Importamos el contexto del carrito


const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart(); // 👈 Obtenemos los productos del carrito

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // 👈 Contador total

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-500">
                🏄 SurfShop
            </Link>

            <div className="flex items-center space-x-6">
                {user?.role === "admin" && (
                    <Link
                        to="/admin/dashboard"
                        className="text-gray-700 hover:text-blue-500"
                    >
                        Dashboard
                    </Link>
                )}

                <Link to="/cart" className="relative text-gray-700 hover:text-blue-500">
                    🛒 Carrito
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-2">
                            {totalItems}
                        </span>
                    )}
                </Link>

                {!user ? (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-blue-500">
                            Login
                        </Link>
                        <Link to="/register" className="text-gray-700 hover:text-blue-500">
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={logout}
                        className="text-red-500 hover:underline"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
