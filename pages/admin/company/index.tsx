import type { GetServerSideProps } from 'next'
import Router from 'next/router'
import company from 'pages/api/company'

export default function Company({ companies }: any) {
  return <div>test</div>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cookie = context.req?.headers.cookie
  const resp = await fetch('http://localhost:4000/api/company', {
    headers: {
      cookie: cookie!,
    },
  })
  if (resp.status === 401 && !context.req) {
    Router.replace('/admin/auth/login')
  }

  if (resp.status === 401 && context.req) {
    return {
      redirect: {
        destination: '/admin/auth/login',
        permanent: false,
      },
    }
  }

  const json = await resp.json()

  return {
    props: { companies: json },
  }
}
