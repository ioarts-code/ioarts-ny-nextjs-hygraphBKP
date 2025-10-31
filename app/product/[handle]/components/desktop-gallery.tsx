"use client"

import { useProductImages, useSelectedVariant } from "@/components/products/variant-selector"
import type { Product } from "@/lib/hygraph/types"
import Image from "next/image"

export const DesktopGallery = ({ product }: { product: Product }) => {
  const selectedVariant = useSelectedVariant(product)
  const images = useProductImages(product, selectedVariant?.selectedOptions)

  return images.map((image) => (
    <Image
      style={{
        aspectRatio: `${image.width} / ${image.height}`,
      }}
      key={`${image.url}-${image.selectedOptions?.map((o) => `${o.name},${o.value}`).join("-")}`}
      src={image.url || "/placeholder.svg"}
      alt={image.altText}
      width={image.width}
      height={image.height}
      className="object-cover w-11/12 mt-20 ml-3"
      quality={100}
    />
  ))
}
