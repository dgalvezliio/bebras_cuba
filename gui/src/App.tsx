import { MantineProvider } from '@mantine/core';
// Estructura de la aplicación 
import { Outlet } from 'react-router-dom';
import { PiePagina } from './components/PiePagina';
import { BarNavInicial } from './components/BarNavInicial';
import { useState } from 'react';  
import '@mantine/dates/styles.css';
import { LogoImage } from './components/LogoImage';
import { BarNavProfe } from './components/BarNavProfe';
import { BarNavCoordNac } from './components/BarNavCoordNac';
import { BarNavAdmin } from './components/BarNavAdmin';
import { LoginLinks } from './components/LoginLinks';

export default function App() {
 const [userRole, setUserRole] = useState(''); // Usa useState para manejar el rol

  return (
    <MantineProvider>
      <LogoImage src={''} alt={''} />
      {/* Encabezado */}
      {userRole === 'administrador' && <BarNavAdmin />}    
      {userRole === 'profesor' && <BarNavProfe />}    
      {userRole === 'coordinador_nacional' && <BarNavCoordNac />}  
      {!userRole && <BarNavInicial />}  
      {/* Navegación */}
      <LoginLinks setUserRole={setUserRole} /> 
      <Outlet />
      {/* Pie de Pagina */}
      <PiePagina />
    </MantineProvider>
  );
}