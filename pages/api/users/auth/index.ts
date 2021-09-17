import dbConnect from 'lib/dbConnect'
import bcrypt from 'bcrypt'
import Users from 'models/users.schema'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import APIstatus from 'constants/apiStatus'

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || ''

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  await dbConnect()

  if (method === 'POST') {
    try {
      const user = await Users.findOne({ email: req.body.email })
      const match = await bcrypt.compare(req.body.password, user?.password)

      if (match) {
        const claims = { sub: user.id, name: user.fullname }
        const jwt = sign(claims, JWT_SECRET_KEY, {
          expiresIn: 60 * 60,
        })

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/',
          }),
        )
        res
          .status(APIstatus.SUCCESS)
          .json({ success: true, message: 'Successfully Authenticated' })
      } else {
        res.status(APIstatus.BAD_REQUEST).json({
          success: false,
          message:
            'The email and password you entered did not match our records. Please double-check and try again',
        })
      }
    } catch (error) {
      // User is not existing
      res.status(APIstatus.BAD_REQUEST).json({
        success: false,
        message:
          'The email and password you entered did not match our records. Please double-check and try again',
      })
    }
  } else {
    res
      .status(APIstatus.METHOD_NOT_ALLOWED)
      .json({ success: false, message: 'POST is only allowed' })
  }
}
