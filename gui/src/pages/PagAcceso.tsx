import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { LoginLinks } from '../components/LoginLinks';


export default function PagAcceso() {
    return (
        <MantineProvider>
            <LoginLinks />
        </MantineProvider>
    );
}
