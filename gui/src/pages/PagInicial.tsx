import '@mantine/core/styles.css';
import { MantineProvider, Container, Card } from '@mantine/core';
import { HeroBullets } from '../components/HeroBullets';
import { TableReviews } from '../components/TableReviews';
import { FeaturesCards } from '../components/FeaturesCards';
import { FeaturesGrid } from '../components/FeaturesGrid';
export default function PagInicial() {
    return (
        
        <MantineProvider>
        
            <HeroBullets></HeroBullets>
            
            <FeaturesCards></FeaturesCards>
            <FeaturesGrid></FeaturesGrid>
            
            <Container size="lg">
                <Card withBorder shadow="sm" radius="md">
                <TableReviews></TableReviews>        
                </Card>
            </Container>

            
            
        </MantineProvider>
    );
}