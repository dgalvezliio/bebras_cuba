import { Table, Container, Title, Checkbox, Fieldset, Group, rem, Badge, Avatar, Text, Anchor, Button, ButtonProps } from '@mantine/core';
import { useState } from 'react';
import classes from '../styles/FeaturesCards.module.css';
import { IconCheck, IconX } from '@tabler/icons-react';

    const data = [
        {
            id: '1',
            avatar:
                'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
            name: 'Robert Wolfkisser',
            job: 'Engineer',
            email: 'rob_wolf@gmail.com',
            role: 'Collaborator',
            phone: '+44 (452) 886 09 12',
            lastActive: 'Cienfuegos',
            active: false,
        },
        {
            id: '2',
            avatar:
                'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
            name: 'Jill Jailbreaker',
            job: 'Engineer',
            email: 'jj@breaker.com',
            role: 'Collaborator',
            phone: '+44 (934) 777 12 76',
            lastActive: 'Habana',
            active: false,
        },
        {
            id: '3',
            avatar:
                'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
            name: 'Henry Silkeater',
            job: 'Designer',
            email: 'henry@silkeater.io',
            role: 'Contractor',
            phone: '+44 (901) 384 88 34',
            lastActive: 'Villa Clara',
            active: false,
        },
        {
            id: '4',
            avatar:
                'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
            name: 'Bill Horsefighter',
            job: 'Designer',
            email: 'bhorsefighter@gmail.com',
            role: 'Contractor',
            phone: '+44 (667) 341 45 22',
            lastActive: 'Santiago de Cuba',
            active: false,
        },
        {
            id: '5',
            avatar:
                'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
            name: 'Jeremy Footviewer',
            job: 'Manager',
            email: 'jeremy@foot.dev',
            role: 'Manager',
            phone: '+44 (881) 245 65 65',
            lastActive: 'Guantanamo',
            active: false,
        },
    ];

export function SolicParaCoordMunic() {
    // const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selection, setSelection] = useState<string[]>([]); 
    const [selectedCount, setSelectedCount] = useState(0);  

    function SendFilesButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
        return <Button {...props} radius="md" classNames={classes} />;
    }
    // const rows = data.map((item) => (
    //     <Table.Tr key={item.name}>
    //     <Table.Td>
    //         <Group gap="sm">
    //         <Avatar size={30} src={item.avatar} radius={30} />
    //         <Text fz="sm" fw={500}>
    //             {item.name}
    //         </Text>
    //         </Group>
    //     </Table.Td>

    //     <Table.Td>
    //         <Badge color={jobColors[item.job.toLowerCase()]} variant="light">
    //             {item.job}
    //         </Badge>
    //     </Table.Td>
    //     <Table.Td>
    //         <Anchor component="button" size="sm">
    //             {item.email}
    //         </Anchor>
    //     </Table.Td>
    //     <Table.Td>
    //         <Text fz="sm">{item.phone}</Text>
    //     </Table.Td>
    //     <Table.Td>
    //     {item.active ? (
    //             <Badge color="teal" fullWidth variant="light">
    //             Active
    //             </Badge>
    //         ) : (
    //             <Badge color="gray" fullWidth variant="light">
    //             Disabled
    //             </Badge>
    //         )}
    //     </Table.Td>
    //     </Table.Tr>
    // ));
        const toggleRow = (id: string) => {  
        setSelection((current) => {  
            if (current.includes(id)) {  
                setSelectedCount(selectedCount - 1);  
                return current.filter((item) => item !== id);  
            } else {  
                setSelectedCount(selectedCount + 1);  
                return [...current, id];  
            }  
        });  
    };   
        
    const toggleAll = () => {  
        if (selection.length === data.length) {  
            setSelectedCount(0);  
            setSelection([]);  
        } else {  
            setSelectedCount(data.length);  
            setSelection(data.map((item) => item.id));  
        }  
    };  
    
    const row = data.map((item) => (
        <Table.Tr key={item.name}>
            <Table.Td>
            <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />  
            </Table.Td>
            <Table.Td>
            <Group gap="sm">
                <Avatar size={40} src={item.avatar} radius={40} />
                <div>
                <Text fz="sm" fw={500}>
                    {item.name}
                </Text>
                <Text fz="xs" c="dimmed">
                    {item.email}
                </Text>
                </div>
            </Group>
        </Table.Td>
        <Table.Td>{item.phone}</Table.Td>
        <Table.Td>{item.lastActive}</Table.Td>
        <Table.Td>{item.job}</Table.Td>
        <Table.Td>
        <Anchor component="button" size="sm">
            {item.email}
        </Anchor></Table.Td>
        <Table.Td>
        {item.active ? (
            <Badge color="teal" fullWidth variant="light">
            Active
            </Badge>
        ) : (
            <Badge color="gray" fullWidth variant="light">
            Disabled
            </Badge>
        )}
        </Table.Td>
        </Table.Tr>
    ));
    
    return (
        <Container size='lg'>
            <Title ta="center" order={1}>Solicitudes para <Text span c="violet" inherit>Coordinador Municipal </Text></Title>
            {/* TABLA DE SOLICITUDES ↓ */}
            <Fieldset mt={10} legend="Solicitudes de Registro de escuela">
                <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
            <Table.Thead>
            <Table.Tr>
                <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={selection.length > 0 && selection.length !== data.length}
                />
                </Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Telefono</Table.Th>
                <Table.Th>Provincia</Table.Th>
                <Table.Th>Municipio</Table.Th>
                <Table.Th>Solicitud</Table.Th>
                <Table.Th>Estado</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{row}</Table.Tbody>
        </Table>
                </Table.ScrollContainer>
                <Group>  
                    <SendFilesButton  
                        leftSection={selectedCount.toString()}  
                        rightSection={<IconCheck style={{ width: rem(18) }} />}  
                        variant='light'  
                    >  
                        Aceptar  
                    </SendFilesButton>  
                    <SendFilesButton  
                        leftSection={selectedCount.toString()}  
                        rightSection={<IconX style={{ width: rem(18) }} />}  
                        variant='light'  
                    >  
                        Denegar  
                    </SendFilesButton>  
                </Group>  
            </Fieldset>
        </Container>
    );
}