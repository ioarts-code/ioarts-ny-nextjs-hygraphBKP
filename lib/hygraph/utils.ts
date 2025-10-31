export function formatPrice(amount: string | number, currencyCode = "USD"): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  })

  return formatter.format(Number.parseFloat(amount.toString()))
}

export function getProductId(id: string): string {
  return id
}

export function mapSortKeys(
  sortKey: string | undefined,
  type: "product" | "collection" = "product",
): { sortKey: string; reverse: boolean } {
  if (!sortKey) {
    return { sortKey: "createdAt", reverse: true }
  }

  // Parse the sort key to extract base key and direction
  let baseKey = sortKey
  let reverse = false

  if (sortKey.endsWith("_DESC")) {
    baseKey = sortKey.replace("_DESC", "")
    reverse = true
  } else if (sortKey.endsWith("_ASC")) {
    baseKey = sortKey.replace("_ASC", "")
    reverse = false
  }

  // Map to Hygraph field names
  const sortMap: Record<string, string> = {
    RELEVANCE: "createdAt",
    BEST_SELLING: "createdAt",
    CREATED_AT: "createdAt",
    PRICE: "price",
    TITLE: "name",
  }

  const hygraphField = sortMap[baseKey] || "createdAt"

  // For CREATED_AT and BEST_SELLING, default to reverse (newest first)
  if (baseKey === "CREATED_AT" || baseKey === "BEST_SELLING") {
    reverse = true
  }

  return { sortKey: hygraphField, reverse }
}

export function thumbhashToDataURL(thumbhash: string): string {
  // Placeholder for thumbhash conversion
  // You can implement actual thumbhash decoding if needed
  return thumbhash
}

// Helper to extract first sentence from description
export function getFirstSentence(text: string): string {
  if (!text) return ""

  const cleaned = text.trim()
  const match = cleaned.match(/^[^.!?]*[.!?]/)

  if (match) {
    return match[0].trim()
  }

  if (cleaned.length > 100) {
    return cleaned.substring(0, 100).trim() + "..."
  }

  return cleaned
}

export function getLabelPosition(index: number): "top-left" | "top-right" | "bottom-left" | "bottom-right" {
  const positions: Array<"top-left" | "top-right" | "bottom-left" | "bottom-right"> = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ]
  return positions[index % positions.length]
}
