import { ThemeIcon, Text, Title, Container, SimpleGrid, rem } from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock } from '@tabler/icons-react';
import classes from '../styles/FeaturesGrid.module.css';

export const MOCKDATA = [
    {
        icon: IconGauge,
        title: 'En qué consiste?',
        description:
        'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
    },
    {
        icon: IconUser,
        title: 'Reconocimientos y premios',
        description:
        'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
    },
    
    ];

    interface FeatureProps {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
    }

export function Feature({ icon: Icon, title, description }: FeatureProps) {
    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40}>
                <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ThemeIcon>
            <Text mt="sm" mb={7}>
                {title}
            </Text>
            <Text size="sm" c="dimmed" lh={1.6}>
                {description}
            </Text>
        </div>
    );
    }

    export function FeaturesGrid() {
    const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

    return (
        <Container className={classes.wrapper}>
        <Title className={classes.title}>Integrate effortlessly with any technology stack</Title>

        <Container size={560} p={0}>
            <Text size="sm" className={classes.description}>
            Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
            hunger drives it to try biting a Steel-type Pokémon.
            </Text>
        </Container>

        <SimpleGrid
            mt={60}
            cols={{ base: 1, sm: 2 }}
            spacing={{ base: 'xl', md: 50 }}
            verticalSpacing={{ base: 'xl', md: 50 }}
        >
            {features}
        </SimpleGrid>
        </Container>
    );
}