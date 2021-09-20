import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import requireServerAuth from 'middleware/requireServerAuth'
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import MainLayout from 'components/layouts/mainLayout'
import DocStyleLayout from 'components/layouts/docStyleLayout'

export default function Dashboard() {
  return (
    <MainLayout
      title="Dashboard"
      breadcrumbs={[{ name: 'dashboard', url: '/admin/dashboard' }]}
    >
      <DocStyleLayout menus={[{ name: 'test', url: '/test' }]}>
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
      </DocStyleLayout>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const user = await requireServerAuth(context.req)

  if (!user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user: user || null },
  }
}
