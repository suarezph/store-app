import type { GetServerSideProps } from 'next'
import Router from 'next/router'
import { STATUS } from 'constants/apiStatus'

const Index = () => <></>

export const getServerSideProps: GetServerSideProps = async context => {
  const cookie = context.req?.headers.cookie

  const resp = await fetch('http://localhost:4000/api/company', {
    headers: {
      cookie: cookie!,
    },
  })

  /**
   * Redirect to proper page
   * Authotization: Permissions and Roles
   * Admin
   * Company
   */

  if (resp.status === STATUS.UNAUTHORIZED && !context.req) {
    Router.replace('/auth/login')
  }

  if (resp.status === STATUS.UNAUTHORIZED && context.req) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  const json = await resp.json()

  return {
    props: { companies: json },
  }
}

export default Index
