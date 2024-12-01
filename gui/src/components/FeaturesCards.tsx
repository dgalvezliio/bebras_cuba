import {
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { IconHelpOctagon, IconCalendarMonth, IconClipboardList } from '@tabler/icons-react';
import classes from '../styles/FeaturesCards.module.css';

const mockdata = [
    {
    title: '¿Que es Bebras?',
    description:
        'Es un concurso internacional que tiene como objetivo promover el pensamiento computacional. ',
    icon: IconHelpOctagon,
    },
    {
    title: 'Eventos',
    description:
        'Los eventos se realizan en los meses de noviembre y diciembre, incluyendo las incripciones y convocatorias.',
    icon: IconClipboardList,
    },
    {
    title: 'Fecha',
    description:
        'La fecha de inicio para esta edicion va ser el dia 4 de diciembre de 2024',
    icon: IconCalendarMonth,
    },
];

export function FeaturesCards() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
        />
        <Text fz="h3" fw={700} className={classes.cardTitle} mt="md">
        {feature.title}
        </Text>
        <Text fz="lg" c="dimmed" mt="sm">
        {feature.description}
        </Text>
    </Card>
    ));

    return (
    <Container size="lg" py="xl">
        
        <Title order={2} className={classes.title} ta="center" mt="sm">
            Sobre Bebras
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
            En esta parte se comenta de manera resumida que es Bebras, como funciona, los eventos y fecha del concurso.
        </Text>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
        </SimpleGrid>
    </Container>
    );
}