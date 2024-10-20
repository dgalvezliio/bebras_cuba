import '@mantine/core/styles.css';
import { MantineProvider} from '@mantine/core';
import { MiPerfil } from '../components/MiPerfil';
import { CuentaCoordProvinc } from '../components/CuentaCoordProvinc';
import { CuentaCoordMunic } from '../components/CuentaCoordMunic';
import { CuentaProfesor } from '../components/CuentaProfesor';
import { EditarCuenta } from '../components/EditarCuenta';
import { Route, Routes } from 'react-router-dom';

export default function PagMiPerfil() {
    return (
        <MantineProvider>
            <Routes>  
            <Route path="/" element={<MiPerfil />} />  
            <Route path="/coordinador-provincial" element={<CuentaCoordProvinc />} />  
            <Route path="/coordinador-municipal" element={<CuentaCoordMunic />} />  
            <Route path="/profesor" element={<CuentaProfesor />} />  
            <Route path="/editar-cuenta" element={<EditarCuenta />} />  
            </Routes>  
        </MantineProvider>
    );
}