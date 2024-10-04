import { MantineProvider } from '@mantine/core';
// Estructura de la aplicación 
import { Outlet } from 'react-router-dom';
import { PiePagina } from './components/PiePagina';
import { BarNavInicial } from './components/BarNavInicial';
import { BarNavProfe } from './components/BarNavProfe';
import { BarNavCoordMunic } from './components/BarNavCoordMunic';
import { BarNavCoordProvinc } from './components/BarNavCoordProvinc';
import { BarNavCoordNac } from './components/BarNavCoordNac';
import '@mantine/dates/styles.css';
import { LogoImage } from './components/LogoImage';
import { FooterLinks } from './components/FooterLinks';
export default function App( ) {
  return (
    <MantineProvider>
      <LogoImage src={''} alt={''} />
      {/* Encabezado */}
      {/* <BarNavCoordMunic />  */}
      {/* <BarNavCoordNac /> */}
      <BarNavProfe />
      {/* <BarNavCoordProvinc /> */}
      {/* <BarNavInicial /> */}
      {/* Navegación */}
      <Outlet />
      {/* Pie de Pagina */}
      {/* <FooterLinks /> */}
      <PiePagina />
    </MantineProvider>
  );
}