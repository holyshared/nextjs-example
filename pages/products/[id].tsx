import type { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

const products = new Map<string, { name: string }>([
  ['1', { name: 'a' }],
  ['2', { name: 'b' }],
  ['3', { name: 'c' }]
])

type Product = {
  name: string
}

// This function gets called at build time
export async function getStaticPaths() {
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } }
  ]
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const product = products.get(params.id)

  if (!product) {
    return {
      notFound: true
    }
  }

  return { props: { product } }
}

export default function Product({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>
    <h1>Product: {product.name}</h1>
    <Link href="/about">about</Link>
  </div>
}