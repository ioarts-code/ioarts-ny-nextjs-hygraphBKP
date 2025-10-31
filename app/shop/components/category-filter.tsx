"use client"

import type { Category } from "@/lib/hygraph/types"
import { useParams } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCategoryFilterCount } from "../hooks/use-filter-count"

interface CategoryFilterProps {
  categories: Category[]
  className?: string
}

export function CategoryFilter({ categories, className }: CategoryFilterProps) {
  const params = useParams<{ collection: string }>()
  const hasSelectedCategory = !!params.collection
  const categoryCount = useCategoryFilterCount()

  return (
    <div className={cn("px-3 py-4 rounded-lg bg-muted", className)}>
      <h3 className="mb-4 font-semibold">
        Categories {categoryCount > 0 && <span className="text-foreground/50">({categoryCount})</span>}
      </h3>
      <ul className="flex flex-col gap-1">
        {categories.map((category, index) => {
          const isSelected = params.collection === category.handle
          return (
            <li key={`${category.handle}-${index}`}>
              <Link
                className={cn(
                  "flex w-full text-left transition-all transform cursor-pointer font-sm md:hover:translate-x-1 md:hover:opacity-80",
                  isSelected ? "font-medium translate-x-1" : hasSelectedCategory ? "opacity-50" : "",
                )}
                href={`/shop/${category.handle}`}
                aria-pressed={isSelected}
                aria-label={`Filter by category: ${category.title}`}
                prefetch
              >
                {category.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
