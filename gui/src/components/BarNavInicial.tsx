import { Menu, Group, Center, Burger, Container, rem, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconUsersGroup, IconUser, IconLogin2 } from '@tabler/icons-react';
import {  } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../styles/BarNavInicial.module.css';
import { IconBrandMantine } from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';
import { ActionToggle } from './ActionToggle';
import { useState, useEffect } from 'react';  
const links = [
{ link: '/', label: 'Inicio' },
{ link: '/recurso', label: 'Recurso' },
{
    link: '#1', 
    label: 'Solicitar Registro',
    links: [
        { link: '/docs', label: <><IconUsersGroup size="0.7rem" /> Colaborador</> },  
        { link: '/resources', label: <><IconUser size="0.7rem" /> Profesor</> }, 
    ],
},
{ link: '/geobebras', label: 'GeoBebras' },
// { link: '/acceso', label: 'Iniciar Sección' },

];

export function BarNavInicial() {
    

    const items = links.map((link) => {  
        const menuItems = link.links?.map((item) => (  
        <Menu.Item key={item.link} component={Link} to={item.link}>  
            {item.label}  
        </Menu.Item>  
        ));  

        if (menuItems) {  
        return (  
            <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>  
            <Menu.Target>  
                <NavLink to={link.link} className={classes.link}>  
                <Center>  
                    <span className={classes.linkLabel}>{link.label}</span>  
                    <IconChevronDown size="0.9rem" stroke={1.5} />  
                </Center>  
                </NavLink>  
            </Menu.Target>  
            <Menu.Dropdown>
            <Menu.Label>Registrar como</Menu.Label>
            <Menu.Item disabled leftSection={<IconUsersGroup style={{ width: rem(14), height: rem(14) }} />}>
                Colaborador  
            </Menu.Item>
            <Menu.Item style={{marginRight: rem(50)}} leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />} component={Link} to="/registro">
                Profesor   
            </Menu.Item>
            </Menu.Dropdown>
            </Menu>  
        );  
        }  

        return (  
        <NavLink key={link.label} to={link.link} className={classes.link}>  
            {link.label}  
        </NavLink>  
        );  
    });

    const [isScrolled, setIsScrolled] = useState(false);  
    const [opened, { toggle }] = useDisclosure(false);  
    
        useEffect(() => {  
        const handleScroll = () => {  
            if (window.pageYOffset > 0) {  
            setIsScrolled(true);  
            } else {  
            setIsScrolled(false);  
            }  
        };  
    
        window.addEventListener('scroll', handleScroll);  
        return () => {  
            window.removeEventListener('scroll', handleScroll);  
        };  
    }, []);  

    return (
        
        <header  className={`${classes.header} ${isScrolled ? classes.headerFixed : ''}`} >
            {/* <Image  
                // radius="md"  
                src="https://bebrascuba.com/assets/images/logo.png" // Reemplaza con la URL de tu imagen  
                h={200} // Ajusta la altura de la imagen según tus necesidades  
                fallbackSrc="https://placehold.co/600x400?text=Placeholder" // Imagen de respaldo en caso de que no se cargue la principal  
            /> */}
            <Container size="lg">
                
                <div className={classes.inner}>
                <IconBrandMantine
                    style={{ width: rem(50), height: rem(50) }}
                    stroke={1.5}
                    color="var(--mantine-color-blue-filled)"
                />
                <Group gap={5} visibleFrom="sm">
                    {items}
                </Group>
                
                <Group justify="center">
                    <ActionToggle />
                    <Button radius={6} rightSection={<IconLogin2 size={16} />} size='sm' variant='outline' component={Link} to="/acceso" >Iniciar Sección</Button>
                </Group>
                <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </header>
    );
}
