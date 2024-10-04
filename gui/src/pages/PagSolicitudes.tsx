import '@mantine/core/styles.css';
import { MantineProvider, Title } from '@mantine/core';
import { TablaDeSolicitudes } from '../components/TablaDeSolicitudes';
import { SolitudesACoordNac } from '../components/SolicitdesACoordNac';
import { MiPerfil } from '../components/MiPerfil';


export default function PagSolicitudes() {
    return (
        <MantineProvider>
            <SolitudesACoordNac />
        </MantineProvider>
    );
}