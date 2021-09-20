import jwt from 'jsonwebtoken'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY!

const requireAuth =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const decoded = await jwt.verify(req.cookies.auth!, JWT_SECRET_KEY)
      if (decoded) {
        return await fn(req, res)
      }
    } catch (err) {
      res.status(401).json({ success: false, message: 'Unauthenticated' })
    }
  }

export default requireAuth
