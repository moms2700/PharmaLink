'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LeafletMap from '@/components/LeafletMapWrapper'

interface Pharmacy {
  id: string
  name: string
  address: string
  wilaya: string
  commune: string
  latitude: number
  longitude: number
  phone: string
  hours: string
  isGuard: boolean
  distance?: number
}

export default function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [showOnlyGuard, setShowOnlyGuard] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserLocation()
    fetchPharmacies()
  }, [])

  useEffect(() => {
    fetchPharmacies()
  }, [showOnlyGuard, userLocation])

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error)
          // Position par défaut : Alger Centre
          setUserLocation({ lat: 36.7538, lng: 3.0588 })
        }
      )
    } else {
      // Position par défaut : Alger Centre
      setUserLocation({ lat: 36.7538, lng: 3.0588 })
    }
  }

  const fetchPharmacies = async () => {
    try {
      let url = '/api/pharmacies'
      const params = new URLSearchParams()

      if (showOnlyGuard) {
        params.append('isGuard', 'true')
      }

      if (userLocation) {
        params.append('lat', userLocation.lat.toString())
        params.append('lng', userLocation.lng.toString())
        params.append('radius', '10') // Rayon de 10km
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setPharmacies(data)
    } catch (error) {
      console.error('Erreur lors du chargement des pharmacies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openInGoogleMaps = (pharmacy: Pharmacy) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Trouver une pharmacie
          </h1>
          <p className="text-gray-600">
            Localisez les pharmacies les plus proches de vous
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des pharmacies */}
          <div className="lg:col-span-1 space-y-4">
            {/* Filtres */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyGuard}
                    onChange={(e) => setShowOnlyGuard(e.target.checked)}
                    className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium">
                    Pharmacies de garde uniquement
                  </span>
                </label>
              </CardContent>
            </Card>

            {/* Résultats */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
                </div>
              ) : pharmacies.length > 0 ? (
                pharmacies.map((pharmacy) => (
                  <Card
                    key={pharmacy.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedPharmacy?.id === pharmacy.id
                        ? 'ring-2 ring-primary-500'
                        : ''
                    }`}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{pharmacy.name}</CardTitle>
                        {pharmacy.isGuard && (
                          <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">
                            Garde
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{pharmacy.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <a
                          href={`tel:${pharmacy.phone}`}
                          className="hover:text-primary-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {pharmacy.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{pharmacy.hours}</span>
                      </div>
                      {pharmacy.distance !== undefined && (
                        <div className="text-primary-500 font-semibold">
                          À {pharmacy.distance} km
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          openInGoogleMaps(pharmacy)
                        }}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Itinéraire
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-500">Aucune pharmacie trouvée</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Carte Google Maps */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] overflow-hidden">
              <CardContent className="p-0 h-full">
                <LeafletMap
                  pharmacies={pharmacies}
                  userLocation={userLocation}
                  selectedPharmacy={selectedPharmacy}
                  onPharmacySelect={setSelectedPharmacy}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
