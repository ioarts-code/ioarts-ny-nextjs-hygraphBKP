# Hygraph Schema Setup Guide

This guide will help you set up the required content models in Hygraph for this ecommerce template.

## Required Models

### 1. Collection Model

Create a new model called `Collection` with the following fields:

| Field Name | Type | Required | Unique | Description |
|------------|------|----------|--------|-------------|
| `name` | String | Yes | No | Display name of the collection |
| `slug` | String | Yes | Yes | URL-friendly identifier (e.g., "mens-clothing") |
| `description` | Rich Text | No | No | Collection description |
| `image` | Asset | No | No | Collection featured image |

### 2. Product Model

Create a new model called `Product` with the following fields:

| Field Name | Type | Required | Unique | Description |
|------------|------|----------|--------|-------------|
| `name` | String | Yes | No | Product name |
| `slug` | String | Yes | Yes | URL-friendly identifier |
| `description` | Rich Text | No | No | Product description |
| `price` | Float | Yes | No | Product price |
| `compareAtPrice` | Float | No | No | Original price (for sale items) |
| `currency` | String | No | No | Currency code (default: "USD") |
| `availableForSale` | Boolean | No | No | Whether product is in stock |
| `category` | String | No | No | Product category |
| `tags` | String (Multiple) | No | No | Product tags |
| `featuredImage` | Asset | No | No | Main product image |
| `images` | Asset (Multiple) | No | No | Additional product images |

### 3. ProductVariant Model (Optional)

If you need product variants (sizes, colors, etc.):

| Field Name | Type | Required | Unique | Description |
|------------|------|----------|--------|-------------|
| `name` | String | Yes | No | Variant name (e.g., "Small - Red") |
| `price` | Float | Yes | No | Variant price |
| `availableForSale` | Boolean | No | No | Whether variant is in stock |
| `product` | Reference (Product) | Yes | No | Parent product |

### 4. Relationships

- Add a **Reference field** to `Product` called `collections` (Multiple values) that references `Collection`
- Add a **Reference field** to `Product` called `variants` (Multiple values) that references `ProductVariant` (if using variants)

## Quick Setup Steps

1. **Log in to Hygraph**: Go to https://hygraph.com and open your project
2. **Create Models**: Go to Schema → Create Model for each model above
3. **Add Fields**: For each model, add the fields listed in the tables
4. **Set Permissions**: Go to Settings → API Access → Public Content API → Enable "Read" for all models
5. **Add Sample Data**: Go to Content → Create some sample products and collections
6. **Test Connection**: Your app should now be able to fetch data from Hygraph

## Sample GraphQL Query

Once your schema is set up, you can test it with this query in the Hygraph API Playground:

\`\`\`graphql
query {
  collections {
    id
    name
    slug
    description
  }
  products {
    id
    name
    slug
    price
    currency
    featuredImage {
      url
    }
  }
}
\`\`\`

## Need Help?

If you encounter any issues:
1. Check that all models are published (not in draft state)
2. Verify API permissions are set to allow public read access
3. Ensure your content endpoint URL is correct in environment variables
4. Check the Hygraph API Playground to test queries directly
