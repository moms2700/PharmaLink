'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

interface LeafletMapProps {
  pharmacies: Pharmacy[]
  userLocation: { lat: number; lng: number } | null
  selectedPharmacy: Pharmacy | null
  onPharmacySelect: (pharmacy: Pharmacy) => void
}

// Icônes personnalisées
const createPharmacyIcon = (isGuard: boolean, isSelected: boolean) => {
  const color = isGuard ? '#EF4444' : '#10B981'
  const scale = isSelected ? 1.2 : 1

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative; transform: scale(${scale}); transition: transform 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
            </filter>
          </defs>
          <path d="M16 0C7.2 0 0 7.2 0 16c0 11 16 26 16 26s16-15 16-26c0-8.8-7.2-16-16-16z"
                fill="${color}" filter="url(#shadow)"/>
          <path d="M16 7c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm5 10h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z"
                fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42]
  })
}

const createUserIcon = () => {
  return L.divIcon({
    className: 'user-marker',
    html: `
      <div style="position: relative;">
        <div style="
          width: 20px;
          height: 20px;
          background: #4285F4;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: rgba(66, 133, 244, 0.2);
          border-radius: 50%;
          animation: pulse 2s infinite;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

export default function LeafletMap({
  pharmacies,
  userLocation,
  selectedPharmacy,
  onPharmacySelect,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<L.Marker[]>([])
  const userMarkerRef = useRef<L.Marker | null>(null)

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const initialCenter: [number, number] = userLocation
      ? [userLocation.lat, userLocation.lng]
      : [36.7538, 3.0588] // Alger par défaut

    // Créer la carte
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    })

    // Ajouter les tuiles OpenStreetMap (GRATUIT!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map

    // Ajouter les styles pour l'animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes pulse {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(0.8);
        }
        50% {
          opacity: 0.5;
          transform: translate(-50%, -50%) scale(1.5);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(2);
        }
      }
      .leaflet-popup-content-wrapper {
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .leaflet-popup-content {
        margin: 16px;
        min-width: 250px;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      document.head.removeChild(style)
    }
  }, [])

  // Afficher le marqueur utilisateur
  useEffect(() => {
    if (!mapRef.current || !userLocation) return

    // Supprimer l'ancien marqueur
    if (userMarkerRef.current) {
      userMarkerRef.current.remove()
    }

    // Créer le nouveau marqueur
    const marker = L.marker([userLocation.lat, userLocation.lng], {
      icon: createUserIcon(),
      zIndexOffset: 1000,
    }).addTo(mapRef.current)

    marker.bindPopup(`
      <div style="text-align: center; padding: 8px;">
        <strong style="color: #1F2937; font-size: 14px;">📍 Votre position</strong>
      </div>
    `)

    userMarkerRef.current = marker

    // Centrer la carte
    mapRef.current.setView([userLocation.lat, userLocation.lng], mapRef.current.getZoom())
  }, [userLocation])

  // Afficher les marqueurs des pharmacies
  useEffect(() => {
    if (!mapRef.current) return

    // Supprimer les anciens marqueurs
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Créer les nouveaux marqueurs
    const bounds = L.latLngBounds([])

    pharmacies.forEach((pharmacy) => {
      const isSelected = selectedPharmacy?.id === pharmacy.id
      const marker = L.marker([pharmacy.latitude, pharmacy.longitude], {
        icon: createPharmacyIcon(pharmacy.isGuard, isSelected),
      }).addTo(mapRef.current!)

      // Popup
      const popupContent = `
        <div style="padding: 4px;">
          <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1F2937;">
            ${pharmacy.name}
          </h3>
          ${pharmacy.isGuard ? '<span style="background: #EF4444; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; display: inline-block; margin-bottom: 8px;">🚨 Garde</span>' : ''}
          <p style="margin: 6px 0; color: #6B7280; font-size: 14px;">
            📍 ${pharmacy.address}
          </p>
          <p style="margin: 6px 0; color: #6B7280; font-size: 14px;">
            📞 <a href="tel:${pharmacy.phone}" style="color: #3B82F6; text-decoration: none;">${pharmacy.phone}</a>
          </p>
          <p style="margin: 6px 0; color: #6B7280; font-size: 14px;">
            🕐 ${pharmacy.hours}
          </p>
          ${pharmacy.distance ? `<p style="margin-top: 8px; color: #10B981; font-weight: 600; font-size: 14px;">À ${pharmacy.distance.toFixed(1)} km</p>` : ''}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}"
            target="_blank"
            style="display: block; margin-top: 12px; padding: 8px 16px; background: #3B82F6; color: white; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; text-align: center;"
          >
            🧭 Itinéraire
          </a>
        </div>
      `

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'pharmacy-popup'
      })

      // Événement clic
      marker.on('click', () => {
        onPharmacySelect(pharmacy)
      })

      markersRef.current.push(marker)
      bounds.extend([pharmacy.latitude, pharmacy.longitude])
    })

    // Ajouter la position utilisateur aux bounds
    if (userLocation) {
      bounds.extend([userLocation.lat, userLocation.lng])
    }

    // Ajuster la vue pour inclure tous les marqueurs
    if (pharmacies.length > 0 && bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [pharmacies, selectedPharmacy, onPharmacySelect, userLocation])

  // Centrer sur la pharmacie sélectionnée
  useEffect(() => {
    if (!mapRef.current || !selectedPharmacy) return

    const marker = markersRef.current.find(m => {
      const pos = m.getLatLng()
      return (
        Math.abs(pos.lat - selectedPharmacy.latitude) < 0.0001 &&
        Math.abs(pos.lng - selectedPharmacy.longitude) < 0.0001
      )
    })

    if (marker) {
      // Centrer sur le marqueur
      mapRef.current.setView([selectedPharmacy.latitude, selectedPharmacy.longitude], 15, {
        animate: true,
        duration: 0.5
      })

      // Ouvrir le popup
      marker.openPopup()

      // Mettre à jour l'icône pour montrer la sélection
      marker.setIcon(createPharmacyIcon(selectedPharmacy.isGuard, true))

      // Remettre l'icône normale après 2 secondes
      setTimeout(() => {
        marker.setIcon(createPharmacyIcon(selectedPharmacy.isGuard, false))
      }, 2000)
    }
  }, [selectedPharmacy])

  return (
    <div
      ref={mapContainerRef}
      className="h-full w-full"
      style={{ minHeight: '400px' }}
    />
  )
}
