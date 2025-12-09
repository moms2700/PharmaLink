// @ts-nocheck
'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

// Déclaration pour éviter les erreurs TypeScript avec Google Maps
// Les types seront disponibles au runtime après le chargement
type GoogleMapsType = any

interface Pharmacy {
  id: string
  name: string
  address: string
  wilaya: string
  commune: string
  latitude: number
  longitude: number
  isGuard: boolean
  phone: string
  hours: string
  distance?: number
}

interface GoogleMapProps {
  pharmacies: Pharmacy[]
  userLocation: { lat: number; lng: number } | null
  selectedPharmacy: Pharmacy | null
  onPharmacySelect: (pharmacy: Pharmacy) => void
}

export default function GoogleMap({
  pharmacies,
  userLocation,
  selectedPharmacy,
  onPharmacySelect,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const userMarkerRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Charger Google Maps
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setLoadError('Clé API Google Maps manquante')
      return
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places', 'geometry'],
    })

    loader
      .load()
      .then(() => {
        setIsLoaded(true)
      })
      .catch((error) => {
        console.error('Erreur chargement Google Maps:', error)
        setLoadError('Erreur de chargement de la carte')
      })
  }, [])

  // Initialiser la carte
  useEffect(() => {
    if (!isLoaded || !mapRef.current || googleMapRef.current) return

    const initialCenter = userLocation || { lat: 36.7538, lng: 3.0588 }

    // @ts-ignore - Google Maps chargé dynamiquement
    googleMapRef.current = new google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi.medical',
          elementType: 'geometry',
          stylers: [{ color: '#ffdde0' }],
        },
      ],
    })
  }, [isLoaded, userLocation])

  // Afficher le marqueur de l'utilisateur
  useEffect(() => {
    if (!isLoaded || !googleMapRef.current || !userLocation) return

    // Supprimer l'ancien marqueur utilisateur
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null)
    }

    // Créer nouveau marqueur utilisateur
    userMarkerRef.current = new google.maps.Marker({
      position: userLocation,
      map: googleMapRef.current,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 3,
      },
      title: 'Votre position',
      zIndex: 1000,
    })

    // Centrer sur l'utilisateur
    googleMapRef.current.setCenter(userLocation)
  }, [isLoaded, userLocation])

  // Afficher les marqueurs des pharmacies
  useEffect(() => {
    if (!isLoaded || !googleMapRef.current) return

    // Supprimer anciens marqueurs
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // Créer nouveaux marqueurs
    const bounds = new google.maps.LatLngBounds()

    pharmacies.forEach((pharmacy) => {
      const position = { lat: pharmacy.latitude, lng: pharmacy.longitude }

      // Icône différente pour pharmacies de garde
      const icon = {
        url: pharmacy.isGuard
          ? 'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
              <path d="M16 0C7.2 0 0 7.2 0 16c0 11 16 26 16 26s16-15 16-26c0-8.8-7.2-16-16-16z" fill="#EF4444"/>
              <path d="M16 7c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm5 10h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z" fill="white"/>
            </svg>
          `)
          : 'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
              <path d="M16 0C7.2 0 0 7.2 0 16c0 11 16 26 16 26s16-15 16-26c0-8.8-7.2-16-16-16z" fill="#10B981"/>
              <path d="M16 7c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm5 10h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z" fill="white"/>
            </svg>
          `),
        scaledSize: new google.maps.Size(32, 42),
        anchor: new google.maps.Point(16, 42),
      }

      const marker = new google.maps.Marker({
        position,
        map: googleMapRef.current,
        icon,
        title: pharmacy.name,
        animation: selectedPharmacy?.id === pharmacy.id ? google.maps.Animation.BOUNCE : undefined,
      })

      // InfoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 250px;">
            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1F2937;">
              ${pharmacy.name}
            </h3>
            ${
              pharmacy.isGuard
                ? '<span style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 9999px; font-size: 12px; font-weight: 600;">Garde</span>'
                : ''
            }
            <p style="margin: 8px 0; color: #6B7280; font-size: 14px;">
              📍 ${pharmacy.address}
            </p>
            <p style="margin: 4px 0; color: #6B7280; font-size: 14px;">
              📞 <a href="tel:${pharmacy.phone}" style="color: #3B82F6; text-decoration: none;">${pharmacy.phone}</a>
            </p>
            <p style="margin: 4px 0; color: #6B7280; font-size: 14px;">
              🕐 ${pharmacy.hours}
            </p>
            ${
              pharmacy.distance
                ? `<p style="margin-top: 8px; color: #10B981; font-weight: 600; font-size: 14px;">À ${pharmacy.distance.toFixed(1)} km</p>`
                : ''
            }
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}"
              target="_blank"
              style="display: inline-block; margin-top: 12px; padding: 8px 16px; background: #3B82F6; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;"
            >
              Itinéraire
            </a>
          </div>
        `,
      })

      marker.addListener('click', () => {
        // Fermer toutes les autres InfoWindows
        markersRef.current.forEach((m) => {
          const iw = (m as any).infoWindow
          if (iw) iw.close()
        })

        infoWindow.open(googleMapRef.current, marker)
        onPharmacySelect(pharmacy)

        // Animation bounce
        marker.setAnimation(google.maps.Animation.BOUNCE)
        setTimeout(() => marker.setAnimation(null), 1500)
      })

      ;(marker as any).infoWindow = infoWindow
      markersRef.current.push(marker)
      bounds.extend(position)
    })

    // Ajouter position utilisateur aux bounds
    if (userLocation) {
      bounds.extend(userLocation)
    }

    // Ajuster la vue pour inclure tous les marqueurs
    if (pharmacies.length > 0) {
      googleMapRef.current.fitBounds(bounds)
    }
  }, [isLoaded, pharmacies, selectedPharmacy, onPharmacySelect, userLocation])

  // Animation du marqueur sélectionné
  useEffect(() => {
    if (!selectedPharmacy || !isLoaded) return

    const marker = markersRef.current.find((m) => {
      const pos = m.getPosition()
      return (
        pos &&
        Math.abs(pos.lat() - selectedPharmacy.latitude) < 0.0001 &&
        Math.abs(pos.lng() - selectedPharmacy.longitude) < 0.0001
      )
    })

    if (marker && googleMapRef.current) {
      // Centrer sur le marqueur
      googleMapRef.current.panTo({
        lat: selectedPharmacy.latitude,
        lng: selectedPharmacy.longitude,
      })

      // Animation
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(() => marker.setAnimation(null), 1500)

      // Ouvrir InfoWindow
      const infoWindow = (marker as any).infoWindow
      if (infoWindow) {
        infoWindow.open(googleMapRef.current, marker)
      }
    }
  }, [selectedPharmacy, isLoaded])

  if (loadError) {
    return (
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-gray-600">{loadError}</p>
          <p className="text-sm text-gray-500 mt-4">
            Ajoutez votre clé API Google Maps dans les variables d'environnement
          </p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className="h-full w-full" />
}
