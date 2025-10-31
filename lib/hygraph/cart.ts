import type { CartItem } from "./types"

export interface LocalCartLine {
  productId: string
  productHandle: string
  quantity: number
}

export interface LocalCart {
  id: string
  lines: LocalCartLine[]
  createdAt: string
  updatedAt: string
}

export function generateCartId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function calculateCartTotals(lines: CartItem[]) {
  const subtotal = lines.reduce((sum, line) => {
    return sum + Number.parseFloat(line.cost.totalAmount.amount)
  }, 0)

  const currencyCode = lines[0]?.cost.totalAmount.currencyCode || "USD"

  return {
    subtotalAmount: {
      amount: subtotal.toFixed(2),
      currencyCode,
    },
    totalAmount: {
      amount: subtotal.toFixed(2),
      currencyCode,
    },
    totalTaxAmount: {
      amount: "0.00",
      currencyCode,
    },
  }
}

export function generateCheckoutUrl(cartId: string): string {
  return `/api/checkout?cartId=${cartId}`
}
