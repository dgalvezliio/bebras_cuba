import { Avatar, Container, Grid, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { Card, Text, Button } from '@mantine/core';
import { IconAt, IconLock, IconLockCheck } from '@tabler/icons-react';
// import { useState } from 'react';


export function MiPerfil() {
    // const [value, setValue] = useState('Clear me');
    return (
        <Container size={'lg'}>
            <Card >
                <Grid>
                    <Grid.Col span={5}>
                        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                size={120}
                                radius={120}
                                mx="auto"
                            />
                            <Text ta="center" fz="h4" fw={500} mt="md">
                                Daniel Galvez Lio
                            </Text>
                            <Text size='sm' ta="center" c="dimmed">galvezlio@uclv.edu.cu</Text>
                            <Text ta="center" size="md">Coordinador Nacional</Text>
                            
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Paper radius="sm" withBorder p="lg" bg="var(--mantine-color-body)">
                            <Title ta="center" order={3} mb={10}>Editar Cuenta</Title>
                            <Grid>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Nombre"
                                        withAsterisk
                                        // description="Input description"
                                        placeholder="Input placeholder"
                                        value={'Daniel'}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Apellidos"
                                        withAsterisk
                                        // description="Input description"
                                        placeholder="Input placeholder"
                                        value={'Galvez Lio'}
                                    />
                                </Grid.Col>
                            </Grid>
                            <TextInput 
                                withAsterisk 
                                label='Correo electronico'
                                mb={10} 
                                value={'galvezlio@uclv.edu.cu'}
                                placeholder="Correo electronico"
                                leftSection={<IconAt size={16} />} 
                            />
                            <Button fullWidth>Cambiar datos</Button>
                            {/* Nueva Contraseña */}
                            <Grid mt={10} mb={10}>
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
                            <Button fullWidth>Cambiar contraseña</Button>
                        </Paper>
                    </Grid.Col>
                    
                </Grid>
            </Card>

            
            
        </Container>
    );
}