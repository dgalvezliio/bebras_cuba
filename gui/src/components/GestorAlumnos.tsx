
import { Container, Card, Modal, Button, Group, Input, Grid, Select, Checkbox, 
    Text, Title, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FileInput, rem } from '@mantine/core';
import { IconArrowUp, IconCsv, IconTableFilled } from '@tabler/icons-react';
import { TablaAlumnos } from './TablaAlumnos';
import { BotonCargarCSV } from './BotonCargarCSV'; 
import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import axios from 'axios';

export function GestorAlumnos() {
    const icon = <IconCsv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;  
    const [opened, { open, close }] = useDisclosure(false);   
    const [isSexoChecked, setIsSexoChecked] = useState(false);  
    const [sSexoChecked, setSSexoChecked] = useState(false);  

    // Estado para el registro del alumno  
    const [formData, setFormData] = useState({  
        nro_ci: '',  
        nombre: '',  
        sexo: '',  
        grado: '',  
        escuela: '',  
    });  
    const [notification, setNotification] = useState<{ message: string; color: 'green' | 'red' } | null>(null);  

    const handleSexoCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        setIsSexoChecked(event.target.checked);  
    };   

    // const handleSexoCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    //     setSSexoChecked(event.target.checked);  
    // };   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
        const { name, value } = e.target;  
        setFormData({ ...formData, [name]: value });  
    };  

    const handleSubmit = async () => {  
        try {  
            const response = await axios.post('http://127.0.0.1:8000/api/estudiantes', formData);  
            setNotification({ message: response.data.message, color: 'green' });  
            close(); // Cerrar el modal después del registro exitoso  
            setFormData({ nro_ci: '', nombre: '', sexo: '', grado: '', escuela: '' }); // Limpiar los datos del formulario
            alert('Estudiante registrado exitosamente.');
        } catch (error) {  
            if (axios.isAxiosError(error) && error.response) {  
                console.log(error.response); 
                alert('Estudiante no fue registrado');
            } else {  
                alert('Ocurrio algo al registrar estudiante');
                console.error(error);  
            }  
        }  
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
                        <Input 
                            component={IMaskInput} 
                            mask="00000000000" 
                            placeholder="Digite el numero de ci" 
                            // value={formData.nro_ci}  
                            // onChange={handleChange} 
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label="Nombre Completo" withAsterisk>
                        <Input 
                            placeholder="Digite el nombre del alumno" 
                            // value={formData.nombre}  
                            // onChange={handleChange}
                        />
                    </Input.Wrapper>
                    
                    <Grid mt={10}>
                        <Grid.Col span={6}>
                            <Select
                                label="Sexo"
                                withAsterisk
                                placeholder="Seleccione el sexo"
                                clearable
                                data={['Masculino', 'Fememino']}
                                onChange={(value) => setFormData({ ...formData, sexo: value || '' })}
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
                    <Text size="sm" mb={2} c="red" > El alumno o la alumna no es de tu escuela?</Text>
                    <Text size="xs" mb={5} c="gray" >No seleccione si no es de tu escuela!</Text>
                    <Checkbox
                        defaultChecked
                        label="Seleccionar su escuela"
                        checked={sSexoChecked}  
                        // onChange={andleSexoCheckboxChange} 
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
                    <Button variant="filled" onClick={handleSubmit} >Registrar</Button>
                </Modal>

                

                <Grid>
                    <Grid.Col span={2}>
                        <Group>
                            <Button mt={20} variant="filled" onClick={open}>Inscribir Alumno</Button>
                        </Group>
                    </Grid.Col>
                    {/* <Grid.Col span={7}>
                        <FileInput leftSection={icon} mt={20} clearable placeholder="Upload files" />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <BotonCargarCSV />
                    </Grid.Col> */}
                </Grid>
            </Card>
            
            {/* <Card withBorder mt={'md'}>
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
                
            </Card> */}
        </Container>
        
    );
}



