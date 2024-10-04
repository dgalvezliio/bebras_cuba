import { Avatar, Button, Checkbox, CloseButton, Container, Fieldset, Grid, Input, Paper, PasswordInput, Select, TextInput, Title } from '@mantine/core';
import { Card, Text } from '@mantine/core';
import { IconAt, IconDeviceMobile, IconId, IconLock, IconLockCheck, IconPhone, IconRefresh, IconSchool } from '@tabler/icons-react';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';

export function CuentaProfesor() {
    const [showSchoolRegistration, setShowSchoolRegistration] = useState(false);
    const [schoolSelectDisabled, setSchoolSelectDisabled] = useState(false);
    const [value, setValue] = useState('Clear me');

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        setShowSchoolRegistration(event.currentTarget.checked);  
        setSchoolSelectDisabled(event.currentTarget.checked);  
    };

    return (
        <Container size={'lg'}>
            <Card >
                <Grid>
                    <Grid.Col span={5}>
                        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                                size={120}
                                radius={120}
                                mx="auto"
                            />
                            <Text ta="center" fz="h4" fw={500} mt="md">
                                Juan Carlos Perez Mendez 
                            </Text>
                            <Text ta="center" size="md">Profesor</Text>
                            <Text size='sm' ta="center" c="dimmed">Santa Clara, Caibarien</Text>
                            <Text size='sm' ta="center" c="dimmed">juanca@uclv.edu.cu</Text>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Paper radius="sm" withBorder p="lg" bg="var(--mantine-color-body)">
                            <Title ta="center" order={3} mb={10}>Editar Cuenta</Title>

                            <Fieldset legend="Información personal" mb={5}>
                                <Grid mb={5}>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Nombre"
                                            withAsterisk
                                            // description="Input description"
                                            placeholder="Input placeholder"
                                            value={'Juan Carlos'}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Apellidos"
                                            withAsterisk
                                            // description="Input description"
                                            placeholder="Input placeholder"
                                            value={'Perez Mendez'}
                                        />
                                    </Grid.Col>
                                </Grid>
                                <TextInput 
                                    withAsterisk 
                                    label='Correo electronico'
                                    mb={5} 
                                    value={'juanca@uclv.edu.cu'}
                                    placeholder="Correo electronico"
                                    leftSection={<IconAt size={16} />} 
                                />
                                <Grid mb={10}>
                            <Grid.Col span={6}>
                            <Input.Wrapper withAsterisk label="Telefono">
                                <Input leftSection={<IconDeviceMobile size={16} />} component={IMaskInput} mask="+53 00000000" value='+53 590392290' placeholder="Digite aqui su numero de telefono" />
                            </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                            <Input.Wrapper withAsterisk label="Numero de carnet">
                                <Input
                                    onChange={(event) => setValue(event.currentTarget.value)}
                                    rightSectionPointerEvents="all"
                                    leftSection={<IconId size={16} />}
                                    component={IMaskInput} 
                                    value={'0209214990001'}
                                    mask="00000000000" 
                                    placeholder="Digite aqui su numero de carnet"
                                    rightSection={
                                        <CloseButton
                                            aria-label="Clear input"
                                            onClick={() => setValue('')}
                                            style={{ display: value ? undefined : 'none' }}
                                        />
                                    }
                                />
                            </Input.Wrapper>
                            </Grid.Col>
                            </Grid>
                                <Button fullWidth rightSection={<IconRefresh size={14} />}>Cambiar datos</Button>
                            </Fieldset> 

                            <Fieldset legend="Información de escuela">
                                <Grid mt={10}>
                                    <Grid.Col span={6}>
                                        <Select
                                            label="Provincia"
                                            withAsterisk
                                            clearable
                                            placeholder="Seleccione la provincia"
                                            data={['React', 'Angular', 'Vue', 'Svelte']}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Select
                                            label="Municipio"
                                            withAsterisk
                                            clearable
                                            placeholder="Seleccione el municipio"
                                            data={['React', 'Angular', 'Vue', 'Svelte']}
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
                                            value={'React'}
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
                                    <TextInput mt={10} withAsterisk label='Escuela' mb={10} placeholder="Escribe nombre su escuela aqui" leftSection={<IconSchool size={16} />} />
                                </Grid.Col>
                                <Grid.Col span={4}>  
                                    <Input.Wrapper mt={10} withAsterisk label="Teléfono">
                                        <Input
                                            leftSection={<IconPhone size={16} />}  
                                            component={IMaskInput}  
                                            mask="+00 00000000"  
                                            placeholder="Numero de telefono"  
                                        />
                                    </Input.Wrapper>      
                                </Grid.Col>  
                            </Grid>  

                        </>  
                        )}
                            <Button fullWidth mt={10} rightSection={<IconRefresh size={14} />}>Editar</Button>
                            
                            </Fieldset>
                            
                            <Fieldset legend="Nueva contraseña">
                                <Grid mt={5}>
                                    <Grid.Col span={6}>
                                        <PasswordInput
                                            label='Nueva contraseña'
                                            leftSection={<IconLock size={16} />}
                                            placeholder="Digite aqui la contraseña"
                                            withAsterisk
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <PasswordInput
                                            label='Confirme la contraseña'
                                            withAsterisk
                                            leftSection={<IconLockCheck  size={16} />}
                                            placeholder="Confirme aqui la contraseña"
                                        />
                                    </Grid.Col>
                                </Grid>
                                <Button fullWidth mt={10} rightSection={<IconRefresh size={14} />}>Cambiar contraseña</Button>
                            </Fieldset>
                            
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Card>

            
            
        </Container>
    );
}