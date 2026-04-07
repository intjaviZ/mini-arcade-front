import { useLoaderData } from "react-router-dom";

const Sala = () => {
    const initialSala = useLoaderData();
    return (
        <>
        <h1>hola</h1>
        <p>{JSON.stringify(initialSala)}</p>
        </>
        
    );
}

export default Sala;