
import { Container, Grid, Title, Radio, Group, Button } from '@mantine/core';
import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';
import { IconWashDrycleanOff } from '@tabler/icons-react';

export function AdminConcurso() {
    
    return (
        <Container>
            <Title order={3}>Edición 2024</Title>
            <Radio.Group
                name="favoriteFramework"
                label="Select your favorite framework/library"
                description="This is anonymous"
                withAsterisk
                mb={10}
            >
                <Group mt="xs">
                    <Radio color="green" value="react" label="Abrir edición" />
                    <Radio color="red" value="svelte" label="Cerrar edición" />
                </Group>
            </Radio.Group>
            
            
            

            {/*  */}
            <Group mb={10} mt={20} >
                <Button leftSection={<IconWashDrycleanOff size={15} />} variant="default">
                    Desmarcar
                </Button>  
            </Group>  
            <Grid>
                <Grid.Col span={6}>
                    <DateInput
                        minDate={new Date()}
                        maxDate={dayjs(new Date()).add(1, 'month').toDate()}
                        label="Fecha de Inscripcion"
                        withAsterisk
                        description="Fecha de apertura de inscripcion"
                        placeholder="Marque la fecha de apertura"
                        clearable 
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    
                </Grid.Col>
            </Grid>
                <Grid>
                    <Grid.Col span={6}>
                        
                    </Grid.Col>
                    <Grid.Col span={6}>
                        
                    </Grid.Col>
                </Grid> 
            
        </Container>
    );

}