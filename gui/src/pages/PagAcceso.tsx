import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { LoginLinks } from '../components/LoginLinks';
import { useState } from 'react'; // Asegúrate de importar useState
import { BarNavAdmin } from '../components/BarNavAdmin';
import { BarNavProfe } from '../components/BarNavProfe';
import { BarNavCoordNac } from '../components/BarNavCoordNac';
import { BarNavInicial } from '../components/BarNavInicial';
export default function PagAcceso() {
    const [userRole, setUserRole] = useState(''); // Define el estado para userRole

    return (
        <MantineProvider>
            {/* {userRole === 'administrador' && <BarNavAdmin />}
            {userRole === 'profesor' && <BarNavProfe />} 
            {userRole === 'coordinador_nacional' && <BarNavCoordNac />}
            {!userRole && <BarNavInicial />} */}
            {/* <LoginLinks setUserRole={setUserRole} /> */}
        </MantineProvider>
    );
}
