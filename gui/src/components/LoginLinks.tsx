import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    NumberInput
} from '@mantine/core';
import { Link } from 'react-router-dom'; 
import { IconMailFilled, IconLockFilled } from '@tabler/icons-react';
import { isEmail, useForm } from '@mantine/form';


export function LoginLinks() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { name: '', email: '', age: 0, password: 'secret',
            confirmPassword: '', },
            
        // functions will be used to validate values at corresponding key
        validate: {
                name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
                email: isEmail('Invalid email'),
                age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
                confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
            },
        });

    return (
    <Container size={450} my={40}>
        <Title ta="center" size={30}>
        Bienvenido a BebrasCuba
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
        No tienes una cuenta?{' '}
        <Anchor size="sm" component={Link}  
            to="/registro" >
            Crear una cuenta
        </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                {/* <TextInput 
                    leftSection={<IconMailFilled size={16} />}
                    label="Correo Electrónico"
                    placeholder="you@mantine.dev"
                    required
                />
                <PasswordInput 
                    leftSection={<IconLockFilled  size={16} />} 
                    label="Contraseña" 
                    placeholder="Digite su contrasña" 
                    required mt="md" 
                />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Recuerdame" />
                    <Anchor component="button" size="sm">
                        Olvidé la contraseña
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl">
                    Iniciar Sección
                </Button> */}
            </form>
            <form onSubmit={form.onSubmit(console.log)}>
            
                <TextInput 
                    leftSection={<IconMailFilled size={16} />}
                    label="Correo Electrónico"
                    placeholder="you@mantine.dev"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <PasswordInput 
                    leftSection={<IconLockFilled  size={16} />} 
                    label="Contraseña" 
                    placeholder="Digite su contrasña" 
                    mt="md" 
                    key={form.key('confirmPassword')}
                    {...form.getInputProps('confirmPassword')}
                />
                
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Recuerdame" />
                    <Anchor component="button" size="sm">
                        Olvidé la contraseña
                    </Anchor>
                </Group>
                <Button fullWidth type="submit" mt="sm">
                    Iniciar Sección
                </Button>
            </form>
        </Paper>
    </Container>
    );
}