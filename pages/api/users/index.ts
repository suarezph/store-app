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
        //pagination
        const pageNo: any = req.query.page || 1
        const size: any = req.query.items_per_page || 10
        let totalCount = 0
        let query: any = {}
        let filter: any = {}
        let meta = {}

        query.skip = size * (pageNo - 1)
        query.limit = size
        query.sort = { created: 'desc' }

        // filter
        if (req.query.fullname) {
          filter.fullname = {
            $regex: req.query.fullname,
            $options: 'i',
          }
        }

        totalCount = await Users.count(filter)
        const users = await Users.find(
          filter,
          {
            email: 1,
            fullname: 1,
            email_verification: 1,
            created: 1,
            updated: 1,
          },
          query,
        )

        let page = parseInt(pageNo)

        meta = { totalCount, page, size }

        res.status(APIstatus.SUCCESS).json({ success: true, data: users, meta })
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
