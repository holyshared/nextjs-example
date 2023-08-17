import { NextApiRequest, NextApiResponse } from 'next'
import { products } from "../../../src/mock/products"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(400)
    res.end()
    return
  }

  const { id } = req.query
  const product = products.find(product => product.id === id)

  if (!product) {
    res.status(404)
    res.end()
    return
  }

  res.json(product)
}