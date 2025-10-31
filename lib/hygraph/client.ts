const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT || process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || ""
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN

interface GraphQLResponse<T> {
  data: T
  errors?: Array<{ message: string }>
}

export function isHygraphConfigured(): boolean {
  return !!HYGRAPH_ENDPOINT && HYGRAPH_ENDPOINT.startsWith("http")
}

export async function hygraphFetch<T>({
  query,
  variables = {},
  tags,
}: {
  query: string
  variables?: Record<string, any>
  tags?: string[]
}): Promise<T> {
  if (!HYGRAPH_ENDPOINT) {
    console.warn(
      "⚠️ HYGRAPH_ENDPOINT or NEXT_PUBLIC_HYGRAPH_ENDPOINT is not configured. Please set this environment variable in your Vercel project settings.",
    )
    return null as T
  }

  if (!HYGRAPH_ENDPOINT.startsWith("http")) {
    console.error(
      `❌ Invalid HYGRAPH_ENDPOINT: "${HYGRAPH_ENDPOINT}". It should start with https:// and point to your Hygraph GraphQL API.`,
    )
    return null as T
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (HYGRAPH_TOKEN) {
      headers["Authorization"] = `Bearer ${HYGRAPH_TOKEN}`
    }

    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        tags: tags || ["hygraph"],
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`fetch to ${HYGRAPH_ENDPOINT} failed with status ${response.status} and body: ${errorBody}`)
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const textBody = await response.text()
      throw new Error(
        `Hygraph API returned non-JSON response. This usually means the endpoint is incorrect. Response: ${textBody.substring(0, 200)}`,
      )
    }

    const json: GraphQLResponse<T> = await response.json()

    if (json.errors) {
      throw new Error(`Hygraph GraphQL errors: ${JSON.stringify(json.errors)}`)
    }

    return json.data
  } catch (error) {
    console.error("Hygraph fetch error:", error)
    throw error
  }
}
