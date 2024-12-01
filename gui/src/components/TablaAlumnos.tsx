import cx from 'clsx';
import { useState } from 'react';
import { Table, Checkbox, ScrollArea, Group, Avatar, Text, rem, ActionIcon, Grid, Select } from '@mantine/core';
import classes from '../styles/TablaAlumnos.module.css';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
const data = [
  {
    id: '1',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Robert Wolfkisser',
    job: 'Masculino',
    email: 'Chiqui Gómez Lubián Urioste',
    grade: '6to',
    categoria: 'Junior',
  },
  {
    id: '2',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Jill Jailbreaker',
    job: 'Femenino',
    email: 'José Antonio Echeverría',
    grade: '6to',
    categoria: 'Junior',
  },
  {
    id: '3',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Henry Silkeater',
    job: 'Masculino',
    email: 'José Antonio Echeverría',
    grade: '5to',
    categoria: 'Junior',
  },
  {
    id: '4',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bill Horsefighter',
    job: 'Masculino',
    email: 'Chiqui Gómez Lubián Urioste',
    grade: '5to',
    categoria: 'Junior',
  },
  {
    id: '5',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Jeremy Footviewer',
    job: 'Feminino',
    email: 'Chiqui Gómez Lubián Urioste',
    grade: '5to',
    categoria: 'Junior',
  }
  
];

export function TablaAlumnos() {
  const [selection, setSelection] = useState<string[]>([]); 
  const [opened, { open, close }] = useDisclosure(false);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
        <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} /> 
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.job}</Table.Td>
        <Table.Td>{item.grade}</Table.Td>
        <Table.Td>{item.categoria}</Table.Td>
        <Table.Td>
          <Group gap={0} justify="flex-end">
            <ActionIcon  onClick={open} variant="subtle" color="gray">
              <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon  variant="subtle" color="red">
              <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    
    <ScrollArea >

      <Modal opened={opened} onClose={close} title="Editar datos">
        {/* G */}
        <Select
          mt={5}
          mb={10}
          withAsterisk
          label="Escuela"
          clearable
          placeholder="Seleccione la escuela"
          data={['React', 'Angular', 'Vue', 'Svelte']}
        />
        <Grid mt={10}>
          
          <Grid.Col span={6}>
              <Select
                  label="Grado"
                  withAsterisk
                  placeholder="Seleccione el grado"
                  clearable
                  data={['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo', '11ro', '12do']}
              />
          </Grid.Col>
          <Grid.Col span={6}>
              <Select
                  label="Categoria"
                  withAsterisk
                  placeholder="Seleccione el grado"
                  clearable
                  data={['Peques','Benjamin','Junior','Senior']}
              />
          </Grid.Col>
      </Grid>
        
        <Group mt={10}>
          <Button variant="filled">Guardar cambio</Button>
        </Group>

      </Modal>
      {/* Tabla de alumnos */}
      <Table highlightOnHover miw={800} verticalSpacing="sm">
        <Table.Thead >
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
              />
            </Table.Th>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Escuela</Table.Th>
            <Table.Th>Sexo</Table.Th>
            <Table.Th>Grado</Table.Th>
            <Table.Th>Categoria</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}