import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import requireServerAuth from 'middleware/requireServerAuth'
import MainLayout from 'components/layouts/mainLayout'
import DocStyleLayout from 'components/layouts/docStyleLayout'
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { usersMenu } from './data/menu'
import { useRouter } from 'next/router'
import RouteNames from 'constants/routeNames'
import Pagination from 'components/pagination'
import { useEffect, useState } from 'react'
import { fetchRequest } from 'utils/fetch.util'
import useSWR from 'swr'
import { data } from 'cypress/types/jquery'

export default function Users() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

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
        <Box w="100%">
          {/* {error && <h1>Something went wrong!</h1>}
          

          <button onClick={() => setPageIndex(pageIndex + 1)}>+1</button> */}
          {result?.data && (
            <Table variant="striped" colorScheme="teal" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!result && (
                  <Tr>
                    <Td colspan="2">Loading</Td>
                  </Tr>
                )}
                {result?.data?.map((item: any) => {
                  return (
                    <Tr key={item.fullname}>
                      <Td>{item._id}</Td>
                      <Td>{item.fullname}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          )}

          {result && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={parseInt(result.meta.totalCount)}
              pageSize={result.meta.size}
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

  return {
    props: { user: user || null },
  }
}
