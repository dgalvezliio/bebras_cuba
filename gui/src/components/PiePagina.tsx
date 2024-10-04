import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandFacebook, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../styles/PiePagina.module.css';

const data = [
    {
        title: 'Project',
        links: [
        { label: 'Contribute', link: '#' },
        { label: 'Media assets', link: '#' },
        { label: 'Changelog', link: '#' },
        { label: 'Releases', link: '#' },
        ],
    },
    {
        title: 'Contacto',
        links: [
        { label: 'Join Discord', link: '#' },
        { label: 'Follow on Twitter', link: '#' },
        { label: 'Email newsletter', link: '#' },
        { label: 'GitHub discussions', link: '#' },
        ],
    },
    ];
    
    export function PiePagina() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
        <Text<'a'>
            key={index}
            className={classes.link}
            component="a"
            href={link.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
        ));

        return (
        <div className={classes.wrapper} key={group.title}>
            <Text className={classes.title}>{group.title}</Text>
            {links}
        </div>
        );
    });

    return (
        <footer className={classes.footer}>
        <Container className={classes.inner}>
            <div className={classes.logo}>
            {/* <MantineLogo size={30} /> */}
            <Text size="xs" c="dimmed" className={classes.description}>
                Build fully functional accessible web applications faster than ever
            </Text>
            </div>
            <div className={classes.groups}>{groups}</div>
        </Container>
        <Container className={classes.afterFooter}>
            <Text c="dimmed" size="sm">
            © 2024 bebrascuba.uclv.cu. Todos los derechos reservados.
            </Text>

            <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandWhatsapp style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandFacebook style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandTelegram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            </Group>
        </Container>
        </footer>
    );
}