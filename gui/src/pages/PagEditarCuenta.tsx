import '@mantine/core/styles.css';
import { MantineProvider, Title } from '@mantine/core';
import { EditarCuenta } from '../components/EditarCuenta';


export default function PagEditarCuenta() {
    return (
        <MantineProvider>
            <EditarCuenta />
        </MantineProvider>
    );
}