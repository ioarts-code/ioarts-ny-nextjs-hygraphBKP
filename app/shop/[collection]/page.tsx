import type { Metadata } from "next"
import { getCollection, getCollections } from "@/lib/hygraph"
import { notFound } from "next/navigation"
import ProductList from "../components/product-list"

// Generate static params for all collections at build time
export async function generateStaticParams() {
  try {
    const collections = await getCollections()

    return collections.map((collection) => ({
      collection: collection.handle,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Enable ISR with 1 minute revalidation
export const revalidate = 60

export async function generateMetadata(props: { params: { collection: string } }): Promise<Metadata> {
  const { collection } = props.params
  const collectionData = await getCollection(collection)

  if (!collectionData) return notFound()

  return {
    title: `ACME Store | ${collectionData.seo?.title || collectionData.title}`,
    description: collectionData.seo?.description || collectionData.description || `${collectionData.title} products`,
  }
}

export default async function ShopCategory(props: {
  params: { collection: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { collection } = props.params
  const searchParams = props.searchParams

  return <ProductList collection={collection} searchParams={searchParams} />
}
