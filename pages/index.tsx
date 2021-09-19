import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import requireServerAuth from 'middleware/requireServerAuth'

const Index = () => <></>

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const user = await requireServerAuth(context.req)

  return {
    redirect: {
      destination: !user ? '/auth/login' : '/admin/dashboard',
      permanent: false,
    },
  }

  return {
    props: {},
  }
}

export default Index
