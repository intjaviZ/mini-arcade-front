import { useNavigate } from "react-router-dom";

const NoEncontrado = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center gap-8">

            {/* Título */}
            <h1 className="text-6xl font-bold arcade-glow-cyan">
                404
            </h1>

            {/* Subtítulo */}
            <p className="text-xl arcade-glow-magenta">
                Nivel no encontrado
            </p>

            {/* Mensaje */}
            <p className="text-sm text-gray-400 max-w-md">
                Parece que esta sala desapareció en el ciberespacio...
            </p>

            {/* Caja arcade */}
            <div className="arcade-box p-8 flex flex-col gap-6">
                <p className="arcade-glow-cyan">
                    ¿Qué quieres hacer?
                </p>

                <div className="flex gap-6 justify-center">
                    <button
                        className="arcade-button"
                        onClick={() => navigate("/")}
                    >
                        Volver al inicio
                    </button>

                    <button
                        className="arcade-button-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Regresar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoEncontrado;