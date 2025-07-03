import { ActionIcon, Avatar, Container, FileButton, Grid, Group, Input, Paper, PasswordInput, PinInput, Switch, Tabs, TextInput, Title } from '@mantine/core';
import { Card, Text, Button } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { IconAt, IconDeviceMobile, IconDownload, IconEyeClosed, IconEyeFilled, IconLock, IconLockCheck, IconLockCog, IconPasswordMobilePhone, IconPasswordUser, IconPhotoEdit, IconPhotoUp, IconPhotoX, IconRefresh, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { IMaskInput } from 'react-imask';
axios.defaults.baseURL = 'http://localhost:8000'; // <--- Ajusta según tu configuración


export function MiPerfil() {
    
    const [showPin, setShowPin] = useState(false);  
    const [showConfPin, setShowConfPin] = useState(false);
    const [updateRol, setUpdateRol] = useState<string>(() => localStorage.getItem('userRole') || ''); 
    const [errorCorreo, setErrorCorreo] = useState<string | null>(null); // Estado para mensajes de error
    const [errorTelefono, setErrorTelefono] = useState<string | null>(null); // Estado para mensajes de error
    const [errorContrasenia, setErrorContrasenia] = useState<string | null>(null); // Estado para mensajes de error
    const [errorPin, setErrorPin] = useState<string | null>(null); // Estado para mensajes de error
    const [loadingContrasenia, setLoadingContrasenia] = useState(false);
    const [loadingTelefono, setLoadingTelefono] = useState(false);
    const [loadingCorreo, setLoadingCorreo] = useState(false);
    const [loadingPin, setLoadingPin] = useState(false);
    const id_profesor = localStorage.getItem('userId');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loadingPhoto, setLoadingPhoto] = useState(false);
    const [existPhoto, setExistPhoto] = useState(false);
    const [errorPhoto, setErrorPhoto] = useState<string | null>(null);
    const [currentPhoto, setCurrentPhoto] = useState<string | null>(localStorage.getItem('userPhoto') || null);

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole === 'coord_nacional') {
          setUpdateRol('Coordinador Nacional');
        } else {
          setUpdateRol('Administrador');
        }
        
        // Cargar foto actual si existe
        if (localStorage.getItem('userPhoto')) {
          setCurrentPhoto(localStorage.getItem('userPhoto'));
        }
      }, []);

    // Método para cambiar la foto
    const handleUploadPhoto = async () => {
        if (!file) return;
        setLoadingPhoto(true);
        setErrorPhoto(null);
        
        const formData = new FormData();
        formData.append('foto_perfil', file);
        try {
            const response = await axios.post(
                `/api/profesores/${id_profesor}/upload-photo`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            // Actualizar el estado y localStorage
            setCurrentPhoto(response.data.path);
            localStorage.setItem('userPhoto', response.data.path);
            setFile(null);
            setExistPhoto(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorPhoto(error.response?.data?.message || 'Error al subir la foto');
            } else {
                setErrorPhoto('Error desconocido al subir la foto');
            }
        } finally {
            setLoadingPhoto(false);
        }
    };
    // Método para mostrar el pin
    const handleToggleShowPin = () => {  
        setShowPin((prevShowPin) => !prevShowPin);  
    }; 
    // Método para mostrar el confirmar pin
    const handleToggleShowConfPin = () => {  
        setShowConfPin((prevShowConfPin) => !prevShowConfPin);  
    };
    // Formulario para el correo
    const formCorreo = useForm({
        initialValues: { correo: ''},
        // 
        validate: {
            correo: isEmail('Correo electrónico inválido'),
        },
    });
    // Método para cambiar el correo 
    const handleSubmitCorreo = async () => {
        if(!formCorreo.isValid()) return ;
        setErrorCorreo(null); // Limpiar errores previos
        setLoadingCorreo(true); // Iniciar el estado de carga
        
        try {
            const response = await axios.put(`/api/cambiar-correo/${id_profesor}`, {
                correo: formCorreo.values.correo,
            });
            formCorreo.reset();
            setErrorCorreo('Correo cambiado con suceso');
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.response?.status === 422){
                    const errors = error.response.data.errors;
                    const errorMessage = Object.values(errors).flat().join(', ');
                    setErrorCorreo(errorMessage);
                }
                else {
                    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
                    setErrorCorreo(errorMessage);
                }
            } else {
                setErrorCorreo('Error inesperado. Por favor, inténtalo de nuevo.');
            }
        } finally {
            setLoadingCorreo(false);
        }
    };
    // Formulario para la contraseña
    const formContrasenia = useForm({
        initialValues: { contrasenia: '', confirmContrasenia: ''},
            
        // functions will be used to validate values at corresponding key
        validate: {
            contrasenia: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            confirmContrasenia: (value, values) => value !== values.contrasenia ? 'Passwords did not match' : null,
        },
    });
    // Método para cambiar o guardar la contraseña
    const handleSubmitContrasenia = async () => {
        if(!formContrasenia.isValid()) return ;
        setLoadingContrasenia(true); // Iniciar el estado de carga
        setErrorContrasenia(null); // Limpiar errores previos
        
        try {
            const response = await axios.put(`/api/cambiar-contrasenia/${id_profesor}`, {
                contrasenia: formContrasenia.values.contrasenia,
            });
            formContrasenia.reset();
            setErrorContrasenia('Contraseña modificado con suceso');
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.response?.status === 422){
                    const errors = error.response.data.errors;
                    const errorMessage = Object.values(errors).flat().join(', ');
                    setErrorContrasenia(errorMessage);
                }
                else {
                    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
                    setErrorContrasenia(errorMessage);
                }
            } else {
                setErrorContrasenia('Error inesperado. Por favor, inténtalo de nuevo.');
            }
        } finally {
            setLoadingContrasenia(false);
        }
    };
    // Formulario para el numero de telefono 
    const formTelefono = useForm({
        initialValues: { telefono: '', confirmTelefono: ''},
            
        // functions will be used to validate values at corresponding key
        validate: {
            telefono: (value) => {  
                const digits = value.replace(/\D/g, ''); // Solo números  
                return digits.length !== 10 ? 'Número de teléfono inválido' : null;  
            },
            confirmTelefono: (value, values) => value !== values.telefono ? 'Los números de telefonos no coenciden' : null,
        },
    });
    // Método para cambiar o guardar nuevo numero de telefono 
    const handleSubmitTelefono = async () => {
        if(!formTelefono.isValid()) return ;
        setLoadingTelefono(true); // Iniciar el estado de carga
        setErrorTelefono(null); // Limpiar errores previos
        
        try {
            const response = await axios.put(`/api/cambiar-telefono/${id_profesor}`, {
                telefono: formTelefono.values.telefono,
            });
            formTelefono.reset();
            setErrorTelefono('Numero de telefono cambiado con suceso');
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.response?.status === 422){
                    const errors = error.response.data.errors;
                    const errorMessage = Object.values(errors).flat().join(', ');
                    setErrorTelefono(errorMessage);
                }
                else {
                    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
                    setErrorTelefono(errorMessage);
                }
            } else {
                setErrorTelefono('Error inesperado. Por favor, inténtalo de nuevo.');
            }
        } finally {
            setLoadingTelefono(false);
        }
    };
    // Formulario para el pin
    const formPin = useForm({
        initialValues: { pin: '', confirmPin: ''},
            
        // functions will be used to validate values at corresponding key
        validate: {
            pin: (value) => (value.length < 3 ? 'El pin tiene que ser al menos 4 numeros' : null),
            confirmPin: (value, values) => {
                if(value !== values.pin) {
                    return 'Los pines no coenciden';
                }
                return null;
            }
        },
    });
    // Método para guardar el pin
    const handleSubmitPin = async () => {
        if(!formPin.isValid()) return ;
        setLoadingPin(true); // Iniciar el estado de carga
        setErrorPin(null); // Limpiar errores previos
        
        try {
            const response = await axios.put(`/api/cambiar-pin/${id_profesor}`, {
                pin: formPin.values.pin,
            });
            formPin.reset();
            setErrorPin('Pin cambiado con suceso');
            console.log("Respuesta del servidor:", response.data);
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.response?.status === 422){
                    const errors = error.response.data.errors;
                    const errorMessage = Object.values(errors).flat().join(', ');
                    setErrorPin(errorMessage);
                }
                else {
                    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
                    setErrorPin(errorMessage);
                }
            } else {
                setErrorPin('Error inesperado. Por favor, inténtalo de nuevo.');
            }
        } finally {
            setLoadingPin(false);
        }
    };
    // Método para eliminar una foto 
    const handleDeletePhoto = async () => {
        setLoadingPhoto(true);
        try {
            await axios.delete(`/api/profesores/${id_profesor}/delete-photo`);
            const defaultPhoto = 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png';
            setCurrentPhoto(defaultPhoto);
            localStorage.setItem('userPhoto', defaultPhoto);
            setErrorPhoto('Foto eliminada correctamente');
        } catch (error) {
            setErrorPhoto('Error al eliminar la foto');
        } finally {
            setLoadingPhoto(false);
        }
    };

    return (
        <Container size={'lg'}>
            {/* <Text mt={20} ml={500} fw={600} size='xl'>Mi Perfil</Text> */}
            <Card >
                <Grid>
                    <Grid.Col span={5}>
                        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                            <Avatar
                                src={preview || currentPhoto}
                                size={120}
                                radius={120}
                                mx="auto"
                                alt="Foto de perfil"
                                // color='dark'
                            />
                            <Text ta="center" fz="h4" fw={500} mt="md">
                                {localStorage.getItem('userName')} {localStorage.getItem('userLastName')}
                            </Text>
                            <Text ta="center" size="md">{updateRol}</Text>
                            <Text size='sm' ta="center" c="dimmed">{localStorage.getItem('userEmail')}</Text>
                            {/* <Group justify="center" mt={10}>
                                <FileButton
                                    onChange={(selectedFile) => {
                                    if (selectedFile) {
                                        setFile(selectedFile);
                                        setPreview(URL.createObjectURL(selectedFile));
                                        setErrorPhoto(null);
                                    }
                                    }}
                                    accept="image/png,image/jpeg"
                                >
                                    {(props) => (
                                    <ActionIcon
                                        size="lg"
                                        color="blue"
                                        variant="filled"
                                        aria-label="Subir foto"
                                        {...props}
                                        loading={loadingPhoto}
                                    >
                                        <IconPhotoEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                    </ActionIcon>
                                    )}
                                </FileButton>

                                <ActionIcon
                                    size="lg"
                                    color="red"
                                    variant="filled"
                                    aria-label="Eliminar foto"
                                    onClick={handleDeletePhoto}
                                    loading={loadingPhoto}
                                    disabled={existPhoto} // Deshabilitar si es la foto por defecto
                                >
                                    <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                            </Group> */}

                            {/* {file && (
                            <Group justify="center" mt="sm">
                                <Button
                                size="xs"
                                onClick={handleUploadPhoto}
                                loading={loadingPhoto}
                                leftSection={<IconPhotoUp size={16} />}
                                >
                                Guardar foto
                                </Button>
                                <Button
                                size="xs"
                                color="red"
                                variant="outline"
                                onClick={() => {
                                    setFile(null);
                                    setPreview(null);
                                }}
                                leftSection={<IconPhotoX size={16} />}
                                >
                                Cancelar
                                </Button>
                            </Group>
                            )}

                            {errorPhoto && (
                            <Text c={errorPhoto.includes('correctamente') ? "green" : "red"} size="sm" ta="center" mt="sm">
                                {errorPhoto}
                            </Text>
                            )} */}
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Paper radius="sm" withBorder p="lg" bg="var(--mantine-color-body)">
                            <Title ta="center" order={3} mb={40}>Editar Cuenta</Title>
                            <Tabs defaultValue="contacto">
                                <Tabs.List>
                                    <Tabs.Tab value="contacto" leftSection={<IconPasswordMobilePhone size={16} />}>
                                        Cambiar Contactos
                                    </Tabs.Tab>
                                    <Tabs.Tab value="contrasenia" leftSection={<IconPasswordUser size={16} />}>
                                        Cambiar contraseña
                                    </Tabs.Tab>
                                    <Tabs.Tab value="pin" leftSection={<IconLockCog size={16} />}>
                                        Cambiar pin
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="contacto">
                                    <Text mt={10} c={'gray'} fw={300} size='sm'>Cambie su contacto en caso que tengas otro </Text>
                                    <form onSubmit={formCorreo.onSubmit(handleSubmitCorreo)}>
                                        <Grid mt={10}>
                                            <Grid.Col span={12}>
                                                <TextInput 
                                                    withAsterisk 
                                                    label='Correo electronico'
                                                    mb={10} 
                                                    placeholder="Introduzca su nuevo correo"
                                                    leftSection={<IconAt size={16} />} 
                                                    {...formCorreo.getInputProps('correo')}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        <Text c={'blue'} >{errorCorreo}</Text>
                                        <Button type="submit" loading={loadingCorreo} rightSection={<IconRefresh size={16} />} fullWidth>Cambiar Correo</Button>
                                    </form>
                                    <form onSubmit={formTelefono.onSubmit(handleSubmitTelefono)}>
                                        <Grid mt={10}>
                                            <Grid.Col span={6}>
                                                <Input.Wrapper withAsterisk label="Número de teléfono" mb={10}>
                                                    <Input 
                                                        leftSection={<IconDeviceMobile size={16} />}
                                                        component={IMaskInput} mask="+53 00000000"
                                                        placeholder="Digite aqui su número de teléfono"
                                                        key={formTelefono.key('telefono')}
                                                        {...formTelefono.getInputProps('telefono')}
                                                    />
                                                </Input.Wrapper> 
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <Input.Wrapper withAsterisk label="Confirmar número" mb={5}>
                                                    <Input 
                                                        leftSection={<IconDeviceMobile size={16} />}
                                                        component={IMaskInput} mask="+53 00000000"
                                                        placeholder="Confirme aqui su número de teléfono"
                                                        key={formTelefono.key('confirmTelefono')}
                                                        {...formTelefono.getInputProps('confirmTelefono')}
                                                    />
                                                </Input.Wrapper> 
                                            </Grid.Col>
                                        </Grid>
                                        <Text c={'blue'} >{errorTelefono}</Text>
                                        <Button type="submit" loading={loadingTelefono} rightSection={<IconRefresh size={16} />} fullWidth>Cambiar nro de telefono</Button>
                                    </form>
                                </Tabs.Panel>

                                {/* Nueva Contraseña */}
                                <Tabs.Panel value="contrasenia">
                                    <Text mt={10} c={'gray'} fw={300} size='sm'>Cree una nueva contraseña</Text>
                                    <form onSubmit={formContrasenia.onSubmit(handleSubmitContrasenia)}>   
                                        <Grid mt={10} mb={10}>
                                            <Grid.Col span={6}>
                                                <PasswordInput
                                                    label='Nueva contraseña'
                                                    leftSection={<IconLock size={16} />}
                                                    placeholder="Digite aqui la contraseña"
                                                    withAsterisk
                                                    {...formContrasenia.getInputProps('contrasenia')}
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <PasswordInput
                                                    label='Confirme la contraseña'
                                                    withAsterisk
                                                    leftSection={<IconLockCheck  size={16} />}
                                                    placeholder="Confirme aqui la contraseña"
                                                    {...formContrasenia.getInputProps('confirmContrasenia')}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        <Text c={'blue'} >{errorContrasenia}</Text>
                                        <Button type="submit" loading={loadingContrasenia} rightSection={<IconRefresh size={16} />} fullWidth>Cambiar contraseña</Button>
                                    </form> 
                                </Tabs.Panel>
                                {/* Nuevo PIN */}
                                <Tabs.Panel value="pin">
                                    <Text mt={10} c={'gray'} fw={300} >Cree una nuevo PIN</Text>
                                    <form onSubmit={formPin.onSubmit(handleSubmitPin)}>
                                        <Grid mt={10}>
                                            <Grid.Col span={6}>
                                                <Input.Wrapper withAsterisk label="Ingrese el PIN" description="El pin debe tener al menos 4 números">
                                                    <PinInput
                                                        mask={!showPin}
                                                        type="number" 
                                                        key={formPin.key('pin')}
                                                        {...formPin.getInputProps('pin')}
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
                                                        key={formPin.key('confirmPin')}
                                                        {...formPin.getInputProps('confirmPin')}
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
                                            <Text c={'blue'} >{errorPin}</Text>
                                            <Button type='submit' loading={loadingPin} rightSection={<IconRefresh size={16} />} fullWidth>Cambiar PIN</Button>
                                        </Grid>
                                    </form>
                                </Tabs.Panel>
                            </Tabs>
                        </Paper>
                    </Grid.Col>
                    
                </Grid>
            </Card>
        </Container>
    );
}