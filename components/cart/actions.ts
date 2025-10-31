"use server"

import { TAGS } from "@/lib/constants"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { getProduct } from "@/lib/hygraph"
import type { Cart, CartItem } from "@/lib/hygraph/types"
import { generateCartId, calculateCartTotals, generateCheckoutUrl, type LocalCart } from "@/lib/hygraph/cart"

async function getLocalCart(): Promise<LocalCart | null> {
  const cartData = (await cookies()).get("cart")?.value
  if (!cartData) return null

  try {
    return JSON.parse(cartData)
  } catch {
    return null
  }
}

async function saveLocalCart(cart: LocalCart): Promise<void> {
  ;(await cookies()).set("cart", JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

async function buildFullCart(localCart: LocalCart): Promise<Cart | null> {
  if (!localCart || localCart.lines.length === 0) {
    return {
      id: localCart?.id || generateCartId(),
      checkoutUrl: generateCheckoutUrl(localCart?.id || ""),
      cost: {
        subtotalAmount: { amount: "0.00", currencyCode: "USD" },
        totalAmount: { amount: "0.00", currencyCode: "USD" },
        totalTaxAmount: { amount: "0.00", currencyCode: "USD" },
      },
      totalQuantity: 0,
      lines: [],
    }
  }

  const cartItems: CartItem[] = []

  for (const line of localCart.lines) {
    const product = await getProduct(line.productHandle)
    if (!product) continue

    const price = product.priceRange.minVariantPrice
    const lineTotal = Number.parseFloat(price.amount) * line.quantity

    cartItems.push({
      id: `${localCart.id}_${line.productId}`,
      quantity: line.quantity,
      cost: {
        totalAmount: {
          amount: lineTotal.toFixed(2),
          currencyCode: price.currencyCode,
        },
      },
      merchandise: {
        id: line.productId,
        title: product.title,
        selectedOptions: [],
        product,
      },
    })
  }

  const cost = calculateCartTotals(cartItems)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return {
    id: localCart.id,
    checkoutUrl: generateCheckoutUrl(localCart.id),
    cost,
    totalQuantity,
    lines: cartItems,
  }
}

export async function addItem(productId: string | undefined, productHandle?: string): Promise<Cart | null> {
  if (!productId || !productHandle) {
    return null
  }

  try {
    let cart = await getLocalCart()

    if (!cart) {
      cart = {
        id: generateCartId(),
        lines: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }

    const existingLineIndex = cart.lines.findIndex((line) => line.productId === productId)

    if (existingLineIndex >= 0) {
      cart.lines[existingLineIndex].quantity += 1
    } else {
      cart.lines.push({
        productId,
        productHandle,
        quantity: 1,
      })
    }

    cart.updatedAt = new Date().toISOString()
    await saveLocalCart(cart)

    revalidateTag(TAGS.cart)

    return await buildFullCart(cart)
  } catch (error) {
    console.error("Error adding item to cart:", error)
    return null
  }
}

export async function updateItem({ lineId, quantity }: { lineId: string; quantity: number }): Promise<Cart | null> {
  try {
    const cart = await getLocalCart()
    if (!cart) return null

    const productId = lineId.split("_").slice(2).join("_")

    const lineIndex = cart.lines.findIndex((line) => line.productId === productId)
    if (lineIndex === -1) return null

    if (quantity === 0) {
      cart.lines.splice(lineIndex, 1)
    } else {
      cart.lines[lineIndex].quantity = quantity
    }

    cart.updatedAt = new Date().toISOString()
    await saveLocalCart(cart)
    revalidateTag(TAGS.cart)

    return await buildFullCart(cart)
  } catch (error) {
    console.error("Error updating item:", error)
    return null
  }
}

export async function createCartAndSetCookie(): Promise<Cart | null> {
  try {
    const newCart: LocalCart = {
      id: generateCartId(),
      lines: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await saveLocalCart(newCart)
    return await buildFullCart(newCart)
  } catch (error) {
    console.error("Error creating cart:", error)
    return null
  }
}

export async function getCart(): Promise<Cart | null> {
  try {
    const cart = await getLocalCart()
    if (!cart) return null

    return await buildFullCart(cart)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return null
  }
}
