import { Container, Card, Input, PasswordInput, Button, Text, TextInput, CloseButton } from '@mantine/core';
import { Grid, Select, Checkbox, Title } from '@mantine/core';
import { IconAt, IconPhone, IconLock, IconLockCheck, IconSchool, IconDeviceMobile, IconSend, IconId } from '@tabler/icons-react';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { isEmail, useForm } from '@mantine/form';

export function RegistrarProfe() {
    const [showSchoolRegistration, setShowSchoolRegistration] = useState(false);
    const [schoolSelectDisabled, setSchoolSelectDisabled] = useState(false);
    const [value, setValue] = useState('');
    

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        setShowSchoolRegistration(event.currentTarget.checked);  
        setSchoolSelectDisabled(event.currentTarget.checked);  
    }; 

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { name: '', email: '', age: 0, password: '',lastname: '', phone: '', schoolPhone: '',
            confirmPassword: '', province: '', municipality: '', school: '', cardNumber: '', schoolName: '',
            writeschool: '' },
            
        // functions will be used to validate values at corresponding key
        validate: {
                name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
                lastname: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
                email: isEmail('Invalid email'),
                age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
                password: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
                confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
                province: (value) => (!value ? 'Seleccione una provincia' : null),  
                municipality: (value) => (!value ? 'Seleccione un municipio' : null),  
                school: (value) => (!value ? 'Seleccione una escuela' : null),
                cardNumber: (value) =>  
                    value.length !== 11 ? 'Número de carnet inválido' : null,
                phone: (value) =>  
                    value.length !== 8 ? 'Número de teléfono inválido' : null,
                schoolPhone: (value) =>  
                    value.length !== 8 ? 'Número de teléfono inválido' : null,
                schoolName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
                writeschool: (value) =>  (value.length < 2 ? 'Name must have at least 2 letters' : null),
            },
        });
    return (
        <Container size='md'>
            <Title ta={'center'} order={2} mb={10} >Solicitar registro como profesor</Title>
            
            <Card withBorder>
                {/* Inicio del Card <Datos Personales> */}
                <form onSubmit={form.onSubmit(console.log)}>
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
                        rightSection={
                            <CloseButton
                                aria-label="Clear input"
                                onClick={() => setValue('')}
                                style={{ display: value ? undefined : 'none' }}
                            />
                        }        
                    />
                    <Grid>
                        <Grid.Col span={6}>
                            <Input.Wrapper withAsterisk label="Teléfono">
                                <Input 
                                    leftSection={<IconDeviceMobile size={16} />} 
                                    component={IMaskInput} mask="+53 00000000" 
                                    placeholder="Digite aqui su numero de telefono" 
                                    // rightSection={
                                    //     <CloseButton
                                    //         aria-label="Clear input"
                                    //         onClick={() => setValue('')}
                                    //         style={{ display: value ? undefined : 'none' }}
                                    //     />
                                    // }
                                    {...form.getInputProps('phone')}
                                    
                                />
                            </Input.Wrapper>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Input.Wrapper withAsterisk label="Numero de carnet">
                                <Input
                                    // onChange={(event) => setValue(event.currentTarget.value)}
                                    rightSectionPointerEvents="all"
                                    leftSection={<IconId size={16} />}
                                    component={IMaskInput} 
                                    value={value}
                                    mask="00000000000" 
                                    placeholder="Digite aqui su numero de carnet"
                                    {...form.getInputProps('cardNumber')} 
                                    
                                />
                            </Input.Wrapper>
                        </Grid.Col>
                    </Grid>
                </Card>
                {/* Inicio del Card Datos de la Escuela */}
                <Card shadow="sm" withBorder mt={10}>
                    <Text fw={700}>
                        Datos de la Escuela
                    </Text>
                    <Grid mt={10}>
                        <Grid.Col span={6}>
                            <Select
                                label="Provincia"
                                withAsterisk
                                clearable
                                placeholder="Seleccione la provincia"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                                {...form.getInputProps('province')}  
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="Municipio"
                                withAsterisk
                                clearable
                                placeholder="Seleccione el municipio"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                                {...form.getInputProps('municipality')} 
                            />
                        </Grid.Col>
                        
                    </Grid>
                    <Grid mt={10}>
                        <Grid.Col span={12}>
                            <Select
                                label="Escuela"
                                withAsterisk
                                leftSection={<IconSchool size={16} />}
                                clearable
                                disabled={schoolSelectDisabled}  
                                placeholder="Seleccione la escuela"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                                {...form.getInputProps('school')}
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
                {/* Inicio del card Datos de la Cuenta */}
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
                                // rightSection={
                                //     <CloseButton
                                //         aria-label="Clear input"
                                //         onClick={() => setValue('')}
                                //         style={{ display: value ? undefined : 'none' }}
                                //     />
                                // }
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
                {/* Boton de enviar solicitud de registro */}
                <Button type='submit' fullWidth rightSection={<IconSend  size={16} />}>Enviar solicitud de registro</Button>
            
                </form>
            </Card>
            
        </Container>
    );
}

