import PrimaryCard from "../components/PrimaryCard";

const Home = () => {
    return ( 
        <section id="home">
            <h2>¿Anfitrión o invitado?</h2>
            
            <div className="flex items-center justify-center gap-4 m-8">
                <PrimaryCard text="Crear una sala" route="/ingreso?usuario=anfitrion"/>
                <PrimaryCard text="Unirme a una sala" route="/ingreso?usuario=invitado"/>
            </div>
        </section>
    );
}

export default Home;