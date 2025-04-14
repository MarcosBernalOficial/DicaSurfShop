import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // 👈 Importar navigate

const Dashboard = () => {
    const { user } = useAuth();
    const [tablas, setTablas] = useState([]);
    const [nuevaTabla, setNuevaTabla] = useState({ nombre: "", precio: "" });
    const navigate = useNavigate(); // 👈 Instancia de navigate

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("tablas")) || [];
        setTablas(stored);
    }, []);

    const guardarTablas = (tablasActualizadas) => {
        localStorage.setItem("tablas", JSON.stringify(tablasActualizadas));
        setTablas(tablasActualizadas);
    };

    const agregarTabla = (e) => {
        e.preventDefault();
        const nueva = {
            id: Date.now(),
            nombre: nuevaTabla.nombre,
            precio: nuevaTabla.precio,
        };
        guardarTablas([...tablas, nueva]);
        setNuevaTabla({ nombre: "", precio: "" });
    };

    const eliminarTabla = (id) => {
        const actualizadas = tablas.filter((tabla) => tabla.id !== id);
        guardarTablas(actualizadas);
    };

    if (user?.role !== "admin") {
        return <div className="text-center mt-10 text-xl">Acceso denegado 🛑</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">Panel de Administración 🛠️</h2>

            <form onSubmit={agregarTabla} className="mb-6 flex gap-4">
                <input
                    type="text"
                    placeholder="Nombre de la tabla"
                    value={nuevaTabla.nombre}
                    onChange={(e) =>
                        setNuevaTabla({ ...nuevaTabla, nombre: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={nuevaTabla.precio}
                    onChange={(e) =>
                        setNuevaTabla({ ...nuevaTabla, precio: e.target.value })
                    }
                    className="border p-2 rounded w-40"
                    required
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Agregar
                </button>
            </form>

            <ul className="space-y-3">
                {tablas.map((tabla) => (
                    <li
                        key={tabla.id}
                        className="flex justify-between items-center bg-white p-4 rounded shadow"
                    >
                        <div>
                            <strong>{tabla.nombre}</strong> - ${tabla.precio}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate(`/admin/editar/${tabla.id}`)} // 👈 Redirección
                                className="text-yellow-500 hover:text-yellow-700"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => eliminarTabla(tabla.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
