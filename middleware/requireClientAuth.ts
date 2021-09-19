import Router from 'next/router'
import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import APIStatus from 'constants/apiStatus'

export default async function requireClientAuth(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
) {
  const cookie = req?.headers.cookie

  const resp = await fetch('http://localhost:4000/api/users/profile', {
    headers: {
      cookie: cookie!,
    },
  })

  if (resp.status === APIStatus.UNAUTHORIZED && !req) {
    return undefined
    // Router.replace('/auth/login')
  }

  if (resp.status === APIStatus.UNAUTHORIZED && req) {
    return undefined
    // return {
    //   redirect: {
    //     destination: '/auth/login',
    //     permanent: false,
    //   },
    // }
  }

  const user = await resp.json()

  return user
}
