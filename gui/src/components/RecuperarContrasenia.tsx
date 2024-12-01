import { Button, Card, Checkbox, Container, Group, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

export function RecuperarContrasenia() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
        email: '',
        termsOfService: false,
        },

        validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <Container size="xs" >
            <Card padding="md" withBorder shadow="md" p={30} mt={30} radius="md">

                <Title order={3} ta="center" mb={5}>Recuperar la Contraseña</Title>
                
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        withAsterisk
                        label="Correo electronico"
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <Checkbox
                        mt="md"
                        label="Aceptar la política de privacidad "
                        key={form.key('termsOfService')}
                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Enviar </Button>
                    </Group>
                </form>
            </Card>
        </Container>
    );
}