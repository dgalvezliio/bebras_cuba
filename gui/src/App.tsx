import { MantineProvider } from '@mantine/core';
// Estructura de la aplicación 
import { Outlet } from 'react-router-dom';
import { PiePagina } from './components/PiePagina';
import { BarNavInicial } from './components/BarNavInicial';
import { useState } from 'react';  
import '@mantine/dates/styles.css';
import { LogoImage } from './components/LogoImage';
import { BarNavProfe } from './components/BarNavProfe';
import { BarNavCoordMunic } from './components/BarNavCoordMunic';
import { BarNavCoordProvinc } from './components/BarNavCoordProvinc';
import { BarNavCoordNac } from './components/BarNavCoordNac';
import { BarNavAdmin } from './components/BarNavAdmin';


export default function App( ) {
  const [userRole] = useState(''); 
  return (
    <MantineProvider>
      <LogoImage src={''} alt={''} />
      {/* Encabezado */}
      {/* {userRole === 'profesor' && <BarNavProfe />}  
      {userRole === 'coordinador_municipal' && <BarNavCoordMunic />}  
      {userRole === 'coordinador_provincial' && <BarNavCoordProvinc />}  
      {userRole === 'coordinador_nacional' && <BarNavCoordNac />}  
      {!userRole && <BarNavInicial />}   */}
      {/* Navegación */}
      <BarNavAdmin />
      {/* <BarNavCoordMunic /> */}
      <Outlet />
      {/* Pie de Pagina */}
      <PiePagina />
    </MantineProvider>
  );
}