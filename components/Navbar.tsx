'use client'

import Link from 'next/link'
import { User, UserPlus, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import Logo from './Logo'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 dark:bg-gray-900 light:bg-white backdrop-blur-md border-b border-gray-800 dark:border-gray-800 light:border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-bold text-gradient">BroSubs</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/#products" className="text-gray-300 hover:text-primary transition-colors font-medium">
              Products
            </Link>
            <Link href="/#about" className="text-gray-300 hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/admin/login" className="text-gray-300 hover:text-primary transition-colors font-medium">
              Admin
            </Link>
          </div>

          {/* Auth Buttons & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-800 dark:bg-gray-800 light:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-primary transition-colors font-medium">
              <User className="w-5 h-5 text-gray-300" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-white">
              <UserPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
