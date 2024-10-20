import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandFacebook, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../styles/PiePagina.module.css';

    export function PiePagina() {
    
    return (
        <footer className={classes.footer}>
        <Container className={classes.inner}>
            <div className={classes.logo}>
                <Text size="xs" c="dimmed" className={classes.description}>
                    BebrasCuba plataforma web para gestion del concurso, rapido y facil de usar 
                </Text>
            </div>
            <div className={classes.groups}>
                <div>  
                    <Text size="md" fw={700} mb={5}>Contacto</Text>  
                    <Text size="sm" c="dimmed">Email: dgalvez@uclv.edu.cu</Text>  
                    <Text size="sm" c="dimmed">Teléfono: +53 42281156</Text>  
                    <Text size="sm" c="dimmed">Móvil: +53 59945580</Text>  
                </div>  
            </div>
        </Container>
        <Container className={classes.afterFooter}>
            <Text c="dimmed" size="sm">
                © 2024 bebrascuba.uclv.cu. Todos los derechos reservados.
            </Text>

            <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandWhatsapp style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandFacebook style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandTelegram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            </Group>
        </Container>
        </footer>
    );
}