export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int = 20, $orderBy: ProductOrderByInput) {
    products(first: $first, orderBy: $orderBy) {
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
`

export const GET_PRODUCT_BY_SLUG_QUERY = `
  query GetProductBySlug($slug: String!) {
    product(where: { slug: $slug }) {
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
`

export const GET_PRODUCT_BY_HANDLE_QUERY = GET_PRODUCT_BY_SLUG_QUERY

export const GET_CATEGORIES_QUERY = `
  query GetCategories($first: Int = 50) {
    categories(first: $first) {
      id
      name
      slug
    }
  }
`

export const GET_CATEGORIES_WITH_PRODUCTS_QUERY = `
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
`

export const GET_CATEGORY_BY_HANDLE_QUERY = GET_CATEGORIES_QUERY
export const GET_COLLECTIONS_QUERY = GET_CATEGORIES_QUERY
