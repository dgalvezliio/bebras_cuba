import { Paper, Text, Title, Button, Container, Grid, Tooltip } from '@mantine/core';
import classes from '../styles/Recurso.module.css';
import { IconDownload, IconUpload  } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

export function Recurso() {
    return (

        <Container>

            <Title order={2} size={40} ta="center">Recursos de apoyo al concurso BebrasCuba</Title>
            <Text c="dimmed" ta="center" mb={30}>Documentos de apoyo y guia de cada convocatoria eso incluye los llamados</Text>

            <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                <Grid.Col span={4}>
                    <Paper shadow="md" p="xl" radius="md" className={classes.card}>
                        <div>
                            <Text className={classes.category} size="xs">
                                concurso bebrascuba
                            </Text>
                            
                            <Title order={3} className={classes.title}>
                                Best forests to visit in North America
                            </Title>
                        </div>
                        <Grid>
                            <Grid.Col span={4}>
                                <Button variant="white" color="dark">
                                    Leer archivo
                                </Button>
                            </Grid.Col>
                            <Grid.Col ml={50} span={4}>
                                <ActionIcon size={35} variant="white" color="dark" >
                                    <IconUpload  style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Grid.Col>
                
                <Grid.Col span={4}>
                    <Paper shadow="md" p="xl" radius="md" className={classes.card}>
                        <div>
                            <Text className={classes.category} size="xs">
                                concurso bebrascuba
                            </Text>
                            <Title order={3} className={classes.title}>
                                Best forests to visit in North America
                            </Title>
                        </div>
                        <Grid>
                            <Grid.Col span={4}>
                                <Button variant="white" color="dark">
                                    Leer archivo
                                </Button>
                            </Grid.Col>
                            <Grid.Col ml={50} span={4}>
                                <ActionIcon size={35} variant="white" color="dark" >
                                    <IconUpload  style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                            </Grid.Col>
                        </Grid>
                        
                    </Paper>
                </Grid.Col>

                <Grid.Col span={4}>
                    <Paper shadow="md" p="xl" radius="md" className={classes.card}>
                        <div>
                            <Text className={classes.category} size="xs">
                                concurso bebrascuba
                            </Text>
                            <Title order={3} className={classes.title}>
                                Best forests to visit in North America
                            </Title>
                        </div>
                        <Grid>
                            <Grid.Col span={4}>
                                <Button variant="white" color="dark">
                                    Leer archivo
                                </Button>
                            </Grid.Col>
                            <Grid.Col ml={50} span={4}>
                                <Tooltip arrowOffset={34} arrowSize={5} label="Descargar" withArrow  >
                                    <ActionIcon size={35} variant="white" color="dark" >
                                        <IconUpload  style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                    </ActionIcon>
                                </Tooltip>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Grid.Col>
            </Grid>
            
        </Container>
    );
}