'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Clock, Navigation, Phone, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import GoogleMap from '@/components/GoogleMap'
import { useRouter } from 'next/navigation'

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

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [nearbyPharmacies, setNearbyPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    if (userLocation) {
      fetchNearbyPharmacies()
    }
  }, [userLocation])

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
      setUserLocation({ lat: 36.7538, lng: 3.0588 })
    }
  }

  const fetchNearbyPharmacies = async () => {
    if (!userLocation) return

    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        lat: userLocation.lat.toString(),
        lng: userLocation.lng.toString(),
        radius: '5', // 5km
      })

      const response = await fetch(`/api/pharmacies?${params}`)
      const data = await response.json()
      setNearbyPharmacies(data.slice(0, 6)) // Limiter à 6 pharmacies
    } catch (error) {
      console.error('Erreur chargement pharmacies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/medicaments?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section avec Recherche */}
      <section className="relative bg-gradient-to-r from-blue-600 to-green-500 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 drop-shadow-lg">
            Trouvez vos médicaments<br />en quelques secondes 💊
          </h1>
          <p className="text-xl text-center mb-12 text-blue-50">
            Disponibilité en temps réel • Réservation sécurisée • Pharmacies de garde
          </p>

          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
            <div className="flex gap-3 bg-white rounded-2xl shadow-2xl p-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un médicament (Doliprane, Insuline, Amoxicilline...)"
                  className="w-full pl-12 pr-4 py-4 text-gray-900 text-lg rounded-xl focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg"
              >
                Rechercher
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { number: '91%', label: 'des Algériens cherchent un médicament chaque année' },
              { number: '12K+', label: 'Pharmacies référencées' },
              { number: '2h', label: 'de réservation garantie' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold drop-shadow-md">{stat.number}</div>
                <div className="text-sm md:text-base text-blue-50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Pharmacies à Proximité avec Carte */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pharmacies près de vous 📍
            </h2>
            <p className="text-lg text-gray-600">
              Trouvez la pharmacie la plus proche en temps réel
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des pharmacies */}
            <div className="lg:col-span-1 space-y-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Localisation en cours...</p>
                </div>
              ) : nearbyPharmacies.length > 0 ? (
                <>
                  <div className="text-sm text-gray-600 mb-4">
                    {nearbyPharmacies.length} pharmacies trouvées dans un rayon de 5 km
                  </div>
                  {nearbyPharmacies.map((pharmacy) => (
                    <Card
                      key={pharmacy.id}
                      className={`cursor-pointer transition-all hover:shadow-xl border-2 ${
                        selectedPharmacy?.id === pharmacy.id
                          ? 'border-blue-500 shadow-lg'
                          : 'border-transparent'
                      }`}
                      onClick={() => setSelectedPharmacy(pharmacy)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-gray-900 text-base">
                            {pharmacy.name}
                          </h3>
                          {pharmacy.isGuard && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              Garde
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{pharmacy.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{pharmacy.hours}</span>
                          </div>
                          {pharmacy.distance !== undefined && (
                            <div className="text-blue-600 font-bold">
                              À {pharmacy.distance.toFixed(1)} km
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-4"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`,
                              '_blank'
                            )
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Itinéraire
                        </Button>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => router.push('/pharmacies')}
                  >
                    Voir toutes les pharmacies →
                  </Button>
                </>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucune pharmacie trouvée à proximité</p>
                    <Button
                      variant="link"
                      className="mt-4"
                      onClick={() => router.push('/pharmacies')}
                    >
                      Voir toutes les pharmacies
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Carte */}
            <div className="lg:col-span-2">
              <Card className="h-[700px] overflow-hidden shadow-2xl">
                <CardContent className="p-0 h-full">
                  <GoogleMap
                    pharmacies={nearbyPharmacies}
                    userLocation={userLocation}
                    selectedPharmacy={selectedPharmacy}
                    onPharmacySelect={setSelectedPharmacy}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Comment ça marche ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Recherchez',
                desc: 'Trouvez votre médicament par nom ou DCI en temps réel',
              },
              {
                icon: '📍',
                title: 'Localisez',
                desc: 'Découvrez les pharmacies les plus proches qui ont le médicament',
              },
              {
                icon: '📱',
                title: 'Réservez',
                desc: 'Réservez et récupérez votre médicament sous 2 heures',
              },
            ].map((feature, i) => (
              <Card key={i} className="text-center p-8 border-2 hover:border-blue-500 hover:shadow-xl transition-all">
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Prêt à trouver votre médicament ?
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Rejoignez des milliers d'Algériens qui économisent du temps chaque jour
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg"
              onClick={() => router.push('/medicaments')}
            >
              Rechercher un médicament
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-6 text-lg"
              onClick={() => router.push('/pharmacies')}
            >
              Trouver une pharmacie
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
