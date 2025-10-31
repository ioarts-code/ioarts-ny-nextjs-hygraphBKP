"use client"

import { useProductImages, useSelectedVariant } from "@/components/products/variant-selector"
import Image from "next/image"

export const ProductImage = ({ product }) => {
  const selectedVariant = useSelectedVariant(product)

  const productImages = useProductImages(product, selectedVariant?.selectedOptions)

  const variantImage = productImages[0] ||
    product.featuredImage || {
      url: "/placeholder.svg?height=600&width=600",
      altText: product.title,
      width: 600,
      height: 600,
    }

  return (
    <Image
      src={variantImage.url || "/placeholder.svg"}
      alt={variantImage.altText || product.title}
      width={variantImage.width || 600}
      height={variantImage.height || 600}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover size-full"
      quality={100}
      placeholder={variantImage?.thumbhash ? "blur" : undefined}
      blurDataURL={variantImage?.thumbhash}
    />
  )
}
