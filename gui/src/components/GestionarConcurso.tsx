import { Container, Title, Button, Group, rem, Grid, Text, Radio, Card, FileInputProps, Pill, FileInput, Table, Checkbox, ActionIcon, MultiSelect, Input, Flex, NumberInput, Select} from '@mantine/core';
import { Fieldset } from '@mantine/core';
import { IconUpload, IconPencil, IconTrash, IconTableFilled, IconCalendarMonth, IconCalendarEvent, IconComponents, IconCaretDownFilled } from '@tabler/icons-react';
import classes from '../styles/FeaturesCards.module.css';
import { DateInput, DatePickerInput, YearPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000'; // <--- Ajusta según tu configuración

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export function GestionarConcurso() {
    const [fecha_i, setFechaI] = useState<[Date | null, Date | null]>([null, null]);
    const [fecha_r, setFechaR] = useState<[Date | null, Date | null]>([null, null]);
    const [fecha, setFecha] = useState<Date | null>(null);
    const [nombre, setNombre] = useState('');  
    const [descripcion, setDescripcion] = useState('');  
    const [archivo, setArchivo] = useState<File | null>(null);  
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [a, setA] = useState<Date | null>(null); // Año de la edición 
    const [nroEdicion, setNroEdicion] = useState('');
    const handleSubmit = async () => {  
        if (!archivo) {  
        alert('Por favor, selecciona un archivo.');  
        return;  
        }  

        const formData = new FormData();  
        formData.append('nombre', nombre);  
        formData.append('descripcion', descripcion);  
        formData.append('archivo', archivo);  

        try {  
        const response = await axios.post('/api/recursos', formData, {  
            headers: {  
            'Content-Type': 'multipart/form-data',  
            },  
        });  
        console.log(response.data);  
        alert('Archivo subido exitosamente');  
        } catch (error) {  
        console.error(error);  
        alert('Error al subir el archivo');  
        }  
    };  

    const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
        if (value === null) {
        return null;
        }
    
        if (Array.isArray(value)) {
        return (
            <Pill.Group>
            {value.map((file, index) => (
                <Pill key={index}>{file.name}</Pill>
            ))}
            </Pill.Group>
        );
        }
    
        return <Pill>{value.name}</Pill>;
    };

    const rows = elements.map((element) => (
        <Table.Tr
            key={element.name}
            bg={selectedRows.includes(element.position) ? 'var(--mantine-color-blue-light)' : undefined}
        >
        <Table.Td>
            <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(element.position)}
            onChange={(event) =>
                setSelectedRows(
                event.currentTarget.checked
                    ? [...selectedRows, element.position]
                    : selectedRows.filter((position) => position !== element.position)
                )
            }
        />
        </Table.Td>
        <Table.Td>{element.position}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.symbol}</Table.Td>
        <Table.Td>{element.mass}</Table.Td>
        <Table.Td>
            <Group gap={0} justify="flex-end">
            <ActionIcon variant="subtle" color="gray">
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red">
                <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            </Group>
        </Table.Td>
        </Table.Tr>
    ));
    const icon = <IconCaretDownFilled style={{ width: rem(16), height: rem(16) }} />;
    return (
        <Container size='lg' mt={40}>
            <Title order={2} className={classes.title} ta="center" mb='sm'>
                Gestionar el Concurso
            </Title>
            <Fieldset mt={20} legend="Administrar Edición">
                <Grid>
                    <Grid.Col span={6}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            component="a"
                            target="_blank"
                            withBorder
                        >
                            <Title order={3}> Edición de BebrasCuba </Title>
                            <Text c={'gray'} mb={10}>Planifique la edición</Text>
                            <Grid>
                                <Grid.Col span={5}>
                                    <NumberInput
                                        label="Marque el nro de la edición"
                                        placeholder="Input placeholder"
                                        value={nroEdicion}
                                        
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Select
                                        data={['Abierta', 'En espera...', 'Cerrada']}
                                        rightSectionPointerEvents="none"
                                        rightSection={icon}
                                        label="Estado de la edicion"
                                        placeholder="seleccione"
                                        clearable
                                    />
                                </Grid.Col>
                                <Grid.Col span={3}>
                                    <YearPickerInput
                                        label="Año de edición"
                                        placeholder="Pick date"
                                        value={a}
                                        onChange={setA}
                                        clearable
                                    />
                                </Grid.Col>
                            </Grid>
                            
                            <Group mt={10}>
                                <Button rightSection={<IconCalendarEvent size={16} />} variant="filled">
                                    Guardar el nro
                                </Button>
                                <Button rightSection={<IconCalendarEvent size={16} />} variant="filled">
                                    Guardar el año 
                                </Button>
                            </Group>
                            <Grid>
                                <Grid.Col span={8}>
                                    <DateInput  
                                        minDate={new Date()}  
                                        maxDate={dayjs(new Date()).add(1, 'month').toDate()}  
                                        label="Fecha de lanzamiento"  
                                        description="Marque la fecha de inscripción del concurso"  
                                        placeholder="Marque la fecha"  
                                        clearable  
                                        withAsterisk  
                                    />  
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Group mt={44}>
                                        <Button rightSection={<IconCalendarEvent size={16} />} variant="filled">
                                            Publicar
                                        </Button>
                                    </Group>
                                </Grid.Col>
                            </Grid>
                            
                            <Grid>
                                <Grid.Col span={12}>
                                    <DatePickerInput
                                        type="range"
                                        minDate={new Date()}  
                                        maxDate={dayjs(new Date()).add(1, 'month').toDate()}  
                                        label="Periodo de Inscripción"
                                        placeholder="Pick dates range"
                                        description="Marque fecha para periodo de inscripción"
                                        value={fecha_i}
                                        onChange={setFechaI}
                                        clearable
                                        mt={5}
                                    />
                                </Grid.Col>
                            </Grid>

                            <Group mt={10}>
                                <Button rightSection={<IconCalendarMonth size={16} />} variant="filled">
                                    Publicar
                                </Button>
                            </Group>
                            
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            component="a"
                            target="_blank"
                            withBorder
                        >
                        
                            <Title order={3}>Convocatoria</Title>
                            <Text fw={500} size="lg" mt="xs">
                                Marque la fecha de las convocatorias
                            </Text>
                            <Text size="xs" c={'gray'}>
                                Fechas importantes
                            </Text>
                            {/* Fecha para realización del concurso */}
                            <Grid>
                                <Grid.Col span={8}>
                                    <DatePickerInput
                                        label="Fecha de resultado"
                                        minDate={new Date()}  
                                        maxDate={dayjs(new Date()).add(1, 'month').toDate()}  
                                        placeholder="Marque la fecha"
                                        description="Marque fecha de publicación de resultado"
                                        value={fecha}
                                        onChange={setFecha}
                                        mt={20}
                                        clearable
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Group mt={64}>
                                        <Button rightSection={<IconCalendarEvent size={16} />} variant="filled">
                                            Publicar
                                        </Button>
                                    </Group>
                                </Grid.Col>
                            </Grid>

                            <DatePickerInput
                                type="range"
                                minDate={new Date()}  
                                maxDate={dayjs(new Date()).add(1, 'month').toDate()}  
                                label="Fecha para realización del concurso"
                                description="Marque fecha de periodo de realizacion del concurso"
                                placeholder="Marque la fecha"
                                value={fecha_r}
                                onChange={setFechaR}
                                mt={10}
                                clearable
                            />
                            <Group mt={10}>
                                <Button rightSection={<IconCalendarMonth size={16} />} variant="filled">
                                    Publicar
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={12}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            component="a"
                            target="_blank"
                            withBorder
                        >
                            <Title order={3}>Recursos</Title>
                            <Text fw={500} size="lg" mt="md">
                                Sube archivos de apoyo al concurso
                            </Text>

                            <Grid mb={10}>
                                <Grid.Col span={6}>
                                    <Input.Wrapper label="Titulo del documento">
                                        <Input 
                                            placeholder="Digite el titulo del documento" 
                                            value={nombre}  
                                            onChange={(e) => setNombre(e.currentTarget.value)}  
                                        />
                                    </Input.Wrapper>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Input.Wrapper label="Descripción">
                                        <Input 
                                            placeholder="Digite el subtitulo del documento" 
                                            value={descripcion}  
                                            onChange={(e) => setDescripcion(e.currentTarget.value)} 
                                        />
                                    </Input.Wrapper>
                                </Grid.Col>
                            </Grid>
                            <Grid mb={20}>
                                <Grid.Col span={7}>
                                    <FileInput
                                        withAsterisk
                                        label="Cargue el fichero"
                                        placeholder="Cargue el fichero aqui"
                                        // multiple
                                        valueComponent={ValueComponent}
                                        onChange={(file) => setArchivo(file)}  
                                        clearable
                                    />
                                </Grid.Col>
                                <Group ml={10} mt={25} mr={10}>
                                    <Button 
                                        variant="light" 
                                        rightSection={<IconUpload size={15} />}
                                        onClick={handleSubmit}
                                    >
                                        Subir archivo
                                    </Button>
                                </Group>
                                <Grid.Col span={3}>
                                    <Group mt={25}>
                                        <Button color='red' variant="light" rightSection={<IconTrash size={15} />}>Eliminar archivos</Button>
                                    </Group>
                                </Grid.Col>
                            </Grid>

                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th style={{ width: rem(40) }}>
                                        </Table.Th>
                                        <Table.Th>Nombre</Table.Th>
                                        <Table.Th>Element name</Table.Th>
                                        <Table.Th>Symbol</Table.Th>
                                        <Table.Th>Atomic mass</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{rows}</Table.Tbody>
                            </Table>
                            
                        </Card>
                    </Grid.Col>
                </Grid>

                {/*  */}
                <Card withBorder mt={'md'}>
                    <Title order={3}>Configurar datos para examen</Title>
                    <Text c="dimmed" >Configure los datos según el orden de la organización internacional</Text>
                
                    <Grid>
                        <Grid.Col span={5}>
                            <MultiSelect
                                label="Seleccione las columnas"
                                placeholder="Seleccione las columnas a generar"
                                data={['Nombre', 'Escuela', 'Grado']}
                                clearable
                            />
                        </Grid.Col>

                        <Grid.Col span={3}>
                            <Text color='dark' fw={500} ml={30} size="sm">Agrupar por ...</Text>
                            <Flex
                            mih={50}

                            gap="md"
                            justify="flex-start"
                            align="flex-start"
                            direction="row"

                            >
                                <Checkbox ml={20} label="Categoria" mt={10} />
                                <Checkbox label="Sexo" mt={10} />
                                <Group mt={5} ml={20}>  
                                    <Button  variant="filled" rightSection={<IconTableFilled size={16} />} >Generar tabla</Button>
                                </Group>
                            </Flex>
                            {/* <Group>
                            <Checkbox
                                    label="Categoria"
                                    mt={33}
                                />
                            </Group>
                            <Group>
                            <Checkbox
                                    label="Sexo"
                                    mt={33}
                                />
                            </Group> */}
                        </Grid.Col>

                        
                    </Grid>

                    
                
                </Card>
            </Fieldset>
        </Container>
    );
}

