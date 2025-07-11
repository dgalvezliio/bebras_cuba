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
import { useState } from 'react';
import axios from 'axios';
import { isEmail, useForm } from '@mantine/form';
import { useUserContext } from '../context/UserContext';

axios.defaults.baseURL = 'http://localhost:8000'; // Ajusta según tu configuración
axios.defaults.withCredentials = true;

export function LoginLinks() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Estado para mensajes de error
    const navigate = useNavigate();
    
    const { user, setUser } = useUserContext();
    // Funcion para loguear en el sistema
    const handleSubmit = async ( values: {correo: string; contrasenia: string }) => {
        setLoading(true);
        setError(null);
        console.log("Datos del formulario:", values);
        try {
            const response = await axios.post('api/auth/login', {
                correo: values.correo,
                contrasenia: values.contrasenia,
            });
            const userData = response.data.user; // Suponiendo que el backend devuelve todos los datos del usuario
            // Guardar los datos del usuario en el contexto
            setUser(userData);
            localStorage.setItem('userRole', userData.rol);
            localStorage.setItem('userName', userData.nombre);
            localStorage.setItem('userLastName', userData.apellidos);
            localStorage.setItem('userEmail', userData.correo);
            localStorage.setItem('userId', userData.id);
            navigate('/'); // Redirigir al inicio
            window.location.reload();  
        } catch (error) {
            let errorMessage = 'Error inesperado. Por favor, inténtalo de nuevo.';
            let errorTitle = 'Error';
            let color = 'red';
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Mapeo de errores específicos del backend
                    switch (error.response.status) {
                    case 401:
                        errorTitle = 'Credenciales inválidas';
                        errorMessage = 'El correo o contraseña son incorrectos';
                        break;
                    case 403:
                        errorTitle = 'Acceso denegado';
                        if (error.response.data.error === 'No hay edición abierta') {
                        errorMessage = 'No hay edición abierto, verifique la fecha de apertura en la pagina inicial.';
                        color = 'blue';
                        } else if (error.response.data.error === 'El profesor no está activo') {
                        errorMessage = 'Tu cuenta aún no está activa, está en la proceso de validación.';
                        color = 'orange';
                        }
                        break;
                    case 422: 
                        errorMessage = Object.values(error.response.data.errors).flat().join(', ');
                        break;
                    default:
                        errorMessage = error.response.data.message || errorMessage;
                    }
                }
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    // Metodo de validacion 
    const form = useForm({
        initialValues: { correo: '', contrasenia: '' },
        // Validaciones 
        validate: {
            correo: isEmail('Correo electrónico inválido'), 
            contrasenia: (value) => (value.length < 3 ? 'La contraseña debe tener lo minimo 3 caracteres' : null),
        },
    });
    return (
        <Container size={450} my={40}>
            <Title ta="center" size={30}>
                Bienvenido a BebrasCuba
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                No tienes una cuenta?{' '}
                <Anchor size="sm" component={Link} to="/confirmar-email">
                    Crear una cuenta
                </Anchor>
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {/* Formulario de acceso al sistema */}
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput 
                        leftSection={<IconMailFilled size={16} />}
                        label="Correo Electrónico"
                        placeholder="Digite su correo electrónico"
                        {...form.getInputProps('correo')}
                    />
                    <PasswordInput 
                        leftSection={<IconLockFilled size={16} />} 
                        label="Contraseña" 
                        placeholder="Digite su contraseña" 
                        mt="md" 
                        {...form.getInputProps('contrasenia')}
                    />
                    {error && (
                        <Text color="red" size="sm" mt="sm">
                            {error}
                        </Text>
                    )}
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Recuerdame" />
                        <Anchor size="sm" component={Link} to="/cambiar-clave">
                            Olvidé la contraseña
                        </Anchor>
                    </Group>
                    <Button loading={loading} fullWidth type="submit" mt="sm" disabled={loading}>
                        Iniciar Sesión
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}