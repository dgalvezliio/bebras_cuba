import cx from 'clsx';
import { ActionIcon, Group } from '@mantine/core';
import { IconBell, IconMessage } from '@tabler/icons-react';
import classes from '../styles/ActionToggle.module.css';
import { Link } from 'react-router-dom';

export function BotonSolicitud() {
    
    return (
        <Group justify="center">
            <ActionIcon
                
                variant="default"
                size="lg"
                aria-label="Toggle color scheme"
                radius={6}
                component={Link} to="/solicitudes"
            >
                <IconMessage className={cx(classes.icon, classes.light)} stroke={1.5} />
                <IconMessage className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
        </Group>
    );
}