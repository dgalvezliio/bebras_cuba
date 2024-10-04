import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid } from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import bg from '../assets/img/Simple Shiny.svg';
import classes from '../styles/GetInTouch.module.css';

export function GetInTouch() {
  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts} style={{ backgroundImage: `url(${bg})` }}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Información del contacto
          </Text>

          <ContactIconsList />
        </div>

        <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
          <Text fz="lg" fw={700} className={classes.title}>
            Escribenos por aqui
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput label="Tu nombre" placeholder="Digite su nombre aqui" required/>
              <TextInput label="Tus apellidos" placeholder="Digite su apellidos aqui" required />
            </SimpleGrid>

            <TextInput mt="md" label="Tu correo electronico" placeholder="Digite su correo electronico aqui" required />

            <Textarea
              mt="md"
              label="Tu mensaje"
              placeholder="Por favor escribe todas las información relevante aqui"
              required
              minRows={3}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control} >
                Enviar mensaje
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}