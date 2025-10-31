export interface HygraphImage {
  id: string
  url: string
  altText?: string
  width?: number
  height?: number
}

export interface HygraphMoney {
  amount: number
  currencyCode: string
}

export interface HygraphProductOption {
  id: string
  name: string
  values: string[]
}

export interface HygraphProductVariant {
  id: string
  title: string
  price: HygraphMoney
  availableForSale: boolean
  selectedOptions: Array<{
    name: string
    value: string
  }>
}

export interface HygraphProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  productType?: string
  categoryId?: string
  featuredImage?: HygraphImage
  images: HygraphImage[]
  priceRange: {
    minVariantPrice: HygraphMoney
    maxVariantPrice: HygraphMoney
  }
  compareAtPrice?: HygraphMoney
  options: HygraphProductOption[]
  variants: HygraphProductVariant[]
  tags: string[]
  availableForSale: boolean
  createdAt: string
  updatedAt: string
}

export interface HygraphCategory {
  id: string
  title: string
  handle: string
  description: string
  image?: HygraphImage
  products: HygraphProduct[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  handle: string
  title: string
  description: string
  seo: {
    title: string
    description: string
  }
  parentCategoryTree: string[]
  updatedAt: string
  path: string
}

// Re-export the clean types from the original structure
export type {
  Product,
  ProductSortKey,
  ProductCollectionSortKey,
  SelectedOptions,
  ProductVariant,
  ProductOption,
  Money,
  Image,
  SEO,
  Cart,
  CartItem,
  CartProduct,
  Menu,
  Page,
} from "../shopify/types"
