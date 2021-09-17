import dbConnect from 'lib/dbConnect'
import Users from 'models/users.schema'
import type { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from 'middleware/requireAuth'
import jwt from 'jsonwebtoken'
import APIstatus from 'constants/apiStatus'

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || ''

export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { auth: token } = req.cookies
        const data = await jwt.verify(token, JWT_SECRET_KEY)
        const user = await Users.findById(data.sub)

        res.status(APIstatus.SUCCESS).json({ success: true, data: user })
      } catch (error) {
        res.status(APIstatus.BAD_REQUEST).json({ success: false, error })
      }
      break
    default:
      res.status(APIstatus.METHOD_NOT_ALLOWED).json({ success: false })
      break
  }
})
