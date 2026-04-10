import { useActionData, useSearchParams } from "react-router-dom";
import AccessForm from "../components/AccessForm";

const IngresoSala = () => {
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const usuario = searchParams.get("usuario");
  
  return (
    <section className="flex justify-center">
      <div className="container-sala">
        <h2 className="text-center">Preparando sala...</h2>

        {actionData?.error && (
          <p className="text-red-500">{actionData.error}</p>
        )}

        {actionData?.mensaje && (
          <p className="text-red-500">{actionData.mensaje}</p>
        )}

        <AccessForm usuario={usuario} />
      </div>
    </section>
  );
};

export default IngresoSala;
