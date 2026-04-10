import { Link } from "react-router-dom";
import useHoverSound from "../hooks/useHoverSound";

const PrimaryCard = ({ text, icon, route, usuario }) => {
    const playHover = useHoverSound(); 
    return (         
        <Link to={route} state={{ usuario: usuario }} onMouseEnter={playHover}>
            <div className="p-4 rounded-2xl w-64 text-center btn-arcade-dotted btn-arcade-dotted-neon btn-principal">
                <h3>{text}</h3>
                <div>{icon}</div> {/* icono */}
            </div>
        </Link>
    );
}

export default PrimaryCard;