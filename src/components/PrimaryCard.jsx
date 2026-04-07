import { Link } from "react-router-dom";

const PrimaryCard = ({ text, icon, route, usuario }) => {
    return (         
        <Link to={route} state={{ usuario: usuario }}>
            <div className="p-4 rounded-2xl bg-gray-200 w-64 text-center hover:bg-gray-300">
                <h3>{text}</h3>
                <div>{icon}</div> {/* icono */}
            </div>
        </Link>
    );
}

export default PrimaryCard;