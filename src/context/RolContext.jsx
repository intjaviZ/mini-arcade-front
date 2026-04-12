import { createContext, useContext, useState } from "react";

const RolContext = createContext();

const RolProvider = ({ children }) => {
    const [rol, setRol] = useState(null);

    return (
        <RolContext.Provider value={{ rol, setRol }}>
            {children}
        </RolContext.Provider>
    );
}

export const useRol = () => {
    return useContext(RolContext);
};

export default RolProvider;