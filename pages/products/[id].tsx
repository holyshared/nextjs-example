import type { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

type Product = {
  name: string
}

// This function gets called at build time
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/products')
  const data = await res.json() as { products: {id: string, name: string}[] }

  const paths = data.products.map(product => (
    { params: { id: product.id } }
  ))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`)
  const product = await res.json() as { id: string, name: string }

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