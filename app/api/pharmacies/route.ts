import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateDistance } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const wilaya = searchParams.get('wilaya')
    const isGuard = searchParams.get('isGuard')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius') // en km

    const where: any = {}

    if (wilaya) {
      where.wilaya = wilaya
    }

    if (isGuard === 'true') {
      where.isGuard = true
    }

    let pharmacies = await prisma.pharmacy.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    })

    // Filtrer par distance si coordonnées fournies
    if (lat && lng && radius) {
      const userLat = parseFloat(lat)
      const userLng = parseFloat(lng)
      const maxRadius = parseFloat(radius)

      pharmacies = pharmacies
        .map((pharmacy) => ({
          ...pharmacy,
          distance: calculateDistance(
            userLat,
            userLng,
            pharmacy.latitude,
            pharmacy.longitude
          ),
        }))
        .filter((pharmacy) => pharmacy.distance <= maxRadius)
        .sort((a, b) => a.distance - b.distance)
    }

    return NextResponse.json(pharmacies)
  } catch (error) {
    console.error('Erreur API pharmacies:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des pharmacies' },
      { status: 500 }
    )
  }
}
