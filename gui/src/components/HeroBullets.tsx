import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '../assets/img/image.svg';
import classes from '../styles/HeroBullets.module.css';

export function HeroBullets() {
    return (
        <Container size="md">
        <div className={classes.inner}>
            <div className={classes.content}>
            <Title className={classes.title}>
                <span className={classes.highlight}>BebrasCuba</span> Concurso <br /> de computación
            </Title>
            <Text c="dimmed" mt="md">
                Build fully functional accessible web applications faster than ever – Mantine includes
                more than 120 customizable components and hooks to cover you in any situation
            </Text>

            </div>
            <Image src={image} className={classes.image} />
        </div>
        </Container>
    );
}