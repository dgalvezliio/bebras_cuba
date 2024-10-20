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
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom'; 
import { IconMailFilled, IconLockFilled } from '@tabler/icons-react';
import { isEmail, useForm } from '@mantine/form';
import { useState } from 'react';

export function LoginLinks() {

    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const navigate = useNavigate();
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {  
        e.preventDefault();  
        // Aquí deberías verificar si el email y la contraseña son "rcabralm@uclv.edu.cu" y "rcm2024*"  
        if (email === 'rcabralm@uclv.edu.cu' && password === 'rcm2024*') {  
          // Si son válidos, actualiza el estado del rol del usuario en el componente App  
            setUserRole('profesor');  
            navigate('/dashboard');  
        } else {  
          // Maneja el error de inicio de sesión  
            console.error('Credenciales inválidas');  
        }  
    }; 

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
                    <Anchor size="sm" component={Link} to="/confirmar-email">
                        Olvidé la contraseña
                    </Anchor>
                </Group>
                <Button fullWidth type="submit" mt="sm" >
                    Iniciar Sección
                </Button>
            </form>
        </Paper>
    </Container>
    );
}

function setUserRole(arg0: string) {
    throw new Error('Function not implemented.');
}
