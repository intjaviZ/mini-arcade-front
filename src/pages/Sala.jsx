import { useLoaderData } from "react-router-dom";
import Gato from "../components/Gato";

const Sala = () => {
    const initialSala = useLoaderData();
    let typeUser = sessionStorage.getItem('usuario');
    console.log("typeUser: ", initialSala);
    if (typeUser === "anfitrion" || typeUser === "invitado") {
        sessionStorage.setItem('usuario', initialSala[typeUser]);
    }
    return (
        <>
           {initialSala.tipo_juego === "gato" ? <Gato  id_sala={initialSala.id_sala} /> : null}
        </>
        
    );
}

export default Sala;