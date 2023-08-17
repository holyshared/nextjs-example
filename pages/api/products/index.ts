import { NextApiRequest, NextApiResponse } from 'next'
import {products} from "../../../src/mock/products"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(400)
    res.end()
    return
  }

  res.json({
    products
  })
}

export default handler