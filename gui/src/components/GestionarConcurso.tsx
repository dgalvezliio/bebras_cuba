import { Container, Title, Button, Group, ButtonProps, rem, Grid, Text, Radio, Card, FileInputProps, Pill, FileInput, Table, Checkbox, ActionIcon } from '@mantine/core';
import { Fieldset } from '@mantine/core';
import { IconWashDrycleanOff, IconUpload, IconPencil, IconTrash } from '@tabler/icons-react';
import classes from '../styles/FeaturesCards.module.css';

import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useState } from 'react';

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export function GestionarConcurso() {

    function SendFilesButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
        return <Button {...props} radius="md" classNames={classes} />;
    }
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

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

    return (
        <Container size='lg'>
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
                        >
                            <Title order={3}>Edición</Title>
                            <Text fw={500} size="lg" mt="md">
                                You&apos;ve won a million dollars in cash!
                            </Text>
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
                            <Group mb={8} mt={8} >
                                <Button leftSection={<IconWashDrycleanOff size={15} />} variant="default">
                                    Desmarcar
                                </Button>  
                            </Group> 
                            <DateInput
                                minDate={new Date()}
                                maxDate={dayjs(new Date()).add(1, 'month').toDate()}
                                label="Fecha de inscripcion"
                                description="Marque la fecha de inscripcion del concurso"
                                placeholder="Marque la fecha"
                                clearable
                                withAsterisk
                                disabled
                            />
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            component="a"
                            target="_blank"
                        >
                        
                            <Title order={3}>Convocatoria</Title>
                            <Text fw={500} size="lg" mt="md">
                                You&apos;ve won a million dollars in cash!
                            </Text>

                            <Grid>
                                <Grid.Col span={6}>
                                    <DateInput withAsterisk clearable defaultValue={new Date()} label="Date input" placeholder="Date input" />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <DateInput withAsterisk clearable defaultValue={new Date()} label="Date input" placeholder="Date input" />
                                </Grid.Col>
                            </Grid>
                            
                            
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
                        >
                            <Title order={3}>Recurso</Title>
                            <Text fw={500} size="lg" mt="md">
                                You&apos;ve won a million dollars in cash!
                            </Text>
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

                            <Grid>
                                <Grid.Col span={7}>
                                    <FileInput
                                        withAsterisk
                                        label="Upload files"
                                        placeholder="Upload files"
                                        multiple
                                        valueComponent={ValueComponent}
                                        clearable
                                    />
                                </Grid.Col>
                                <Group ml={10} mt={25} mr={10}>
                                    <Button variant="light" rightSection={<IconUpload size={15} />}>Subir archivo</Button>
                                </Group>
                                <Grid.Col span={3}>
                                    <Group mt={25}>
                                        <Button color='red' variant="light" rightSection={<IconTrash size={15} />}>Eliminar archivos</Button>
                                    </Group>
                                </Grid.Col>
                                
                            </Grid>
                            
                        </Card>
                    </Grid.Col>
                </Grid>
            </Fieldset>

        </Container>
    );
}

