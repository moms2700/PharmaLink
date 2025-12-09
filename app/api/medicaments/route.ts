import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const available = searchParams.get('available')

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { dci: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.category = category
    }

    if (available === 'true') {
      where.available = true
      where.stock = { gt: 0 }
    }

    const medicaments = await prisma.medicament.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(medicaments)
  } catch (error) {
    console.error('Erreur API medicaments:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des médicaments' },
      { status: 500 }
    )
  }
}
