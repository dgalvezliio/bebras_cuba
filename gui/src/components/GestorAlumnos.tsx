
import { Container, Card, Modal, Button, Group, Input, Grid, Select, Checkbox, 
    Text, Title, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FileInput, rem } from '@mantine/core';
import { IconArrowUp, IconCsv, IconTableFilled } from '@tabler/icons-react';
import { TablaAlumnos } from './TablaAlumnos';
import { BotonCargarCSV } from './BotonCargarCSV'; 
import { useState } from 'react';
import { IMaskInput } from 'react-imask';

export function GestorAlumnos() {
    const icon = <IconCsv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
    const [opened, { open, close }] = useDisclosure(false); 
    const [isSexoChecked, setIsSexoChecked] = useState(false);
    const [sSexoChecked, etIsSexoChecked] = useState(false);


    const handleSexoCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        setIsSexoChecked(event.target.checked);  
    }; 
    const andleSexoCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        etIsSexoChecked(event.target.checked);  
    }; 

    return (
        <Container size="lg">
            <Card withBorder>
                <Title order={3}>Tabla de alumnos</Title>
                <Group justify='space-between'>
                    <Text c="dimmed" >Administre sus estudiantes segun las necesidades</Text>
                    <Button mt={10} rightSection={<IconArrowUp size={15} />}>Subir grado</Button>
                </Group>
                
                <TablaAlumnos />
                {/* Registrar alumno */}
                <Modal opened={opened} onClose={close} title="Registrar Alumno">
                    <Input.Wrapper label="Numero de ci" withAsterisk>
                        <Input component={IMaskInput} mask="00000000000" placeholder="Digite el numero de ci" />
                    </Input.Wrapper>

                    <Input.Wrapper label="Nombre Completo" withAsterisk>
                        <Input placeholder="Digite el nombre del alumno" />
                    </Input.Wrapper>
                    
                    <Grid mt={10}>
                        <Grid.Col span={6}>
                            <Select
                                label="Sexo"
                                withAsterisk
                                placeholder="Seleccione el sexo"
                                clearable
                                data={['Masculino', 'Fememino']}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="Grado"
                                withAsterisk
                                placeholder="Seleccione el grado"
                                clearable
                                data={['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo', '11ro', '12do']}
                            />
                        </Grid.Col>
                    </Grid>
                    <Group mt={10}>
                    </Group>
                    <Text size="sm" mb={5} c="red" >Alumno no es de tu escuela?</Text>
                    <Checkbox
                        defaultChecked
                        label="Seleccionar su escuela"
                        checked={sSexoChecked}  
                        onChange={andleSexoCheckboxChange} 
                    />
                    <Select
                        mt={5}
                        mb={10}
                        withAsterisk
                        label="Escuela"
                        clearable
                        placeholder="Seleccione la escuela"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                        disabled={!sSexoChecked} 
                    />
                    <Button variant="filled" >Registrar</Button>
                </Modal>
                
                <Grid>
                    <Grid.Col span={2}>
                        <Group>
                            <Button mt={20} variant="filled" onClick={open}>Inscribir Alumno</Button>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <FileInput leftSection={icon} mt={20} clearable placeholder="Upload files" />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <BotonCargarCSV />
                    </Grid.Col>
                </Grid>
            </Card>
            
            <Card withBorder mt={'md'}>
                <Title order={3}>Generar tabla alumnos</Title>
                <Text c="dimmed" >Genere tabla segun datos que pretiendes visualizar</Text>
                
                <Grid>
                    <Grid.Col span={5}>
                        <MultiSelect
                            label="Seleccione las columnas"
                            placeholder="Seleccione las columnas a generar"
                            data={['Nombre', 'Escuela', 'Grado']}
                            clearable
                        />
                    </Grid.Col>
                    
                    <Grid.Col span={4}>
                        <MultiSelect
                            label="Seleccione el sexo"
                            placeholder="Seleccione sexo"
                            data={['Masculino', 'Femenino']}
                            disabled={!isSexoChecked} 
                            hidePickedOptions
                            clearable
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Group mt={25}>  
                            <Button variant="filled" rightSection={<IconTableFilled size={16} />} >Generar tabla</Button>
                        </Group>  
                    </Grid.Col>
                </Grid>

                <Title order={4} mt={20}>Agrupar datos</Title>   
                <Text c="dimmed" size='md' >Agrupe los datos por</Text>
                <Grid mt={10}>
                    <Grid.Col mr={20} span={1}>
                        <Checkbox
                            label="Categoria"
                        />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Checkbox
                            label="Sexo"
                            checked={isSexoChecked}  
                            onChange={handleSexoCheckboxChange} 
                        />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Checkbox
                            label="Medalla"
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                    <Checkbox
                            label="Puntuación"
                        />
                    </Grid.Col>
                </Grid>    
                
            </Card>
        </Container>
        
    );
}



