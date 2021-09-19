import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import requireServerAuth from 'middleware/requireServerAuth'
import MainLayout from 'components/layouts/mainLayout'

export default function Dashboard() {
  return (
    <MainLayout
      title="Dashboard"
      breadcrumbs={[{ name: 'dashboard', url: '/admin/dashboard' }]}
    >
      <div>test</div>
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
