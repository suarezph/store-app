import type { ReactElement } from 'react'
import {
  Flex,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

export type DocStyleLayoutType = {
  children: ReactElement
}

export default function DocStyleLayout({ children }: DocStyleLayoutType) {
  return (
    <Flex>
      <Flex
        display={{ md: 'flex' }}
        width={{
          base: '50px', // 0-48em
          md: '200px',
          lg: '270px',
        }}
        py="5"
      >
        <Text>Box 1</Text>
      </Flex>
      <Flex flex="1">
        <Box padding="5">
          <Box w="100%">
            <Table variant="striped" colorScheme="teal" size="sm">
              <Thead>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}
