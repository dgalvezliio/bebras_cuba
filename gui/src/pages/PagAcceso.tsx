
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
// import { HeaderMenu } from '../components/HeaderMenu';
import { LoginLinks } from '../components/LoginLinks';

export default function PagAcceso() {
    return (
        <MantineProvider>
            <LoginLinks />
        </MantineProvider>
    );
}
