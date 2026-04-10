import { useLoaderData } from "react-router-dom";

const Sala = () => {
    const initialSala = useLoaderData();
    
    return ( <h1>{JSON.stringify(initialSala)}</h1> );
}
export default Sala;