import { hygraphFetch, isHygraphConfigured } from "./client"
import { GET_PRODUCTS_QUERY, GET_CATEGORIES_QUERY } from "./queries"
import { getFirstSentence, mapSortKeys } from "./utils"
import { TAGS } from "./constants"
import type { Product, Category, ProductSortKey, ProductCollectionSortKey, Money, Image } from "./types"

// Adapter functions to transform Hygraph data to our standard format
function adaptHygraphImage(hygraphImage: any): Image {
  if (!hygraphImage) {
    return {
      url: "/placeholder.svg?height=600&width=600",
      altText: "",
      height: 600,
      width: 600,
    }
  }
  return {
    url: hygraphImage.url || "",
    altText: hygraphImage.altText || "",
    height: hygraphImage.height || 600,
    width: hygraphImage.width || 600,
  }
}

function adaptHygraphMoney(amount: number | string | undefined, currency = "USD"): Money {
  return {
    amount: amount?.toString() || "0",
    currencyCode: currency,
  }
}

function adaptHygraphProduct(hygraphProduct: any): Product {
  const name = hygraphProduct.name || hygraphProduct.title || "Untitled Product"
  const slug = hygraphProduct.slug || hygraphProduct.handle || hygraphProduct.id
  const description = hygraphProduct.description || `${name} - Available now`
  const currency = hygraphProduct.currency || "USD"
  // Use the price field directly from Hygraph
  const price = hygraphProduct.price || 0
  const compareAtPrice = hygraphProduct.compareAtPrice

  // Map Hygraph images array to our format
  const hygraphImages = hygraphProduct.images || []
  const images =
    hygraphImages.length > 0
      ? hygraphImages.map((img: any) => ({
          url: img.url || "/placeholder.svg?height=600&width=600",
          altText: name,
          height: img.height || 600,
          width: img.width || 600,
        }))
      : [
          {
            url: "/placeholder.svg?height=600&width=600",
            altText: name,
            height: 600,
            width: 600,
          },
        ]

  const featuredImage = images[0]

  return {
    id: hygraphProduct.id,
    title: name,
    handle: slug,
    description: getFirstSentence(description),
    descriptionHtml: description,
    categoryId: hygraphProduct.category || "",
    tags: Array.isArray(hygraphProduct.tags) ? hygraphProduct.tags : [],
    availableForSale: hygraphProduct.availableForSale !== false,
    currencyCode: currency,
    featuredImage,
    seo: {
      title: name,
      description: getFirstSentence(description),
    },
    priceRange: {
      minVariantPrice: adaptHygraphMoney(price, currency),
      maxVariantPrice: adaptHygraphMoney(price, currency),
    },
    compareAtPrice: compareAtPrice ? adaptHygraphMoney(compareAtPrice, currency) : undefined,
    images,
    options: [],
    variants: (hygraphProduct.variants || []).map((variant: any) => ({
      id: variant.id,
      title: variant.name || "",
      availableForSale: variant.availableForSale !== false,
      price: adaptHygraphMoney(variant.price || price, currency),
      selectedOptions: [],
    })),
  }
}

function adaptHygraphCategory(hygraphCategory: any): Category {
  const name = hygraphCategory.name || hygraphCategory.title || "Untitled Category"
  const slug = hygraphCategory.slug || hygraphCategory.handle || hygraphCategory.id
  const description = hygraphCategory.description || `Shop ${name}`

  return {
    handle: slug,
    title: name,
    description,
    seo: {
      title: name,
      description,
    },
    parentCategoryTree: [],
    updatedAt: hygraphCategory.updatedAt || new Date().toISOString(),
    path: `/shop/${slug}`,
  }
}

// Public API functions
export async function getCollections(): Promise<Category[]> {
  if (!isHygraphConfigured()) {
    console.warn("⚠️ Hygraph not configured. Returning empty categories.")
    return []
  }

  try {
    const data = await hygraphFetch<{ categories: any[] }>({
      query: GET_CATEGORIES_QUERY,
      variables: { first: 10 },
      tags: [TAGS.collections],
    })

    if (!data || !data.categories) {
      return []
    }

    return data.categories.map(adaptHygraphCategory)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCollection(handle: string): Promise<Category | null> {
  if (!isHygraphConfigured()) {
    return null
  }

  try {
    // Fetch all categories and find the one matching the handle
    const data = await hygraphFetch<{ categories: any[] }>({
      query: GET_CATEGORIES_QUERY,
      variables: { first: 50 },
      tags: [TAGS.collections],
    })

    if (!data || !data.categories) return null

    // Find category by slug/handle
    const category = data.categories.find((cat: any) => cat.slug === handle || cat.id === handle)

    if (!category) return null
    return adaptHygraphCategory(category)
  } catch (error) {
    console.error(`Error fetching category ${handle}:`, error)
    return null
  }
}

export async function getProducts({
  query,
  sortKey = "CREATED_AT",
  reverse = true,
  limit = 20,
}: {
  query?: string
  sortKey?: ProductSortKey
  reverse?: boolean
  limit?: number
}): Promise<Product[]> {
  if (!isHygraphConfigured()) {
    console.warn("⚠️ Hygraph not configured. Returning empty products.")
    return []
  }

  try {
    const { sortKey: hygraphField, reverse: shouldReverse } = mapSortKeys(sortKey as string)
    const orderDirection = shouldReverse || reverse ? "DESC" : "ASC"

    const data = await hygraphFetch<{ products: any[] }>({
      query: GET_PRODUCTS_QUERY,
      variables: {
        first: limit,
        orderBy: `${hygraphField}_${orderDirection}`,
      },
      tags: [TAGS.products],
    })

    if (!data || !data.products) {
      return []
    }

    return data.products.map(adaptHygraphProduct)
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isHygraphConfigured()) {
    return null
  }

  try {
    const data = await hygraphFetch<{ products: any[] }>({
      query: GET_PRODUCTS_QUERY,
      variables: { first: 100 }, // Fetch more products to ensure we find the one we need
      tags: [TAGS.products],
    })

    if (!data || !data.products) return null

    // Find product by slug/handle
    const product = data.products.find((p: any) => p.slug === handle || p.id === handle)

    if (!product) return null
    return adaptHygraphProduct(product)
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error)
    return null
  }
}

export async function getCollectionProducts({
  collection,
  sortKey = "CREATED_AT",
  reverse = true,
  limit = 20,
}: {
  collection: string
  sortKey?: ProductCollectionSortKey
  reverse?: boolean
  limit?: number
}): Promise<Product[]> {
  if (!isHygraphConfigured()) {
    return []
  }

  try {
    const { sortKey: hygraphField, reverse: shouldReverse } = mapSortKeys(sortKey as string)
    const orderDirection = shouldReverse || reverse ? "DESC" : "ASC"

    const data = await hygraphFetch<{ categories: any[] }>({
      query: `
        query GetCategoriesWithProducts($first: Int = 50, $orderBy: ProductOrderByInput) {
          categories(first: $first) {
            id
            name
            slug
            description
            products(orderBy: $orderBy) {
              id
              name
              slug
              price
              description
              images {
                url
                width
                height
              }
            }
          }
        }
      `,
      variables: {
        first: 50,
        orderBy: `${hygraphField}_${orderDirection}`,
      },
      tags: [TAGS.collectionProducts, collection],
    })

    if (!data || !data.categories) {
      return []
    }

    // Find the category matching the collection handle
    const category = data.categories.find((cat: any) => cat.slug === collection || cat.id === collection)

    if (!category || !category.products) {
      return []
    }

    return category.products.map(adaptHygraphProduct)
  } catch (error) {
    console.error(`Error fetching products for category ${collection}:`, error)
    return []
  }
}

// Cart functions will be handled separately
export async function getCart() {
  try {
    const { getCart: getCartAction } = await import("@/components/cart/actions")
    return await getCartAction()
  } catch (error) {
    console.error("Error fetching cart:", error)
    return null
  }
}

// Export types
export type { Product, Category, ProductSortKey, ProductCollectionSortKey } from "./types"
