
import { Container, Grid, Title, Button, Card, PasswordInput, Input, TextInput, Select, InputBase, Text, PinInput, Switch } from '@mantine/core';
import { IconAt, IconEyeClosed, IconEyeFilled, IconLock, IconLockCheck, IconNumber, IconPhone, IconSend, IconUser} from '@tabler/icons-react';
import { IMaskInput } from 'react-imask';
import axios from 'axios'; 
import { isEmail, useForm } from '@mantine/form';
import { useState } from 'react';
axios.defaults.baseURL = 'http://localhost:8000'; // <--- Ajusta según tu configuración

export function AdminConcurso() {
    const [loading, setLoading] = useState(false);
    const [showPin, setShowPin] = useState(false);  
    const [showConfPin, setShowConfPin] = useState(false);  
    const [error, setError] = useState<string | null>(null); // Estado para mensajes de error
    const handleToggleShowPin = () => {  
        setShowPin((prevShowPin) => !prevShowPin);  
    }; 
    const handleToggleShowConfPin = () => {  
        setShowConfPin((prevShowConfPin) => !prevShowConfPin);  
    };
    const handleSubmit = async () => {
        setLoading(true); // Iniciar el estado de carga
        setError(null);
        if(!form.isValid) return;
        
        try {
            const response = await axios.post("/api/registrar-usuario", {
                nombre: form.values.nombre,
                apellidos: form.values.apellidos,
                correo: form.values.correo,
                telefono: form.values.telefono,
                nro_ci: form.values.nro_ci,
                rol: form.values.rol,
                contrasenia: form.values.contrasenia,
                pin: form.values.pin
            });
            console.log('Registro del usuario: ', response.data);
            setError('Usuario registrado con suceso!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.response?.status === 422){
                    const errors = error.response.data.errors;
                    const errorMessage = Object.values(errors).flat().join(', ');
                    setError(errorMessage);
                }
                else {
                    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
                    setError(errorMessage);
                }
            } else {
                setError('Error inesperado. Por favor, inténtalo de nuevo.');
            }
        } finally {
            setLoading(false);
        }
        
    };
    // Validaciones 
    const form = useForm({
        initialValues: { nombre: '', correo: '', contrasenia: '', apellidos: '', telefono: '',
            confirmContrasenia: '', nro_ci: '', pin:'', confirmPin:'', rol:'' },
        // functions will be used to validate values at corresponding key
        validate: {
            nombre: (value) =>
                value.length < 3 ? 'El nombre debe tener al menos 2 letras' :
                /[^a-zA-Z\s]/.test(value) ? 'El nombre solo puede contener letras' : null,
            apellidos: (value) =>
                value.length < 3 ? 'El apellido debe tener al menos 2 letras' :
                /[^a-zA-Z\s]/.test(value) ? 'El apellido solo puede contener letras' : null,
            correo: isEmail('Correo electrónico no válido'),
            contrasenia: (value) => (value.length < 2 ? 'La contrasenia debe tener como minimo 2 carateres' : null),
            confirmContrasenia: (value, values) => value !== values.contrasenia ? 'Las contraseñas no coenciden' : null,
            nro_ci: (value) => {
                const digits = value.replace(/\D/g, ''); // Solo números
                return digits.length !== 11 ? 'Número de carnet inválido' : null;
            },
            telefono: (value) => {
                const digits = value.replace(/\D/g, ''); // Solo números
                return digits.length !== 10 ? 'Número de teléfono inválido' : null;
            },
            pin: (value) => (value.length !== 4 ? 'El pin debe tener al menos 4 números': null), 
            confirmPin: (value, values) => value !== values.pin ? 'The pin must have at 4 number': null,
            rol: (value) => (!value ? 'Tienes seleccionar el rol' : null),
        },
    });
    return (
        <Container size='md' mt={50}>
            <Title ta={'center'} order={2} mb={10}>Registar Coordinador </Title>
            <Card>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    {/* Inicio del Card Datos Personales */}
                    <Card shadow="sm" withBorder>
                        <Text mb={10} fw={700}>
                            Datos Personales
                        </Text>
                        <Grid>
                            <Grid.Col span={6}>
                                <TextInput 
                                    label='Nombre(s)' 
                                    mb={10} 
                                    placeholder="Digite su nombre(s)" 
                                    withAsterisk
                                    key={form.key('nombre')}
                                    {...form.getInputProps('nombre')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput 
                                    label='Apellidos' mb={10} 
                                    placeholder="Digite sus apellidos" 
                                    withAsterisk
                                    key={form.key('apellidos')}
                                    {...form.getInputProps('apellidos')}
                                />
                            </Grid.Col>
                        </Grid>
                        <TextInput 
                            withAsterisk 
                            label='Correo electrónico' 
                            mb={10} placeholder="Correo electronico" 
                            leftSection={<IconAt size={16} />} 
                            key={form.key('correo')}
                            {...form.getInputProps('correo')}
                        />
                        <Grid>
                            <Grid.Col span={6}>    
                                <InputBase
                                    withAsterisk
                                    label="Tu Telefono"
                                    leftSection={<IconPhone size={16} />}
                                    component={IMaskInput}
                                    mask="+53 00000000"
                                    placeholder="Digite aqui su numero de telefono"
                                    // description="Escribe +53 primero y luego los demas numeros"
                                    // inputWrapperOrder={['label', 'error', 'input', 'description']}
                                    key={form.key('telefono')}
                                    {...form.getInputProps('telefono')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <InputBase
                                    withAsterisk
                                    label="Tu Carnet"
                                    leftSection={<IconNumber size={16} />}
                                    component={IMaskInput}
                                    mask="00000000000"
                                    placeholder="Digite aqui su numero de carnet"
                                    // description='Escriba abajo su numero de carnet'
                                    // inputWrapperOrder={['label', 'error', 'input', 'description']}
                                    key={form.key('nro_ci')}
                                    {...form.getInputProps('nro_ci')}
                                />
                            </Grid.Col>
                        </Grid>
                    </Card>
                    {/* Inicio del card datos de la cuenta */}
                    <Card shadow="sm" withBorder mt={10} mb={10}>
                        <Text fw={700}>
                            Datos de la Cuenta
                        </Text>
                        <Select
                            withAsterisk
                            clearable
                            label="Seleccione el rol de usuario"
                            key={form.key('rol')}
                            {...form.getInputProps('rol')}
                            leftSection={<IconUser size={16} />}
                            placeholder="Click aqui para seleccionar"
                            data={['colaborador','coord_nacional','coord_munipal', 'coord_provincial']}
                        />
                        <Grid mt={10}>
                            <Grid.Col span={6}>
                                <PasswordInput
                                    label='Contraseña'
                                    leftSection={<IconLock size={16} />}
                                    placeholder="Digite aqui la contraseña"
                                    withAsterisk
                                    {...form.getInputProps('contrasenia')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <PasswordInput
                                    label='Confirme la contraseña'
                                    withAsterisk
                                    leftSection={<IconLockCheck  size={16} />}
                                    placeholder="Confirme aqui la contraseña"
                                    {...form.getInputProps('confirmContrasenia')}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid mt={10}>
                            <Grid.Col span={6}>
                                <Input.Wrapper withAsterisk label="Ingrese el PIN" description="El pin debe tener al menos 4 números">
                                    <PinInput
                                        mask={!showPin}
                                        type="number" 
                                        key={form.key('pin')}
                                        {...form.getInputProps('pin')}
                                    />
                                </Input.Wrapper>
                                <Switch
                                    size="md"
                                    mt={'xs'}
                                    color="dark.4"
                                    // label='Ver el PIN'
                                    checked={showPin}  
                                    onChange={handleToggleShowPin}
                                    onLabel={<IconEyeFilled size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
                                    offLabel={<IconEyeClosed size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Input.Wrapper withAsterisk label="Confirme el PIN" description="El pin debe coencidir con el anterior">
                                    <PinInput
                                        mask={!showConfPin} 
                                        type="number" 
                                        key={form.key('confirmPin')}
                                        {...form.getInputProps('confirmPin')}
                                    />
                                </Input.Wrapper>
                                    <Switch
                                        size="md"
                                        mt={'xs'}
                                        color="dark.4"
                                        // label='Ver el PIN'
                                        checked={showConfPin}  
                                        onChange={handleToggleShowConfPin}  
                                        onLabel={<IconEyeFilled size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
                                        offLabel={<IconEyeClosed size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
                                    />
                            </Grid.Col>
                        </Grid>
                    </Card>
                    {/* Botón de enviar solicitud de registro */}
                    <Text>{error}</Text>
                    <Button 
                        type='submit' 
                        loading={loading} 
                        fullWidth 
                        rightSection={<IconSend  size={16} />}
                    >
                        Enviar solicitud de registro
                    </Button>
                </form>
            </Card>
        </Container>
    );

}