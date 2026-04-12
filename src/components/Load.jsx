const Load = ({ texto = "Cargando juego..." }) => {
  return (
    <div className="min-h-48 flex flex-col items-center justify-center gap-6">

      {/* Texto */}
      <p className="arcade-glow-cyan text-lg animate-pulse">
        {texto}
      </p>

      {/* Loader estilo arcade */}
      <div className="flex gap-2">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>

    </div>
  );
};

export default Load;