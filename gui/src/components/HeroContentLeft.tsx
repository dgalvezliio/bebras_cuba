import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from '../styles/HeroContentLeft.module.css';

export function HeroContentLeft() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Bienvenido a la Plataforma de Gestión y Apoyo al Concurso Bebras en Cuba</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Plataforma creado para gestionar el concurso bebras en cuba a nivel nacional, ofereciendo recursos y 
          funcionalidades necesarias para una mejor organización. 
        </Text>

        <Button variant="gradient" size="lg" radius="xl" color='teal' className={classes.control}>
          Empezar el concurso
        </Button>
      </Container>
    </div>
  );
}