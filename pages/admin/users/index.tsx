import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import requireServerAuth from 'middleware/requireServerAuth'
import MainLayout from 'components/layouts/mainLayout'
import DocStyleLayout from 'components/layouts/docStyleLayout'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react'
import { usersMenu } from './data/menu'
import { useRouter } from 'next/router'
import RouteNames from 'constants/routeNames'
import Pagination from 'components/pagination'
import { useState } from 'react'
import { fetchRequest } from 'utils/fetch.util'
import useSWR from 'swr'
import moment from 'moment'

export type usersProps = {
  filters: {
    page: number
    fullname: string
  }
}

export default function Users({ filters }: usersProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(
    filters.page ? Number(filters.page) : 1,
  )

  const { data: result, error } = useSWR(
    `/users?page=${currentPage}`,
    fetchRequest.fetcherSWR,
  )

  const onPageChange = (page: number) => {
    router.push(`${router.route}?page=${page}`, undefined, {
      shallow: true,
    })
    setCurrentPage(page)
  }

  return (
    <MainLayout
      title="User Management"
      breadcrumbs={[
        { name: 'management', url: '#' },
        { name: 'users', url: '/admin/users' },
      ]}
    >
      <DocStyleLayout menus={usersMenu}>
        <Box w="100%" borderWidth="1px" borderRadius="lg">
          <Table variant="striped" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>
                  <Text py={2} fontSize={12}>
                    Email Address
                  </Text>
                </Th>
                <Th>
                  <Text py={2} fontSize={14}>
                    Full Name
                  </Text>
                </Th>
                <Th>
                  <Text py={2} fontSize={14}>
                    Verefied Email?
                  </Text>
                </Th>
                <Th>
                  <Text py={2} fontSize={14}>
                    Updated
                  </Text>
                </Th>
                <Th>
                  <Text py={2} fontSize={14}>
                    Created
                  </Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {result?.data?.map((item: any) => {
                return (
                  <Tr key={item._id}>
                    <Td>{item.email}</Td>
                    <Td>{item.fullname}</Td>
                    <Td>{item.email_verification ? `Yes` : `No`}</Td>
                    <Td>
                      {' '}
                      {moment(item.updated).format('YYYY-MM-DD HH:mm:ss')}
                    </Td>
                    <Td>
                      {moment(item.created).format('YYYY-MM-DD HH:mm:ss')}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>

          {result && result.meta && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={parseInt(result?.meta.totalCount)}
              pageSize={result?.meta.size}
              onPageChange={onPageChange}
            />
          )}
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
        destination: RouteNames.LOGIN,
        permanent: false,
      },
    }
  }

  // get page and filter query

  return {
    props: { user: user || null, filters: context.query },
  }
}
