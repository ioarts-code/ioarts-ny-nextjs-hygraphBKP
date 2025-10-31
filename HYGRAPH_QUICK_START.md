# Hygraph Quick Start Guide

Your app is successfully connected to Hygraph! Now you need to add content.

## Step 1: Set Up Your Schema

1. Go to your Hygraph project: https://app.hygraph.com
2. Navigate to **Schema** in the left sidebar
3. Create the following models:

### Collection Model
Click **Add Model** → Name it "Collection"

Add these fields:
- `name` - Single line text (Required)
- `slug` - Single line text (Required, Unique)
- `description` - Rich text
- `image` - Asset

### Product Model
Click **Add Model** → Name it "Product"

Add these fields:
- `name` - Single line text (Required)
- `slug` - Single line text (Required, Unique)
- `description` - Rich text
- `price` - Float (Required)
- `compareAtPrice` - Float
- `currency` - Single line text (Default: "USD")
- `availableForSale` - Boolean (Default: true)
- `category` - Single line text
- `tags` - Single line text (Allow multiple values)
- `featuredImage` - Asset
- `images` - Asset (Allow multiple values)
- `collections` - Reference to Collection (Allow multiple values)

## Step 2: Set API Permissions

1. Go to **Settings** → **API Access**
2. Under **Public Content API**, click **Edit**
3. Enable **Read** permission for:
   - Collection
   - Product
   - Asset
4. Click **Update**

## Step 3: Add Sample Content

### Create a Collection:
1. Go to **Content** → **Collection**
2. Click **Create Entry**
3. Fill in:
   - Name: "Featured Products"
   - Slug: "featured"
   - Description: "Our best products"
4. Click **Save** and then **Publish**

### Create Products:
1. Go to **Content** → **Product**
2. Click **Create Entry**
3. Fill in sample data:
   - Name: "Classic T-Shirt"
   - Slug: "classic-t-shirt"
   - Description: "A comfortable cotton t-shirt"
   - Price: 29.99
   - Currency: USD
   - Available for Sale: ✓
   - Category: "Apparel"
   - Tags: "clothing", "casual"
   - Collections: Select "Featured Products"
4. Upload an image for Featured Image
5. Click **Save** and then **Publish**

Repeat for 5-10 products to populate your store.

## Step 4: Verify Connection

1. Go to **API Playground** in Hygraph
2. Run this test query:

```graphql
query {
  products {
    id
    name
    slug
    price
  }
  collections {
    id
    name
    slug
  }
}
