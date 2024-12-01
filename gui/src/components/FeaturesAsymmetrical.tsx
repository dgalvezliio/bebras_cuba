import { Text, SimpleGrid, Container, rem, Title } from '@mantine/core';
import { IconCertificate, IconMedal2, IconAddressBook } from '@tabler/icons-react';
import classes from '../styles/FeaturesAsymmetrical.module.css';
import classe from '../styles/FeaturesGrid.module.css';

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  return (

    
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />
      
      <div className={classes.content}>
        <Icon style={{ width: rem(45), height: rem(45) }} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="h3" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="lg">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconAddressBook,
    title: 'Inscripción',
    description:
      'La inscripcion es para los profesores o maestros, los cuales pueden registrar sus estudiantes que quieren participar.',
  },
  {
    icon: IconCertificate,
    title: 'Certificado',
    description:
      'Despues de cada edicion se genera un certificado de participacion para todos los participantes, estudiantes y profesores.',
  },
  {
    icon: IconMedal2,
    title: 'Medalla',
    description:
      'Las medallas son reconocimiento que da a los estudiantes con mejores puntaciones en el concurso las categorias son de oro, blata y bronze.',
  },
];

export function FeaturesAsymmetrical() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
        <Title className={classe.title}>Detalles del concurso</Title>

        <Container size={560} p={0}>
            <Text size="sm" className={classe.description} mb={50}>
              En esta parte se comenta detalles sobre la inscripcion, participacion y premiacion.
            </Text>
        </Container>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}