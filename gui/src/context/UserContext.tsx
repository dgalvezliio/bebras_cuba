import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: number;
    nombre: string;
    apellidos: string;
    image?: string; // Opcional, en caso de que el usuario tenga un avatar
    nro_ci: string;
    telefono: string;
    correo:string;
    pin: string;
    rol:string;
}

// 
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

// Crear el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext debe usarse dentro de UserProvider');
    }
    return context;
};