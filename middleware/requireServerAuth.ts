import dbConnect from 'lib/dbConnect'
import Users from 'models/users.schema'
import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || ''

export default async function requireServerAuth(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
) {
  await dbConnect()

  const { auth: token } = req.cookies

  if (!token) return undefined

  try {
    const data = await jwt.verify(token, JWT_SECRET_KEY)

    if (!data) return undefined

    const user = await Users.findById(data.sub)

    if (user) user.password = undefined

    return JSON.stringify(user)
  } catch (error) {
    return undefined
  }
}
