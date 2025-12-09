'use client'

import dynamic from 'next/dynamic'

// Charger LeafletMap uniquement côté client (pas de SSR)
const LeafletMap = dynamic(() => import('./LeafletMapCore'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  ),
})

export default LeafletMap
