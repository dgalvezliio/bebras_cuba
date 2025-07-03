import { Container, Title, Button, Group, rem, Grid, Text, Card, FileInputProps, Pill, FileInput, Table, Checkbox, ActionIcon, TextInput, Anchor} from '@mantine/core';
import { Fieldset } from '@mantine/core';
import { IconUpload, IconPencil, IconTrash, IconCheck, IconX, IconAlertCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000'; // <--- Ajusta según tu configuración
import { useForm } from '@mantine/form';
import { DeleteAccountButton } from './DeleteAccountButton';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

interface RecursoData {  
    id: number;
    nombre: string;  
    descripcion: string;  
    archivo: File | null;  
}
export function GestionarRecurso() {
    // const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [recursos, setRecursos] = useState<RecursoData[]>([]);  
    const [selection, setSelection] = useState<number[]>([]); 
    const [selectedCount, setSelectedCount] = useState(0);
    const [message, setMessage] = useState<string[]>([]);
    const [cargar, setCargar] = useState(false);
    const [loading, setLoading] = useState(false);
    // 
    const form = useForm<RecursoData>({  
        initialValues: {  
            id: 0,
            nombre: '',  
            descripcion: '',  
            archivo: null,  
        },  
        validate: {  
            nombre: (value) => (value.length < 2 ? 'El nombre debe tener al menos 2 letras' : null),  
            descripcion: (value) => (value.length < 10 ? 'La descripción debe tener al menos 10 caracteres' : null),  
            archivo: (value) => (value === null ? 'Debes seleccionar un archivo' : null),  
        },  
    });   
    // 
    const fetchRecursos = async () => {  
        try {  
            const response = await axios.get('api/listar-recursos');  
            setRecursos(response.data);  
            console.log('Recurso', response.data);
        } catch (error) {  
            console.error('Error al obtener los recursos:', error);  
        }  
    };  

    useEffect(() => {  
        fetchRecursos();  
    }, []);  

    // 
    const handleSubmit = async (values: RecursoData) => { 
        setCargar(true);
        // Validación del archivo PDF
        if (!values.archivo || !values.archivo.type.endsWith('pdf')) {
          notifications.show({
            title: 'Formato incorrecto',
            message: 'Debes seleccionar un archivo PDF',
            color: 'red',
            icon: <IconX size={18} />,
          });
          setCargar(false);
          return;
        }
        try {  
            const formData = new FormData();
            formData.append('nombre', values.nombre);
            formData.append('descripcion', values.descripcion);
            formData.append('archivo', values.archivo);
        
            const response = await axios.post('api/recursos', formData, {
                headers: {
                'Content-Type': 'multipart/form-data', 
                },
            });
            
            // Notificación de éxito
            notifications.show({
                title: '¡Éxito!',
                message: 'Archivo subido correctamente',
                color: 'teal',
                icon: <IconCheck size={18} />,
            });
            
            console.log('Recurso creado:', response.data);
            fetchRecursos();
            form.reset();
        
        } catch (error) {  
            let errorMessage = 'Error al subir el archivo';
            
            if (axios.isAxiosError(error)) {
                console.error('Error del servidor:', error.response?.data);
                errorMessage = error.response?.data?.message || errorMessage;
            } else {
                console.error('Error inesperado:', error);
            }
        
            // Notificación de error
            notifications.show({
                title: 'Error',
                message: errorMessage,
                color: 'red',
                icon: <IconAlertCircle size={18} />,
            });
        
        } finally {
            setCargar(false);
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

    const toggleRow = (id: number) => {  
        setSelection((current) => {  
            if (current.includes(id)) {  
                setSelectedCount(selectedCount - 1);  
                return current.filter((recurso) => recurso !== id);  
            } else {  
                setSelectedCount(selectedCount + 1);  
                return [...current, id];  
            }  
        });  
    };  

    const toggleAll = () => {  
        if (selection.length === recursos.length) {  
            setSelectedCount(0);  
            setSelection([]);  
        } else {  
            setSelectedCount(recursos.length);  
            setSelection(recursos.map((recurso) => recurso.id));  
        }  
    };

    const rows = recursos.map((recurso) => (
        <Table.Tr
            key={recurso.id}
            bg={selection.includes(recurso.id) ? 'var(--mantine-color-blue-light)' : undefined}
        >
            <Table.Td>
                <Checkbox checked={selection.includes(recurso.id)} onChange={() => toggleRow(recurso.id)} />  
            </Table.Td>
            <Table.Td>{recurso.nombre}</Table.Td>
            <Table.Td>{recurso.descripcion}</Table.Td>
            <Table.Td>
                <Anchor href={'recurso.archivo'}  size="sm">
                    Ver archivo
                </Anchor> 
            </Table.Td>
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

    // 
    const eliminarRecursos = async () => {
        setLoading(true);
        try {
          // Iterar sobre cada id del recurso seleccionado
          for (const recursoId of selection) {
            await axios.delete(`/api/eliminar-recurso/${recursoId}`);
          }
          
          // Mostrar notificación de éxito
          notifications.show({
            title: 'Éxito',
            message: selection.length > 1 
              ? `${selection.length} archivos eliminados con éxito` 
              : 'Archivo eliminado con éxito',
            color: 'green',
            icon: <IconCheck size={18} />,
          });
      
          // Limpiar selección y contador
          setSelectedCount(0);
          setSelection([]);
          // Volver a cargar los recursos
          fetchRecursos();
      
        } catch (error) {
          // Notificación de error
          notifications.show({
            title: 'Error',
            message: 'No se pudieron eliminar los archivos',
            color: 'red',
            icon: <IconX size={18} />,
          });
      
          console.error('Error al eliminar:', error);
          if (axios.isAxiosError(error)) {
            console.error('Detalles:', error.response?.data);
          }
        } finally {
          setLoading(false);
        }
    };
    // Función para eliminar los recursos seleccionados
    

    return (
        <Container size='lg' mt={40}>
            <Title order={1} ta="center" mb='sm'>
                Gestionar Recurso
            </Title>
            <Fieldset mt={20} legend="Administrar Recurso">
                <form onSubmit={form.onSubmit(handleSubmit)}>
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
                                <Text fw={500} size="lg" mt="sm" mb={10}>
                                    Sube archivo de apoyo al concurso
                                </Text>
                                <Grid mb={10}>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            {...form.getInputProps('nombre')}  
                                            withAsterisk  
                                            label="Titulo del documento"  
                                            placeholder="Digite el titulo del documento"
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            {...form.getInputProps('descripcion')}  
                                            withAsterisk  
                                            label="Descripción"  
                                            placeholder="Digite el subtitulo del documento" 
                                        />
                                    </Grid.Col>
                                </Grid>
                                <Grid mb={20}>
                                    <Grid.Col span={7}>
                                        <FileInput
                                            {...form.getInputProps('archivo')}  
                                            withAsterisk  
                                            label="Cargue el fichero"  
                                            placeholder="Cargue el fichero aqui"  
                                            valueComponent={ValueComponent}  
                                            clearable  
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={2}>
                                        <Group ml={10} mt={25}>
                                            <Button 
                                                variant="light"  
                                                rightSection={<IconUpload size={15} />}  
                                                type="submit" 
                                                loading={cargar}
                                            >
                                                Subir archivo
                                            </Button>
                                        </Group>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Group mt={25}>
                                        <Button 
                                            onClick={eliminarRecursos}
                                            color="red"
                                            loading={loading}
                                            disabled={selection.length === 0}
                                            >
                                            {selection.length > 1 ? `Eliminar ${selection.length} archivos` : 'Eliminar archivo'}
                                        </Button>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                                {/* Tabla de archivos */}
                                <Table.ScrollContainer minWidth={500} >
                                    <Table mt={20} highlightOnHover >
                                        <Table.Thead>
                                            <Table.Tr>
                                                <Table.Th style={{ width: rem(40) }}>
                                                    <Checkbox
                                                        onChange={toggleAll}
                                                        checked={selection.length === recursos.length}
                                                        indeterminate={selection.length > 0 && selection.length !== recursos.length}
                                                    />
                                                </Table.Th>
                                                <Table.Th>Titulo</Table.Th>
                                                <Table.Th>Descripción</Table.Th>
                                                <Table.Th>Archivo</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>{rows}</Table.Tbody>
                                    </Table>
                                </Table.ScrollContainer>
                                
                            </Card>
                        </Grid.Col>
                    </Grid>
                </form>
            </Fieldset>
        </Container>
    );
}
