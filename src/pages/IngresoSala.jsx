import { useActionData, useSearchParams } from "react-router-dom";
import AccessForm from "../components/AccessForm";
import { useEffect } from "react";

const IngresoSala = () => {
    const actionData = useActionData();
    const [searchParams] = useSearchParams();
    const usuario = searchParams.get("usuario");

    console.log("Hola: ", usuario);

    useEffect(() => {
        if (!actionData) return;
        console.log("efecto");
        
        if (actionData.id_sala) {
            console.log(actionData);
        }
    }, [actionData]);
    
    return (
        <section>
            <h2>Preparando sala...</h2>
            
            {actionData?.error && (
                <p className="text-red-500">{actionData.error}</p>
            )}

            {actionData?.mensaje && (
                <p className="text-red-500">{actionData.mensaje}</p>
            )}

            <AccessForm usuario={usuario}/>
        </section>
    );
}
 
export default IngresoSala;