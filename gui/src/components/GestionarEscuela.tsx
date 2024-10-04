import { Card, Container, Title, Grid, Select, Input, Button, Text, rem } from '@mantine/core';
import { IconBuildingSkyscraper, IconPhone, IconSchool } from '@tabler/icons-react';
import { IMaskInput } from 'react-imask';
import { TableSort } from './TableSort';

export function GestionarEscuela() {
    
    return (
        // Contenedor principal 
        <Container size='lg' >
            <Title order={1}  ta="center" mb='sm'>
                Gestionar escuela a nivel municipal
            </Title>
            {/* Contenedor de registrar escuela */}
            <Container size={'md'} mb={20}>
                <Card withBorder>
                    <Text fw={700} size="xl">Registrar escuela</Text>
                    <Text c="dimmed">Registre la escuela de su municipio</Text>
                    <Grid mt={10}>
                        <Grid.Col span={6}>
                            <Select
                                withAsterisk
                                label="Provincia"
                                clearable
                                placeholder="Seleccione la provincia"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                                
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                withAsterisk
                                label="Municipio"
                                clearable
                                placeholder="Seleccione el municipio"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid mt={10}>
                        <Grid.Col span={8}>
                            <Input.Wrapper withAsterisk label="Nombre de la escuela">
                                <Input placeholder="Digite aqui el nombre de la escuela" leftSection={<IconSchool size={16} />} />
                            </Input.Wrapper> 
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Input.Wrapper withAsterisk label="Telefono">
                                <Input 
                                component={IMaskInput}
                                leftSection={<IconPhone size={16} />} 
                                mask="+53 00000000"
                                placeholder="Numero telefone" 
                                />
                            </Input.Wrapper>    
                        </Grid.Col>
                        {/* Boton registrar escuela */}
                    </Grid>
                    <Button mt={10} fullWidth variant="filled" rightSection={<IconBuildingSkyscraper size={16} />}>Registrar escuela</Button>
                </Card>
            </Container>

            {/* Contenedor de tabla de escuelas */}
            <Container size={'md'} mb={30} >
                <Card withBorder>
                    <Title order={3}>Tabla de escuelas</Title>
                    <Text mb={10} c="dimmed">Municipio</Text>
                    <TableSort /> 
                </Card>
            </Container>
        </Container>

    );
}

