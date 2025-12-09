'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { getCart, getCartTotal, clearCart, type CartItem } from '@/lib/cart'

interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  hours: string
  distance?: number
}

export default function CommandePage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>('')
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const cart = getCart()
    if (cart.length === 0) {
      router.push('/panier')
    }
    setCartItems(cart)
    fetchPharmacies()
  }, [router])

  const fetchPharmacies = async () => {
    try {
      const response = await fetch('/api/pharmacies')
      const data = await response.json()
      setPharmacies(data)
    } catch (error) {
      console.error('Erreur lors du chargement des pharmacies:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPharmacy) {
      alert('Veuillez sélectionner une pharmacie')
      return
    }

    setIsLoading(true)

    try {
      // Simulation de création de commande
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Vider le panier
      clearCart()

      // Afficher le message de succès
      setStep(3)
    } catch (error) {
      console.error('Erreur lors de la commande:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 3) {
    const selectedPharmacyData = pharmacies.find((p) => p.id === selectedPharmacy)

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <Card className="max-w-2xl w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Réservation confirmée !
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Votre réservation est valable pendant{' '}
              <strong className="text-primary-500">2 heures</strong>
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-8 text-left">
              <h3 className="font-bold text-lg mb-4">Détails de la réservation</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Pharmacie :</span>
                  <p className="font-semibold">{selectedPharmacyData?.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Adresse :</span>
                  <p>{selectedPharmacyData?.address}</p>
                </div>
                <div>
                  <span className="text-gray-600">Téléphone :</span>
                  <p>
                    <a
                      href={`tel:${selectedPharmacyData?.phone}`}
                      className="text-primary-500 hover:underline"
                    >
                      {selectedPharmacyData?.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Horaires :</span>
                  <p>{selectedPharmacyData?.hours}</p>
                </div>
                <div className="pt-3 border-t">
                  <span className="text-gray-600">Total à payer :</span>
                  <p className="text-2xl font-bold text-primary-500">
                    {formatPrice(getCartTotal())}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-yellow-800">
                <Clock className="w-4 h-4 inline mr-2" />
                <strong>Rappel :</strong> Veuillez vous présenter à la pharmacie
                dans les 2 heures avec votre pièce d'identité et cette confirmation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push('/')}
              >
                Retour à l'accueil
              </Button>
              <Button
                className="flex-1"
                onClick={() => router.push('/medicaments')}
              >
                Continuer mes achats
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Finaliser ma commande
          </h1>
          <p className="text-gray-600">
            Étape {step} sur 2 : {step === 1 ? 'Vos informations' : 'Choix de la pharmacie'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Étape 1 : Informations */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Vos informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    placeholder="Ex: Ahmed Ben Ali"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    required
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    placeholder="exemple@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    required
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    placeholder="+213 555 123 456"
                  />
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={!userInfo.name || !userInfo.email || !userInfo.phone}
                >
                  Continuer
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Étape 2 : Choix pharmacie */}
          {step === 2 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Choisissez votre pharmacie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {pharmacies.map((pharmacy) => (
                      <label
                        key={pharmacy.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
                          selectedPharmacy === pharmacy.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="pharmacy"
                          value={pharmacy.id}
                          checked={selectedPharmacy === pharmacy.id}
                          onChange={(e) => setSelectedPharmacy(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <MapPin className="w-5 h-5 text-primary-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">
                              {pharmacy.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {pharmacy.address}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {pharmacy.phone} • {pharmacy.hours}
                            </p>
                            {pharmacy.distance && (
                              <p className="text-sm text-primary-500 font-semibold mt-1">
                                À {pharmacy.distance} km
                              </p>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Résumé */}
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de votre commande</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="text-2xl font-bold text-primary-500">
                        {formatPrice(getCartTotal())}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Votre réservation sera valable pendant <strong>2 heures</strong>
                    </p>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!selectedPharmacy || isLoading}
                    >
                      {isLoading ? 'Réservation...' : 'Confirmer la réservation'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
