import { Button, MantineProvider, Text } from '@mantine/core';
// Estructura de la aplicación 
import '@mantine/notifications/styles.css';
import { Outlet } from 'react-router-dom';
import { PiePagina } from './components/PiePagina';
import { BarNavInicial } from './components/BarNavInicial';
import { useState } from 'react';  
import '@mantine/dates/styles.css';
import { LogoImage } from './components/LogoImage';
import { BarNavProfe } from './components/BarNavProfe';
import { BarNavCoordNac } from './components/BarNavCoordNac';
import { BarNavAdmin } from './components/BarNavAdmin';
import { useEffect } from 'react';
import { NavbarSegmented } from './components/NavbarSegmented';
import { useUserContext } from './context/UserContext';
import { Notifications } from '@mantine/notifications';
// import { useUserContext } from './utils/UserContext';
import axios from 'axios';
import { MobileNavbar } from './components/MobileNavBar';
axios.defaults.baseURL = 'http://localhost:8000'; // <--- Ajusta según tu configuración

interface RecursoData {  
  id: number;
  nombre: string;  
  descripcion: string;  
  archivo: File | null;  
}

import { ModalsProvider } from '@mantine/modals';
import { useModals } from '@mantine/modals';
import { DeleteAccountButton } from './components/DeleteAccountButton';

function TestModalButton() {
  const modals = useModals();

  const openTestModal = () => {
    modals.openConfirmModal({
      title: 'Prueba de Modal',
      children: (
        <Text size="sm">¡El modal de Mantine está funcionando correctamente!</Text>
      ),
      labels: { confirm: 'Aceptar', cancel: 'Cancelar' },
      onConfirm: () => console.log('Modal confirmado'),
    });
  };

  return (
    <Button onClick={openTestModal} m="md">
      Abrir Modal de Prueba
    </Button>
  );
}


export default function App() {
  // const [userRole, setUserRole] = useState<string>(() => localStorage.getItem('userRole') || '');
  const { user } = useUserContext();
  const [userRole, setUserRole] = useState<string>(user?.rol || '');
  const [recursos, setRecursos] = useState<RecursoData[]>([]);

  useEffect(() => {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
          setUserRole(storedRole);
          console.log(storedRole);
          console.log('Usuario entro en el sistema')
      }
  }, []);

  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications  position="top-right" />
        <LogoImage src={''} alt={''} />
        
        {/* Botón de prueba - puedes quitarlo después */}
        {/* <TestModalButton /> */}
        
        {/* <DeleteAccountButton /> */}
        {/* Encabezado */}
        {userRole === 'admin' && <BarNavAdmin />}
        {userRole === 'profesor' && <BarNavProfe />} 
        {userRole === 'coord_nacional' && <BarNavCoordNac />}
        {!userRole && <BarNavInicial />}
        
        {/* Navegación */}
        <Outlet />
        
        {/* Pie de Pagina */}
        <PiePagina />
      </ModalsProvider>
    </MantineProvider>
  );
}