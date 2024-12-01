import { Container, Card, Input, PasswordInput, Button, Text, TextInput, CloseButton } from '@mantine/core';
import { Grid, Select, Checkbox, Title } from '@mantine/core';
import { IconAt, IconPhone, IconLock, IconLockCheck, IconSchool, IconDeviceMobile, IconSend, IconId } from '@tabler/icons-react';
import { IMaskInput } from 'react-imask';
import { InputBase } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useEffect, useState } from 'react';  
import axios from 'axios'; 
axios.defaults.baseURL = 'http://localhost:8000'; // <--- Ajusta según tu configuración

interface Provincia {
    value: string;
    label: string;
}

interface Municipio {
    value: string;
    label: string;
}

interface Escuela {
    value: string;
    label: string;
}

export function RegistrarProfe() {
    const [showSchoolRegistration, setShowSchoolRegistration] = useState(false);
    const [schoolSelectDisabled, setSchoolSelectDisabled] = useState(false);
    // const [value, setValue] = useState('');
    
    const [provinces, setProvinces] = useState<Provincia[]>([]);
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [escuelas, setEscuelas] = useState<Escuela[]>([]);

    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
    const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        setShowSchoolRegistration(event.currentTarget.checked);  
        setSchoolSelectDisabled(event.currentTarget.checked);  
    }; 

    // Funcion para cargar las provincias
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('/api/provincias');  // URL correcta para obtener provincias
                console.log("Provincias response data:", response.data);  // Consola para verificar datos
                const provincesData = response.data.map((provincia: { codigo: number; nombre: string }) => ({
                    value: String(provincia.codigo), // Convertir el código a string
                    label: provincia.nombre,
                }));
                setProvinces(provincesData);
            } catch (error) {
                console.error("Error al cargar las provincias", error);
            }
        };
        fetchProvinces();
    }, []);

    // Función para Cargar Municipios
    const fetchMunicipios = async (provinciaCodigo: string) => {
        try {
            const response = await axios.get(`/api/municipios/${provinciaCodigo}`);
            const municipiosData = response.data.map((municipio: { codigo: number; nombre: string }) => ({
                value: String(municipio.codigo),
                label: municipio.nombre,
            }));
            setMunicipios(municipiosData);
        } catch (error) {
            console.error("Error al cargar municipios:", error);
        }
    };

    // Función para Cargar Escuelas
    const fetchEscuelas = async (cdgoMunicipio: string) => {
        try {
            const response = await axios.get(`/api/escuelas/${cdgoMunicipio}`);
            
            // Filtrar opciones con `value` vacío y eliminar duplicados
            const filteredEscuelas = response.data
                .filter((escuela: Escuela) => escuela.value && escuela.value.trim() !== "")
                .map((escuela: Escuela) => ({
                    ...escuela,
                    value: String(escuela.value) // Asegúrate de que `value` sea string
                }));
    
            // Eliminar duplicados basados en `value`
            const uniqueEscuelas = filteredEscuelas.reduce((acc: Escuela[], current: Escuela) => {
                const isDuplicate = acc.some(item => item.value === current.value);
                if (!isDuplicate) {
                    acc.push(current);
                }
                return acc;
            }, []);
    
            setEscuelas(uniqueEscuelas);
        } catch (error) {
            console.error("Error al cargar las escuelas:", error);
        }
    };
    
    // Cambio de Provincia Seleccionada
    const handleProvinceChange = (provinciaCodigo: string | null) => {
        setSelectedProvinceCode(provinciaCodigo);
        setSelectedMunicipio(null); // Limpiar el municipio seleccionado al cambiar de provincia
        setEscuelas([]); // Limpiar el select de escuela
        setMunicipios([]); // Limpiar la lista de municipios  
        setSchoolSelectDisabled(false); // Deshabilitar el select de escuela
        if (provinciaCodigo) {
            fetchMunicipios(provinciaCodigo);
        } else {
            setMunicipios([]);  // Limpiar municipios si no hay provincia seleccionada
        }
    };

    // Cambio de Municipio Seleccionado
    const handleMunicipioChange = (municipioCodigo: string | null) => {
        setSelectedMunicipio(municipioCodigo);
        setEscuelas([]); // Limpiar el select de escuela
        if (municipioCodigo) {
            fetchEscuelas(municipioCodigo);
            setSchoolSelectDisabled(true); // Habilitar el select de escuela
        } else {
            setEscuelas([]);
            setSchoolSelectDisabled(false); // Deshabilitar si no hay municipio seleccionado
        }
    };

    // const handleSubmit = async (values: typeof form.values) => {
    //         try {
    //         console.log('Enviando datos al servidor...', values);
                
    //         const response = await axios.post('/api/profesores', {
    //             personal: {
    //             nombre: values.name,
    //             apellidos: values.lastname,
    //             nro_ci: values.cardNumber,
    //             telefono: values.phone,
    //             correo: values.email,
    //             },
    //             escuela: {
    //             id_escuela: values.school,
    //             },
    //             cuenta: {
    //             password: values.password,
    //             },
    //         });
        
    //         alert('¡Profesor registrado exitosamente!');
    //         form.reset();
    //         } catch (error: any) {
    //         console.error('Error en la solicitud:', error.response?.data || error.message);
    //         alert(error.response?.data?.error || 'Hubo un error al registrar el profesor.');
    //         }
    //     };
    
    const handleSubmit = async (values: typeof form.values) => {
        alert('Formulario enviado correctamente con los valores: ' + JSON.stringify(values));
    };
    
    // Validaciones 
    const form = useForm({
        initialValues: { name: '', email: '', password: '',lastname: '', phone: '', schoolPhone: '',
            confirmPassword: '', province: '', municipality: '', school: '', cardNumber: '', schoolName: '',
            writeschool: '' },
            
        // functions will be used to validate values at corresponding key
        validate: {
            name: (value) =>
                value.length < 3 ? 'Name must have at least 2 letters' :
                /[^a-zA-Z\s]/.test(value) ? 'Name can only contain letters' : null,
            
            lastname: (value) =>
                value.length < 3 ? 'Last name must have at least 2 letters' :
                /[^a-zA-Z\s]/.test(value) ? 'Last name can only contain letters' : null,

            email: isEmail('Invalid email'),
            password: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null,
            province: (value) => (!value ? 'Seleccione una provincia' : null),  
            municipality: (value) => (!value ? 'Seleccione un municipio' : null),  
            school: (value) => (!value ? 'Seleccione una escuela' : null),
            cardNumber: (value) => {
                const digits = value.replace(/\D/g, ''); // Solo números
                return digits.length !== 11 ? 'Número de carnet inválido' : null;
            },
            phone: (value) => {
                const digits = value.replace(/\D/g, ''); // Solo números
                return digits.length !== 10 ? 'Número de teléfono inválido' : null;
            },schoolPhone: (value) =>  (value.length !== 8 ? 'Número de teléfono inválido' : null),
            schoolName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            writeschool: (value) =>  (value.length < 2 ? 'Name must have at least 2 letters' : null),
        },
        
    });

    return (
        <Container size='md' mt={50}>
            <Title ta={'center'} order={2} mb={10}>Solicitar registro como profesor</Title>
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
                                    key={form.key('name')}
                                    {...form.getInputProps('name')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput 
                                    label='Apellidos' mb={10} 
                                    placeholder="Digite sus apellidos" 
                                    withAsterisk
                                    key={form.key('lastname')}
                                    {...form.getInputProps('lastname')}
                                />
                            </Grid.Col>
                        </Grid>
                        
                        <TextInput 
                            withAsterisk 
                            label='Correo electrónico' 
                            mb={10} placeholder="Correo electronico" 
                            leftSection={<IconAt size={16} />} 
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <Grid>
                            <Grid.Col span={6}>    
                                <InputBase
                                    withAsterisk
                                    label="Tu Telefono"
                                    component={IMaskInput}
                                    mask="+53 00000000"
                                    placeholder="Digite aqui su numero de telefono"
                                    // description="Escribe +53 primero y luego los demas numeros"
                                    // inputWrapperOrder={['label', 'error', 'input', 'description']}
                                    key={form.key('phone')}
                                    {...form.getInputProps('phone')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <InputBase
                                    withAsterisk
                                    label="Tu Carnet"
                                    component={IMaskInput}
                                    mask="00000000000"
                                    placeholder="Digite aqui su numero de carnet"
                                    // description='Escriba abajo su numero de carnet'
                                    // inputWrapperOrder={['label', 'error', 'input', 'description']}
                                    key={form.key('cardNumber')}
                                    {...form.getInputProps('cardNumber')}
                                />
                            </Grid.Col>
                        </Grid>
                    </Card>
                    {/* Inicio del card datos de la escuela */}
                    <Card shadow="sm" withBorder mt={10}>
                        <Text fw={700}>
                            Datos de la Escuela
                        </Text>
                        <Grid mt={10}>
                            <Grid.Col span={6}>
                                {provinces.length > 0 ? (
                                    <Select
                                        label="Provincia"
                                        withAsterisk
                                        clearable
                                        placeholder="Seleccione la provincia"
                                        data={provinces}
                                        onChange={handleProvinceChange}
                                    />
                                ) : (
                                    <Text color="red">Error al cargar provincias</Text>
                                )}
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    label="Municipio"
                                    withAsterisk
                                    clearable
                                    placeholder="Seleccione el municipio"
                                    data={municipios}
                                    onChange={handleMunicipioChange}
                                    disabled={!selectedProvinceCode}  // Deshabilitar si no hay provincia seleccionada
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid mt={10}>
                            <Grid.Col span={12}>
                                <Select
                                    label="Escuela"
                                    withAsterisk
                                    leftSection={<IconSchool size={16} />}
                                    description="La escuela esta listado por ( nombre de la escuela / subsistema / poblado)"
                                    clearable
                                    placeholder="Seleccione la escuela"
                                    data={escuelas}  // Las escuelas ya estarán en el formato { label, value }
                                    {...form.getInputProps('school')}
                                    disabled={!schoolSelectDisabled}  // Deshabilitado según municipio
                                />
                            </Grid.Col>
                        </Grid>
                        <Text mt={10} color='red'>
                            No encuentras su escuela ?
                        </Text>
                        <Checkbox  
                            mt={10}  
                            label="Solicitar registro de mi escuela"  
                            onChange={handleCheckboxChange}   
                        /> 
                        {/* Solicitar registro escuela */}
                        {showSchoolRegistration && (  
                            <>  
                                <Grid>  
                                    <Grid.Col span={8}>  
                                        <TextInput 
                                            mt={10} 
                                            description="Nombre de tu escuela" 
                                            withAsterisk label='Escuela' mb={10} 
                                            placeholder="Escribe nombre su escuela aqui" 
                                            leftSection={<IconSchool size={16} />} 
                                            key={form.key('lastname')}
                                            {...form.getInputProps('lastname')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={4}>  
                                        <Input.Wrapper mt={10} withAsterisk label="Teléfono" description="Numero de telefono de tu escuela">
                                            <Input
                                                leftSection={<IconPhone size={16} />}  
                                                component={IMaskInput}  
                                                mask="+00 00000000"  
                                                placeholder="Digite el numero aqui"
                                                {...form.getInputProps('schoolPhone')}  
                                            />
                                        </Input.Wrapper>      
                                    </Grid.Col>  
                                </Grid>  
                            </>  
                            )}
                    </Card>
                    {/* Inicio del card datos de la cuenta */}
                    <Card shadow="sm" withBorder mt={10} mb={10}>
                        <Text fw={700}>
                            Datos de la Cuenta
                        </Text>
                        
                        <Grid mt={10}>
                            <Grid.Col span={6}>
                                <PasswordInput
                                    label='Contraseña'
                                    leftSection={<IconLock size={16} />}
                                    placeholder="Digite aqui la contraseña"
                                    withAsterisk
                                    key={form.key('password')}
                                    {...form.getInputProps('password')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <PasswordInput
                                    label='Confirme la contraseña'
                                    withAsterisk
                                    leftSection={<IconLockCheck  size={16} />}
                                    placeholder="Confirme aqui la contraseña"
                                    key={form.key('confirmPassword')}
                                    {...form.getInputProps('confirmPassword')}
                                />
                            </Grid.Col>
                        </Grid>
                    </Card>
                    {/* Botón de enviar solicitud de registro */}
                    <Button type='submit' fullWidth rightSection={<IconSend  size={16} />}>Enviar solicitud de registro</Button>
                </form>
            </Card>
        </Container>
    );
}
