# Shopify to Hygraph Migration Guide

This template has been migrated from Shopify to Hygraph CMS. Here's what you need to know:

## Environment Variables

You need to set up the following environment variables:

### Required
- `NEXT_PUBLIC_HYGRAPH_ENDPOINT` - Your Hygraph GraphQL API endpoint
- `HYGRAPH_TOKEN` - Your Hygraph API token (optional for public content)

### Example
\`\`\`env
NEXT_PUBLIC_HYGRAPH_ENDPOINT=https://api-region.hygraph.com/v2/your-project-id/master
HYGRAPH_TOKEN=your_api_token_here
\`\`\`

## Hygraph Schema Setup

Your Hygraph project should have the following models:

### Product Model
- `id` (ID)
- `title` (String)
- `handle` (String, unique)
- `description` (String)
- `descriptionHtml` (RichText)
- `productType` (String)
- `categoryId` (String)
- `availableForSale` (Boolean)
- `tags` (String, multiple)
- `featuredImage` (Asset)
- `images` (Asset, multiple)
- `priceRange` (JSON)
- `compareAtPrice` (JSON)
- `options` (JSON)
- `variants` (JSON)

### Collection Model
- `id` (ID)
- `title` (String)
- `handle` (String, unique)
- `description` (String)
- `image` (Asset)
- `products` (Relation to Product, multiple)

## Key Differences from Shopify

### Cart System
- **Shopify**: Used Shopify's built-in cart API
- **Hygraph**: Uses local cookie-based cart storage

The cart is now stored in browser cookies and product data is fetched from Hygraph when displaying the cart.

### Checkout
- **Shopify**: Redirected to Shopify checkout
- **Hygraph**: You'll need to implement your own checkout flow or integrate with a payment provider like Stripe

### Product Variants
- **Shopify**: Native variant support with inventory tracking
- **Hygraph**: Variants stored as JSON data in the product model

## Migration Checklist

- [ ] Set up Hygraph project
- [ ] Create Product and Collection models
- [ ] Import your product data to Hygraph
- [ ] Set environment variables
- [ ] Implement checkout flow (if needed)
- [ ] Test cart functionality
- [ ] Test product pages
- [ ] Test collection pages

## Next Steps

1. **Set up your Hygraph project** at https://hygraph.com
2. **Create the required models** using the schema above
3. **Import your data** from Shopify to Hygraph
4. **Configure environment variables** in your Vercel project
5. **Implement checkout** using Stripe or another payment provider

## Support

For questions about Hygraph, visit: https://hygraph.com/docs
