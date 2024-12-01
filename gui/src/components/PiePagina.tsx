import { Text, Container, ActionIcon, Group, rem, Title } from '@mantine/core';
import { IconBrandFacebook, IconBrandTelegram, IconBrandWhatsapp, IconDeviceMobile, IconMail, IconPhone } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../styles/PiePagina.module.css';

    export function PiePagina() {
    
    return (
        <footer className={classes.footer}>
        <Container className={classes.inner}>
            <div className={classes.logo}>
                <Text size="md" c="dimmed" className={classes.description}>
                    BebrasCuba plataforma web para gestión del concurso, rápido y facil de usar 
                </Text>
            </div>
            <div className={classes.groups}>
                <div>  
                <Title order={3}>Sitios</Title>  
                <Group align="center">  
                    {/* <IconMail color='gray' size={18} />   */}
                    <Text size="md" c="dimmed" >Bebras - Sitio oficial internacional</Text>  
                </Group>  
                <Group align="center">  
                    {/* <IconPhone color='gray' size={18} />   */}
                    <Text size="md" c="dimmed">Geobebras - Sitio espacial BebrasCuba</Text>  
                </Group>  
                <Group align="center">  
                    {/* <IconDeviceMobile color='gray' size={18} />   */}
                    <Text size="md" c="dimmed">UCLV - Universidad Central de las Villas</Text>  
                </Group>    
                </div>  
            </div>
            <div className={classes.groups}>
                <div>  
                <Title order={3}>Contacto</Title>  
                <Group align="center">  
                    <IconMail color='gray' size={18} />  
                    <Text size="md" c="dimmed">dgalvez@uclv.edu.cu</Text>  
                </Group>  
                <Group align="center">  
                    <IconPhone color='gray' size={18} />  
                    <Text size="md" c="dimmed">+53 42281156</Text>  
                </Group>  
                <Group align="center">  
                    <IconDeviceMobile color='gray' size={18} />  
                    <Text size="md" c="dimmed">+53 59945580</Text>  
                </Group>    
                </div>  
            </div>
        </Container>
        <Container className={classes.afterFooter}>
            <Text fw={700} size="sm" c={'gray'}>
                © 2024 BEBRASCUBA
            </Text>

            <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandWhatsapp style={{ width: rem(20), height: rem(20) }} stroke={1.7} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandFacebook style={{ width: rem(20), height: rem(20) }} stroke={1.7} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandTelegram style={{ width: rem(20), height: rem(20) }} stroke={1.7} />
            </ActionIcon>
            </Group>
        </Container>
        </footer>
    );
}