"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl">
            3D Experience
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/"
              className={cn(
                "text-white/80 hover:text-white transition-colors",
                pathname === "/" && "text-white font-semibold",
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-white/80 hover:text-white transition-colors",
                pathname === "/about" && "text-white font-semibold",
              )}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
