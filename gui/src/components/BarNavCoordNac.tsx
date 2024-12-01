import { Group, Burger, Container, rem, Menu, UnstyledButton, Avatar, Text, Indicator, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/BarNavInicial.module.css';
import classe from '../styles/headerTabs.module.css';
import {
    IconBrandMantine, IconChevronDown, IconUserEdit, IconLogout, IconUser
} from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';
import { ActionToggle } from './ActionToggle';
import { useState } from 'react';
import cx from 'clsx';
import { BotonSolicitud } from './BotonSolicitud';

// Enlaces de barra de navegación de coordinador nacional
const links = [
    { link: '/', label: 'Inicio' },
    { link: '/recurso', label: 'Recurso' },
    { link: '/gestionar_concurso', label: 'Gestionar concurso' },
    { link: '/geobebras', label: 'GeoBebras' },
    
    ];
// Datos de usuario
const user = {
    name: 'Robert Wolfkisser',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
};

export function BarNavCoordNac() {
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const items = links.map((link) => {  
        
        return (  
        <NavLink key={link.label} to={link.link} className={classes.link}>  
            {link.label}  
        </NavLink>  
        );  
    });

    return (
        <header className={classes.header}>
            <Container size="md">
                <div className={classes.inner}>
                {/* <MantineLogo size={28} /> */}
                <IconBrandMantine
                    style={{ width: rem(50), height: rem(50) }}
                    stroke={1.5}
                    color="var(--mantine-color-blue-filled)"
                />
                <Group gap={5} visibleFrom="sm" ml={20} mr={20}>
                    {items}
                </Group>
                <Group>
                    <ActionToggle />
                    <Tooltip arrowPosition="side" arrowOffset={25} arrowSize={5} label="Notificaciones" withArrow position="bottom">
                    <Indicator inline label="50" color='red' size={16}>
                        <BotonSolicitud />
                    </Indicator>
                    </Tooltip>
                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                        >
                            <Menu.Target>
                            <UnstyledButton
                                className={cx(classe.user, { [classe.userActive]: userMenuOpened })}
                            >
                                <Group gap={7}>
                                <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                                <Text fw={500} size="sm" lh={1} mr={3}>
                                    {user.name}
                                </Text>
                                <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                </Group>
                            </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                            <Menu.Label>Mi cuenta</Menu.Label>
                            <Menu.Item
                                leftSection={
                                <IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                                component={Link} to="/mi_perfil"
                            >
                                Mi Perfil
                            </Menu.Item>
                                
                            <Menu.Item
                                color='blue'
                                leftSection={
                                <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                                component={Link} to="/acceso"
                            >
                                Cerrar sección
                            </Menu.Item>
                            </Menu.Dropdown>
                    </Menu>
                </Group>
                {/*  */}
                <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </header>
    );
}