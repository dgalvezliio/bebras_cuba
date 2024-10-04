import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { GestorAlumnos } from '../components/GestorAlumnos';

export default function PagGestionAlumnos() {
    return (
        <MantineProvider>
            <GestorAlumnos />
        </MantineProvider>
    );
}