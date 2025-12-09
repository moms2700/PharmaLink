'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  type CartItem,
} from '@/lib/cart'

export default function PanierPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    loadCart()

    const handleCartUpdate = () => loadCart()
    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  const loadCart = () => {
    setCartItems(getCart())
  }

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
    loadCart()
  }

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId)
    loadCart()
  }

  const handleClearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      clearCart()
      loadCart()
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-8">
            Parcourez notre catalogue et ajoutez des médicaments à votre panier
          </p>
          <Link href="/medicaments">
            <Button size="lg">Parcourir le catalogue</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Mon panier
            </h1>
            <p className="text-gray-600">{cartItems.length} article(s)</p>
          </div>
          <Button variant="outline" onClick={handleClearCart}>
            <Trash2 className="w-4 h-4 mr-2" />
            Vider le panier
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          💊
                        </div>
                      )}
                    </div>

                    {/* Infos */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">DCI: {item.dci}</p>
                      <p className="text-lg font-bold text-primary-500">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantité */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full bg-primary-500 text-white hover:bg-primary-600 flex items-center justify-center transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frais de service</span>
                    <span className="text-green-600 font-semibold">Gratuit</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary-500">
                        {formatPrice(calculateTotal())}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/commande">
                  <Button size="lg" className="w-full mb-3">
                    Passer la commande
                  </Button>
                </Link>

                <Link href="/medicaments">
                  <Button variant="outline" className="w-full">
                    Continuer mes achats
                  </Button>
                </Link>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ℹ️ <strong>Information :</strong> Votre réservation sera
                    maintenue pendant 2h dans la pharmacie sélectionnée.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
