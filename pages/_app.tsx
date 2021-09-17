import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import type { GetServerSideProps } from 'next'
import Router from 'next/router'
import { STATUS } from 'constants/apiStatus'

import theme from 'components/themes'

export default function MyApp({ Component, pageProps, companies }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

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
