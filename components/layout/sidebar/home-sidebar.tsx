import { ShopLinks } from "../shop-links"
import type { Collection } from "@/lib/hygraph/types"

interface HomeSidebarProps {
  collections: Collection[]
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
  return (
    <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
      <div>
        
        <div className="mt-5 text-base leading-tight">
          
          
          <p className="font-extrabold text-3xl pr-8">{"Detta är ett modifierat Shopify tema som jag modifierat i V0 för att använda Hygraph som CMS. Nextjs är grunden."}</p>
        </div>
      </div>
      <ShopLinks collections={collections} />
    </aside>
  )
}
