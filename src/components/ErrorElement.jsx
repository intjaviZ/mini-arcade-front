import { useNavigate } from "react-router-dom";

const ErrorElement = ({ mensaje = "Ocurrió un error inesperado" }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center gap-8">

            {/* Título */}
            <h1 className="text-4xl arcade-glow-magenta">
                ⚠ ERROR
            </h1>

            {/* Caja */}
            <div className="arcade-box p-8 flex flex-col gap-6 max-w-md">

                {/* Mensaje dinámico */}
                <p className="arcade-glow-cyan text-sm">
                    {mensaje}
                </p>

                {/* Botones */}
                <div className="flex gap-4 justify-center">
                    <button
                        className="arcade-button"
                        onClick={() => navigate("/")}
                    >
                        Ir al inicio
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

export default ErrorElement;