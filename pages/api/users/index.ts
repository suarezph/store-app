import dbConnect from 'lib/dbConnect'
import bcrypt from 'bcrypt'
import Users from 'models/users.schema'
import type { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from 'middleware/requireAuth'
import APIstatus from 'constants/apiStatus'

export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await Users.find(
          {},
        ) /* find all the data in our database */
        res.status(APIstatus.SUCCESS).json({ success: true, data: users })
      } catch (error) {
        res.status(APIstatus.BAD_REQUEST).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        const newUser = new Users(req.body)
        newUser.password = await bcrypt.hash(req.body.password, 10)
        const user = await Users.create(newUser)

        user.password = undefined
        res.status(APIstatus.SUCCESS).json({ success: true, data: user })
      } catch (error) {
        res
          .status(APIstatus.UNPROCESSABLE_ENTITY)
          .json({ success: false, error })
      }

      break
    default:
      res.status(APIstatus.METHOD_NOT_ALLOWED).json({ success: false })
      break
  }
})
