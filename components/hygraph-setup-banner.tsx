"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function HygraphSetupBanner() {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Hygraph Not Configured</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p>This app requires Hygraph to be configured. Please set up your environment variables:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>
              Click the <strong>Vars</strong> section in the left sidebar
            </li>
            <li>
              Add <code className="bg-black/10 px-1 rounded">HYGRAPH_ENDPOINT</code>
            </li>
            <li>
              Set it to:{" "}
              <code className="bg-black/10 px-1 rounded text-xs">
                https://eu-west-2.cdn.hygraph.com/content/cmgp9itlv038107pkghnm8hkr/master
              </code>
            </li>
          </ol>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" asChild>
              <a href="https://hygraph.com" target="_blank" rel="noopener noreferrer">
                Get Hygraph
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="/MIGRATION_GUIDE.md" target="_blank" rel="noreferrer">
                View Migration Guide
              </a>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
