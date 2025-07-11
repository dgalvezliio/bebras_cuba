import { Menu, Group, Center, Burger, Container, rem, Button, Title, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconUsersGroup, IconUser, IconLogin2, IconStar, IconMap2 } from '@tabler/icons-react';
import {  } from '@tabler/icons-react';
import classes from '../styles/BarNavInicial.module.css';
// import { IconBrandMantine } from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';
import { ActionToggle } from './ActionToggle';
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
axios.defaults.baseURL = 'http://localhost:8000'; // <--- Ajusta según tu configuración

const links = [
    { link: '/', label: 'Inicio' },
    { link: '/recurso', label: 'Recursos' },
    {
        link: '#1', 
        label: 'Solicitar Registro',
        links: [
            { link: '/docs', label: <><IconUsersGroup size="0.7rem" /> Colaborador</> },  
            { link: '/resources', label: <><IconUser size="0.7rem" /> Profesor</> }, 
        ],
    },
    { link: '/geobebras', label: 'GeoBebras' },
];

export function BarNavInicial() {
    const [isEditionOpen, setIsEditionOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);  
    const [opened, { toggle }] = useDisclosure(false);
    
    useEffect(() => {  
        const checkEditionState = async () => {
            try {
                const response = await axios.get('api/edicion/esta-abierta');
                setIsEditionOpen(response.data.is_open);
                console.log(response.data.is_open);
            } catch (error) {
                console.error("Error al verificar el estado de la edición:", error);
            }
        }
        checkEditionState();

        const handleScroll = () => {  
            if (window.pageYOffset >= 80) { // Cambia este valor según la altura de la imagen  
                setIsScrolled(false);  
            } else {  
                setIsScrolled(false);  
            }  
        };  
    
        window.addEventListener('scroll', handleScroll);  
        return () => {  
        window.removeEventListener('scroll', handleScroll);  
        };  
    }, []);

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
            <Menu.Item 
            style={{marginRight: rem(50)}}
            leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
            component={Link} to="/registro"
            disabled={!isEditionOpen}
            >
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
    
    useEffect(() => {  
        const handleScroll = () => {  
            if (window.pageYOffset > 0) {  
            setIsScrolled(false);  
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
            <Container size="lg">
                <div className={classes.inner}>
                
                <Title order={4} c={''}>BEBRAS<IconStar color='blue' size={20} />CUBA</Title>
                
                <Group gap={5} visibleFrom="sm">
                    {items}
                </Group>
                <Group justify="center">
                    <ActionToggle />
                    <Button radius={6} rightSection={<IconLogin2 size={16} />} size='sm' variant='outline' component={Link} to="/acceso" >Iniciar Sesión</Button>
                </Group>
                <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </header>
    );
}
