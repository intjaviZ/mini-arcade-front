const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center gap-10 px-6">

            {/* Título */}
            <h1 className="text-4xl arcade-glow-cyan">
                MINI ARCADE 🎮
            </h1>

            {/* Descripción */}
            <div className="arcade-box p-6 max-w-2xl flex flex-col gap-4">
                <p className="text-sm text-gray-300">
                    Mini Arcade es una plataforma web interactiva que permite a dos jugadores
                    competir en juegos clásicos como Gato (Tic-Tac-Toe) y Conecta 4 en tiempo real.
                </p>

                <p className="text-sm text-gray-400">
                    El sistema fue desarrollado utilizando una arquitectura cliente-servidor,
                    con React en el frontend y Django en el backend, implementando sincronización
                    mediante polling para mantener el estado del juego actualizado. y desplegado en AWS
                    usando EC2 para desplegar dos máquinas virtuales que alojan nuestro sistema.
                </p>
            </div>

            {/* Info académica */}
            <div className="arcade-box p-6 flex flex-col gap-2">
                <p className="text-gray-400 text-sm">
                    <span className="arcade-glow-cyan">Escuela:</span> Universidad Politécnica de Chiapas
                </p>

                <p className="text-gray-400 text-sm">
                    <span className="arcade-glow-cyan">Materia:</span> Conmutación y enrutamiento de redes
                </p>

                <p className="text-gray-400 text-sm">
                    <span className="arcade-glow-cyan">Carreta:</span> IT2ID
                </p>
            </div>

            {/* Repos */}
            <div className="arcade-box p-6 flex flex-col gap-3">
                <h2 className="arcade-glow-magenta text-lg">Repositorios</h2>

                <a href="https://github.com/intjaviZ/mini-arcade-front" target="blank" className="arcade-link">
                    Frontend (React)
                </a>

                <a href="https://github.com/intjaviZ/mini-arcade-back" target="blank" className="arcade-link">
                    Backend (Django REST)
                </a>
            </div>

            {/* Integrantes */}
            <div className="arcade-box p-6 flex flex-col gap-3">
                <h2 className="arcade-glow-magenta text-lg">Integrantes</h2>

                <ul className="text-gray-300 text-sm flex flex-col gap-1">
                    <li>• Javier Zárate</li>
                    <li>• Cristophe Rojas</li>
                    <li>• Michell Zúñiga</li>
                    <li>• Andrés Pérez</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutUs;