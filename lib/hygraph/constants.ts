export const DEFAULT_PAGE_SIZE = 20
export const DEFAULT_SORT_KEY = "CREATED_AT"

export const TAGS = {
  collections: "collections",
  products: "products",
  collectionProducts: "collection-products",
  cart: "cart",
}

export const sortOptions = [
  { label: "Relevance", value: "RELEVANCE" },
  { label: "Best Selling", value: "BEST_SELLING" },
  { label: "Price: Low to High", value: "PRICE_ASC" },
  { label: "Price: High to Low", value: "PRICE_DESC" },
  { label: "Newest", value: "CREATED_AT" },
  { label: "Title: A-Z", value: "TITLE_ASC" },
  { label: "Title: Z-A", value: "TITLE_DESC" },
]

export const storeCatalog = {
  name: "ACME Store",
  description: "Your one-stop shop for all your needs.",
  rootCategoryId: "all",
}
