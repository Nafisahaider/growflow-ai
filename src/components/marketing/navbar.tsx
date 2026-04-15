"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BotMessageSquare, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Demo", href: "#demo" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-[#F0F2F5]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <BotMessageSquare className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">GrowFlow AI</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link href="/signin" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-emerald-500/20"
            >
              Start Free Trial
            </Link>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/signin"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-emerald-600 hover:text-emerald-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
