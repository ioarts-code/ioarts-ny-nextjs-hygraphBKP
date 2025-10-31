import { HomeSidebar } from "@/components/layout/sidebar/home-sidebar"
import { PageLayout } from "@/components/layout/page-layout"
import { LatestProductCard } from "@/components/products/latest-product-card"
import { Badge } from "@/components/ui/badge"
import { getCollections, getProducts } from "@/lib/hygraph"
import { getLabelPosition } from "../lib/utils"
import type { Product } from "../lib/hygraph/types"
import { isHygraphConfigured } from "@/lib/hygraph/client"

export default async function Home() {
  const collections = await getCollections()
  let featuredProducts: Product[] = []

  try {
    const allProducts = await getProducts({})
    featuredProducts = allProducts.slice(0, 8)
  } catch (error) {
    console.error("Error fetching products:", error)
    featuredProducts = []
  }

  const [lastProduct, ...restProducts] = featuredProducts

  if (!isHygraphConfigured()) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="max-w-2xl text-center space-y-4">
            <h1 className="text-3xl font-bold">Hygraph Setup Required</h1>
            <p className="text-muted-foreground text-lg">
              This template has been migrated from Shopify to Hygraph. To get started, you need to configure your
              Hygraph project.
            </p>
            <div className="bg-muted p-6 rounded-lg text-left space-y-3">
              <h2 className="font-semibold text-lg">Setup Steps:</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Click <strong>Vars</strong> in the left sidebar
                </li>
                <li>
                  Add environment variable:{" "}
                  <code className="bg-background px-2 py-1 rounded">NEXT_PUBLIC_HYGRAPH_ENDPOINT</code>
                </li>
                <li>
                  Set the value to your Hygraph GraphQL API endpoint
                  <br />
                  <span className="text-xs text-muted-foreground">
                    (e.g., https://api-us-east-1.hygraph.com/v2/your-project-id/master)
                  </span>
                </li>
                <li>Get your endpoint from Hygraph → Project Settings → API Access</li>
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Need help? Check the <code>MIGRATION_GUIDE.md</code> file for detailed instructions.
            </p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="contents md:grid md:grid-cols-12 md:gap-sides">
        <HomeSidebar collections={collections} />
        <div className="flex relative flex-col grid-cols-2 col-span-8 w-full md:grid">
          <div className="fixed top-0 left-0 z-10 w-full pointer-events-none base-grid py-sides">
            <div className="col-span-8 col-start-5">
              <div className="hidden px-6 lg:block">
                <Badge variant="outline-secondary">latest drop</Badge>
              </div>
            </div>
          </div>
          {featuredProducts.length > 0 ? (
            <>
              <LatestProductCard className="col-span-2" product={lastProduct} principal />

              {restProducts.map((product: any, index: number) => (
                <LatestProductCard
                  className="col-span-1"
                  key={product.id}
                  product={product}
                  labelPosition={getLabelPosition(index)}
                />
              ))}
            </>
          ) : (
            <div className="col-span-2 flex items-center justify-center min-h-[40vh]">
              <p className="text-muted-foreground">
                No products available. Please add products to your Hygraph project.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
