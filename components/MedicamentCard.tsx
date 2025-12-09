'use client'

import Image from 'next/image'
import { ShoppingCart, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { formatPrice } from '@/lib/utils'

interface MedicamentCardProps {
  id: string
  name: string
  dci: string
  price: number
  imageUrl?: string
  category: string
  stock: number
  prescription: boolean
  onAddToCart?: () => void
}

export default function MedicamentCard({
  id,
  name,
  dci,
  price,
  imageUrl,
  category,
  stock,
  prescription,
  onAddToCart,
}: MedicamentCardProps) {
  const isInStock = stock > 0

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart()
    } else {
      // Import dynamique pour éviter les erreurs SSR
      import('@/lib/cart').then(({ addToCart }) => {
        addToCart({ id, name, dci, price, imageUrl })
        alert(`✅ ${name} ajouté au panier !`)
      })
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">💊</span>
          </div>
        )}

        {/* Badge catégorie */}
        <div className="absolute top-2 left-2">
          <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Badge prescription */}
        {prescription && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Ordonnance
            </span>
          </div>
        )}

        {/* Badge stock */}
        {!isInStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">DCI: {dci}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-500">
            {formatPrice(price)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {stock > 0 ? stock : '0'}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!isInStock}
          variant={isInStock ? 'default' : 'outline'}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isInStock ? 'Ajouter au panier' : 'Indisponible'}
        </Button>
      </CardFooter>
    </Card>
  )
}
