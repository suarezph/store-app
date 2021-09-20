import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import requireServerAuth from 'middleware/requireServerAuth'
import MainLayout from 'components/layouts/mainLayout'
import DocStyleLayout from 'components/layouts/docStyleLayout'
import { Box } from '@chakra-ui/react'
import { usersMenu } from './data/menu'
import RouteNames from 'constants/routeNames'

export default function Users() {
  return (
    <MainLayout
      title="User Management"
      breadcrumbs={[
        { name: 'management', url: '#' },
        { name: 'users', url: '/admin/users' },
      ]}
    >
      <DocStyleLayout menus={usersMenu}>
        <Box w="100%">test</Box>
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
