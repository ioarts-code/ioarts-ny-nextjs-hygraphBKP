"use client"

import { Suspense } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/hygraph/types" // Updated import to use Category instead of Collection
import Link from "next/link"
import { SidebarLinks } from "@/components/layout/sidebar/product-sidebar-links"
import { CategoryFilter } from "./category-filter"
import { ColorFilter } from "./color-filter"
import { useProducts } from "../providers/products-provider"
import { useFilterCount } from "../hooks/use-filter-count"

export function DesktopFilters({ collections, className }: { collections: Category[]; className?: string }) {
  const { originalProducts } = useProducts()
  const filterCount = useFilterCount()

  return (
    <aside className={cn("grid sticky top-0 grid-cols-3 h-screen min-h-max pl-sides pt-top-spacing", className)}>
      <div className="flex flex-col col-span-3 xl:col-span-2 gap-4">
        <div className="flex justify-between items-baseline pl-2 -mb-2">
          <h2 className="text-2xl font-semibold">
            Filter {filterCount > 0 && <span className="text-foreground/50">({filterCount})</span>}
          </h2>
          <Button
            size={"sm"}
            variant="ghost"
            aria-label="Clear all filters"
            className="font-medium text-foreground/50 hover:text-foreground/60"
            asChild
          >
            <Link href="/shop" prefetch>
              Clear
            </Link>
          </Button>
        </div>
        <Suspense fallback={null}>
          <CategoryFilter categories={collections} />
          <ColorFilter products={originalProducts} />
        </Suspense>
      </div>

      <div className="col-span-3 self-end">
        <p className="2xl:text-sm text-muted-foreground leading-tight mb-4 text-lg mt-2.5">
          Detta är ett modifierat Shopify tema som jag modifierat i V0 för att använda Hygraph som CMS. Nextjs är grunden.
        </p>
        <SidebarLinks className="flex-col-reverse py-sides" size="sm" />
      </div>
    </aside>
  )
}
