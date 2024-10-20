import { Group, Burger, Container, rem, Menu, UnstyledButton, Avatar, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {  } from '@tabler/icons-react';
import classes from '../styles/BarNavInicial.module.css';
import classe from '../styles/headerTabs.module.css';

import {
    IconBrandMantine, IconChevronDown, IconLogout, IconUser
} from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';
import { ActionToggle } from './ActionToggle';
import { useState } from 'react';
import cx from 'clsx';
import logoBebrascuba from '../assets/logobebrascuba.png';


// Enlaces de barra de navegación
const links = [
    { link: '/', label: 'Inicio' },
    { link: '/recurso', label: 'Recurso' },
    { link: '/gestionar_escuela', label: 'Gestionar escuela'},
    { link: '/geobebras', label: 'GeoBebras' },
    { link: '/solic_coord_munic', label: 'Solicitudes' },
];

// Datos de usuario
const user = {
    name: 'Jill Jailbreaker',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
};

export function BarNavCoordMunic() {
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
                <img src={logoBebrascuba} alt="Logo de BebrasCuba" style={{ width: rem(40), height: rem(40) }} />
                <Group gap={5} visibleFrom="sm">
                    {items}
                </Group>
                <Group>
                <ActionToggle />
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
                            component={Link} to="mi-perfil/coordinador-municipal"
                        >
                            Mi perfil
                        </Menu.Item>
                        
                        <Menu.Item
                            color='blue'
                            leftSection={
                            <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            }
                        >
                            Cerrar sección
                        </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                
                <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </header>
    );
}