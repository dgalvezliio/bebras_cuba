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

interface LoginLinksProps {

     setUserRole: (role: string) => void; // El tipo de setUserRole
    
    }
export function LoginLinks({ setUserRole }: LoginLinksProps) { // Recibe setUserRole como prop
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate(); 
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
        // Verificar las credenciales
        if (email === 'rcabralm@uclv.edu.cu' && password === 'secret') { 
        setUserRole('profesor'); // Cambia el rol a 'profesor'
        alert('Usuario y contraseña correcto!');
        navigate('/');
            } else if (email === 'dgalves@uclv.edu.cu' && password === 'liogalves1980.*') { 
            setUserRole('coordinador_nacional'); // Cambia el rol a 'coordinador nacional'
            alert('Usuario y contraseña correcto!');
            // navigate('/');
            // links.push({ link: '/admin', label: 'Administrar' });
        } else {  
            alert('Usuario y contraseña incorrecto!');
            console.error('Credenciales inválidas'); 
        }
    };

    // const form = useForm({
    //     mode: 'uncontrolled',
    //     initialValues: { email: 'rcabralm@uclv.edu.cu', password: 'secret',
    //         confirmPassword: '', },
            
    //     // functions will be used to validate values at corresponding key
    //     validate: {
    //         email: isEmail('Invalid email'),
    //         confirmPassword: (value, values) =>
    //         value !== values.password ? 'Passwords did not match' : null,
    //     },
    // });

    return (
    <Container size={450} my={40}>
        <Title ta="center" size={30}>
        Bienvenido a BebrasCuba
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
        No tienes una cuenta?{' '}
        <Anchor size="sm" component={Link}  
            to="/confirmar-email" >
            Crear una cuenta
        </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {/* <Text c={'red'} fw={500} ta="center" mb={5}>Usuario o contraseña incorrecto!</Text> */}
            <form onSubmit={handleSubmit}>
            
                <TextInput 
                    leftSection={<IconMailFilled size={16} />}
                    label="Correo Electrónico"
                    placeholder="Digite su correo electrónico"
                    // key={form.key('email')}
                    // {...form.getInputProps('email')}
                    value={email} // Asigna el valor del estado
                    onChange={(e) => setEmail(e.currentTarget.value)} 
                />
                <PasswordInput 
                    leftSection={<IconLockFilled  size={16} />} 
                    label="Contraseña" 
                    placeholder="Digite su contrasña" 
                    mt="md" 
                    // key={form.key('confirmPassword')}
                    // {...form.getInputProps('confirmPassword')}
                    value={password} // Asigna el valor del estado
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Recuerdame" />
                    <Anchor size="sm" component={Link} to="/confirmar-email">
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

function setUserRole(arg0: string) {
    throw new Error('Function not implemented.');
}
