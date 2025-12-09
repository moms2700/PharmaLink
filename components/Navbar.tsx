'use client'

import Link from 'next/link'
import { ShoppingCart, MapPin, User, Menu, Search } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-primary-500">
              PharmaLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/medicaments"
              className="text-gray-700 hover:text-primary-500 font-medium transition"
            >
              Médicaments
            </Link>
            <Link
              href="/pharmacies"
              className="text-gray-700 hover:text-primary-500 font-medium transition flex items-center gap-1"
            >
              <MapPin className="w-4 h-4" />
              Pharmacies
            </Link>
            <Link
              href="/comment-ca-marche"
              className="text-gray-700 hover:text-primary-500 font-medium transition"
            >
              Comment ça marche
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/recherche">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/panier">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link href="/connexion">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Connexion
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/medicaments"
                className="text-gray-700 hover:text-primary-500 font-medium"
              >
                Médicaments
              </Link>
              <Link
                href="/pharmacies"
                className="text-gray-700 hover:text-primary-500 font-medium flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Pharmacies
              </Link>
              <Link
                href="/comment-ca-marche"
                className="text-gray-700 hover:text-primary-500 font-medium"
              >
                Comment ça marche
              </Link>
              <Link href="/panier">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Panier (0)
                </Button>
              </Link>
              <Link href="/connexion">
                <Button variant="default" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
