import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import APIstatus from 'constants/apiStatus'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
        expires: new Date(0),
      }),
    )
    res
      .status(APIstatus.SUCCESS)
      .json({ success: true, message: 'Successfully Logout' })
  } else {
    res
      .status(APIstatus.METHOD_NOT_ALLOWED)
      .json({ success: false, message: 'POST is only allowed' })
  }
}
