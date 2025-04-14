import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTabla = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tabla, setTabla] = useState({ nombre: "", precio: "" });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("tablas")) || [];
        const tablaExistente = stored.find((t) => t.id === parseInt(id));
        if (tablaExistente) {
            setTabla(tablaExistente);
        } else {
            navigate("/admin/dashboard");
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTabla({ ...tabla, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const stored = JSON.parse(localStorage.getItem("tablas")) || [];
        const actualizadas = stored.map((t) =>
            t.id === parseInt(id) ? tabla : t
        );
        localStorage.setItem("tablas", JSON.stringify(actualizadas));
        navigate("/admin/dashboard");
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Editar Tabla 📝</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={tabla.nombre}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Precio</label>
                    <input
                        type="number"
                        name="precio"
                        value={tabla.precio}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditTabla;
