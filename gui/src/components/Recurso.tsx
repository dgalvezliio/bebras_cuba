import { Paper, Text, Title, Button, Container, Grid, Tooltip, Group } from '@mantine/core';
import classes from '../styles/Recurso.module.css';
import { IconDownload, IconUpload  } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

export function Recurso() {
    return (

        <Container mt={50}>

            <Title order={2} size={40} ta="center">Recursos de apoyo al concurso BebrasCuba</Title>
            <Text c="dimmed" ta="center" mb={30}>Documentos de apoyo y guia de cada convocatoria eso incluye los llamados</Text>

            <Paper shadow="lg" p="lg" withBorder mb={10}>
                <Text>Concurso Bebras Cuba – Edición 3</Text>
                <Group mr={10} justify='space-between'>
                    <Group>
                        <Text c="dimmed">
                            CONVOCATORIA 2024 – primer llamado (breve)
                        </Text>
                    </Group>
                    <Group>
                        {/* <Button variant="default" rightSection={<IconDownload size={15} />}>Leer archivo</Button> */}
                        <Button variant="default" rightSection={<IconDownload size={15} />}>Descargar</Button>
                    </Group>
                </Group>
            </Paper>
            <Paper shadow="lg" p="lg" withBorder >
                
                <Text>Concurso Bebras Cuba – Edición 3</Text>
                <Group mr={10} justify='space-between'>
                    <Group>
                        <Text c="dimmed">
                            CONVOCATORIA 2024 – segundo llamado (breve)
                        </Text>
                    </Group>
                    <Group>
                        {/* <Button variant="default" rightSection={<IconDownload size={15} />}>Leer archivo</Button> */}
                        <Button variant="default" rightSection={<IconDownload size={15} />}>Descargar</Button>
                    </Group>
                </Group>
            </Paper>
            
        </Container>
    );
}