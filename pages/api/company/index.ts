import dbConnect from 'lib/dbConnect'
import Company from 'models/company.schema'
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
        const companies = await Company.find(
          {},
        ) /* find all the data in our database */
        res.status(APIstatus.SUCCESS).json({ success: true, data: companies })
      } catch (error) {
        res.status(APIstatus.BAD_REQUEST).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        const company = await Company.create(
          req.body,
        ) /* create a new model in the database */
        res.status(APIstatus.SUCCESS).json({ success: true, data: company })
      } catch (error) {
        res.status(APIstatus.BAD_REQUEST).json({ success: false, error })
      }
      break
    default:
      res.status(APIstatus.METHOD_NOT_ALLOWED).json({ success: false })
      break
  }
})
