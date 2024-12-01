import '@mantine/core/styles.css';
import { MantineProvider, Container, Card, Table, Title } from '@mantine/core';
import { HeroBullets } from '../components/HeroBullets';
import { FeaturesCards } from '../components/FeaturesCards';
import classe from '../styles/FeaturesGrid.module.css';
import { FeaturesAsymmetrical } from '../components/FeaturesAsymmetrical';
import { HeroImageRight } from '../components/HeroImageRight';
import { HeroContentLeft } from '../components/HeroContentLeft';

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export default function PagInicial() {

    const rows = elements.map((element) => (
        <Table.Tr key={element.position}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.position}</Table.Td>
        </Table.Tr>
    ));

    const ths = (
        <Table.Tr>
        <Table.Th>Provincia</Table.Th>
        <Table.Th>Benjamín</Table.Th>
        <Table.Th>Cadete</Table.Th>
        <Table.Th>Junior</Table.Th>
        <Table.Th>Senior</Table.Th>
        <Table.Th>Total por Provincia</Table.Th>
        </Table.Tr>
    );

    const rst = (
        <Table.Tr>
        <Table.Th>Total</Table.Th>
        <Table.Th>73</Table.Th>
        <Table.Th>33</Table.Th>
        <Table.Th>92</Table.Th>
        <Table.Th>128</Table.Th>
        <Table.Th>326</Table.Th>
        </Table.Tr>
    );

    return (
        
        <MantineProvider>
            {/* <HeroBullets></HeroBullets> */}
            <HeroContentLeft  />
            {/* <HeroImageRight /> */}
            <FeaturesCards />
            <FeaturesAsymmetrical />
            <Container size="lg">
            <Title className={classe.title}>Resultados de la última edición</Title>

                <Card withBorder shadow="sm" radius="md" mb={40}>
                    <Title order={4} mb={5}> Tabla de resultados de las provincias por categoria  </Title>
                    
                    <Table captionSide="bottom">
                        <Table.Caption>Some elements from periodic table</Table.Caption>
                        <Table.Thead>{ths}</Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                        <Table.Tfoot>{rst}</Table.Tfoot>
                    </Table>
                </Card>
            </Container>
            

        </MantineProvider>
    );
}